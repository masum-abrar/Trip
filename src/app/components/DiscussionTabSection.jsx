"use client";

import { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// import { getUserId, validatePostForm, handleImageUpload } from '@/utils/postUtils';

import { usePostActions } from "../hooks/usePostActions";
import PostCard from "./PostCard";
import { getUserId, handleImageUpload, validatePostForm } from "../utils/utils";

const DiscussTabSection = ({ hidePlaceSelection, PostData }) => {
  const router = useRouter();
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [places, setPlaces] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const [newPost, setNewPost] = useState({
    text: "",
    placeId: "",
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const districtId = PostData?.id;
  const cookiesuserId = getUserId();
  const fetchCommunity = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/districts-posts-discussion/${districtId}`
      );
      const data = await response.json();
      setLocationData(data.data);
    } catch (error) {
      console.error("Failed to fetch community:", error);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };
  // ✅ Use custom hook for all post actions
  const {
    loading,
    deletingId,
    handleLike,
    handleComment,
    handleReply,
    handleDeleteComment,
    handleDeleteReply,
    loadingPost,
    replyLoading,
  } = usePostActions(fetchCommunity, router);

  // Fetch Community Posts

  useEffect(() => {
    if (districtId) {
      fetchCommunity();
    }
  }, [districtId]);

  // Fetch Places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/places-by-district-id/${districtId}`
        );
        const data = await response.json();
        setPlaces(data.data || []);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };
    if (districtId) fetchPlaces();
  }, [districtId]);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const { files, urls } = handleImageUpload(e.target.files, 7);
    setSelectedFiles(files);
    setNewPost((prev) => ({ ...prev, images: urls }));
  };

  const removeImage = (index) => {
    const newImages = [...newPost.images];
    const newFiles = [...selectedFiles];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setNewPost({ ...newPost, images: newImages });
    setSelectedFiles(newFiles);
  };

  // Handle Post Creation
  const handlePost = async () => {
    if (!cookiesuserId) {
      toast.error("Please login first!");
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    if (!validatePostForm(newPost.text)) return;

    setPostLoading(true);

    const formData = new FormData();
    formData.append("userId", cookiesuserId);
    formData.append("divisionId", PostData.division.id);
    formData.append("districtId", PostData.id);
    formData.append("placeId", newPost.placeId);
    formData.append("title", newPost.text);
    formData.append("description", newPost.text);
    formData.append("type", "discussion");
    formData.append("eventStartDate", "");
    formData.append("eventEndDate", "");
    formData.append("isActive", "true");
    formData.append("slug", "");

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/posts",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Post created successfully!", { duration: 1500 });

      // Reset form
      setNewPost({ text: "", images: [], placeId: "" });
      setSelectedFiles([]);

      // Refresh posts
      const userInfo = {
        id: cookiesuserId,
        name: Cookies.get("userName"), // যদি cookie তে রাখো
        profileImage: Cookies.get("profileImage") || "/default-avatar.png",
      };
      setLocationData((prevPosts) => [
        { ...data.data, user: userInfo }, // 👈 user info inject করো
        ...(prevPosts || []),
      ]);

      // Notification
      const notificationPayload = {
        userId: cookiesuserId,
        message: `New post created: ${newPost.text}`,
        type: "post",
        link: `https://example.com`,
      };

      await fetch(
        "https://parjatak-backend.vercel.app/api/v1/create-notification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationPayload),
        }
      );
    } catch (error) {
      console.error("Post creation failed:", error);
      toast.error("Failed to create post");
    } finally {
      setPostLoading(false);
      fetchCommunity();
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8cc163",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
      width: "320px",
    });

    if (result.isConfirmed) {
      try {
        // 🔹 প্রথমে UI থেকে Remove করে ফেলি (optimistic update)
        setLocationData((prev) => prev.filter((post) => post.id !== postId));

        const res = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/posts/${postId}`,
          { method: "DELETE" }
        );

        if (!res.ok) throw new Error("Failed to delete post");

        toast.success("Post deleted successfully!", { duration: 1500 });
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete post");

        // ❗ যদি delete fail করে, আবার আগেরটা restore করো
        fetchCommunity();
      }
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors closeButton />

      <div className="space-y-6">
        {/* Post Input Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePost();
          }}
          className="bg-white shadow-md rounded-xl p-4"
        >
          <textarea
            className="w-full p-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8cc163] disabled:opacity-50"
            placeholder="What's on your mind?"
            value={newPost.text}
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            disabled={postLoading}
          ></textarea>

          <div className="flex items-center flex-wrap gap-3 mt-3">
            {/* Place Dropdown */}
            <select
              value={newPost.placeId}
              onChange={(e) =>
                setNewPost({ ...newPost, placeId: e.target.value })
              }
              disabled={postLoading}
              className="border bg-white p-2 text-black rounded-md disabled:opacity-50"
            >
              <option value="">Select Place</option>
              {places?.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>

            {/* Image Upload */}
            <label className="cursor-pointer">
              <FaImage className="text-xl text-gray-600 hover:text-[#8cc163]" />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
                disabled={postLoading}
              />
            </label>

            <button
              type="submit"
              disabled={postLoading}
              className="bg-[#8cc163] text-white px-6 py-2 rounded-lg hover:bg-[#79c340] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
            >
              {postLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>

          {/* Preview Images */}
          {newPost.images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {newPost.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={postLoading}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Posts Display */}
        {isLoading ? (
          // Skeleton Loader
          <div className="bg-white shadow-md rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-md mb-4"></div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-40 bg-gray-300 rounded-md"
                ></div>
              ))}
            </div>
            <div className="w-20 h-6 bg-gray-300 rounded-md mt-2"></div>
            <div className="w-full h-6 bg-gray-300 rounded-md mt-2"></div>
          </div>
        ) : locationData?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              No posts yet. Be the first to post!
            </p>
          </div>
        ) : (
          locationData?.slice(0, visiblePosts).map((post) => (
            // <Link key={post.id} href={`/PostDetails/${post.id}`}>
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onReply={handleReply}
              onDeleteComment={handleDeleteComment}
              onDeleteReply={handleDeleteReply}
              onDeletePost={handleDeletePost}
              showDate={false}
              loading={loading}
              deletingId={deletingId}
              loadingPost={loadingPost}
              replyLoading={replyLoading}
            />
            // </Link>
          ))
        )}

        {/* See More Button */}
        {!isLoading && visiblePosts < locationData?.length && (
          <div className="text-center mt-4">
            <button
              onClick={() => setVisiblePosts(visiblePosts + 10)}
              className="px-6 py-2 bg-[#8cc163] text-white rounded-md hover:bg-[#79c340] transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussTabSection;
