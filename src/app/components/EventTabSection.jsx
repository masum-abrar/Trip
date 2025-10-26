'use client';

import { useState, useEffect } from 'react';
import { FaImage, FaCalendarAlt } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import Cookies from "js-cookie";
import Link from 'next/link';
import { useRouter } from "next/navigation";
// import { usePostActions } from '@/hooks/usePostActions';
// import { getUserId, validatePostForm, handleImageUpload } from '@/utils/postUtils';

import { getUserId ,validatePostForm, handleImageUpload } from '../utils/utils';
import PostCard from './PostCard';
import { usePostActions } from '../hooks/usePostActions';
import Swal from "sweetalert2";
const EventTabSection = ({
  hidePlaceSelection,
  PostData,
  events,
  setEvents,
}) => {
  const router = useRouter();
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [places, setPlaces] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const [newPost, setNewPost] = useState({
    text: "",
    placeId: "",
    startDate: "",
    endDate: "",
    images: [],
  });
    const fetchCommunity = async () => {
    try {
      setIsLoading(true);

      if (events && events.length > 1) {
        setLocationData(events);
      } else {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/districts-posts-event/${districtId}`
        );
        const data = await response.json();
        setLocationData(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };
  const [selectedFiles, setSelectedFiles] = useState([]);

  const districtId = PostData?.id;
  const cookiesuserId = getUserId();

  // ✅ Use custom hook
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

  // Fetch Events


  useEffect(() => {
    if (districtId || (events && events.length > 1)) {
      fetchCommunity();
    }
  }, [districtId, events]);

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
    setNewPost(prev => ({ ...prev, images: urls }));
  };

  const removeImage = (index) => {
    const newImages = [...newPost.images];
    const newFiles = [...selectedFiles];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setNewPost({ ...newPost, images: newImages });
    setSelectedFiles(newFiles);
  };

  // Handle Event Post Creation
  const handlePost = async () => {
    if (!cookiesuserId) {
      toast.error("Please login first!");
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    // ✅ Validate with event dates
    if (!validatePostForm(newPost.text, newPost.startDate, newPost.endDate, true)) return;

    setPostLoading(true);

    const formData = new FormData();
    formData.append("userId", cookiesuserId);
    formData.append("title", newPost.text);
    formData.append("description", newPost.text);
    formData.append("type", "event");
    formData.append("eventStartDate", newPost.startDate);
    formData.append("evenetEndDate", newPost.endDate);
    formData.append("isActive", "true");
    formData.append("slug", "");

    // Only attach place info if NOT hiding place selection
    if (!hidePlaceSelection) {
      formData.append("divisionId", PostData.division?.id || "");
      formData.append("districtId", PostData.id || "");
      formData.append("placeId", newPost.placeId || "");
    }

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
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Event posted successfully!", { duration: 1500 });

      // Reset form
      setNewPost({ text: "", images: [], placeId: "", startDate: "", endDate: "" });
      setSelectedFiles([]);

      // Refresh events
      fetchCommunity();
      if (typeof setEvents === "function") setEvents([]);
      router.refresh();
    } catch (error) {
      console.error("Post creation failed:", error);
      toast.error("Failed to create event");
    } finally {
      setPostLoading(false);
    }
  };
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
        {/* Event Input Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePost();
          }}
          className="bg-white shadow-md rounded-xl p-4"
        >
          <textarea
            className="w-full p-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8cc163] disabled:opacity-50"
            placeholder="What's your event about?"
            value={newPost.text}
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            disabled={postLoading}
            required
          ></textarea>

          {/* Start Date & End Date */}
          <div className="flex flex-col lg:flex-row gap-4 mt-3">
            <div className="w-full">
              <label className="block text-gray-700 mb-1 font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="date"
                  className="w-full p-2 pl-10 border bg-white text-black rounded-md focus:ring-2 focus:ring-[#8cc163] disabled:opacity-50"
                  value={newPost.startDate}
                  onChange={(e) =>
                    setNewPost({ ...newPost, startDate: e.target.value })
                  }
                  disabled={postLoading}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-700 mb-1 font-medium">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="date"
                  className="w-full p-2 pl-10 border bg-white text-black rounded-md focus:ring-2 focus:ring-[#8cc163] disabled:opacity-50"
                  value={newPost.endDate}
                  onChange={(e) =>
                    setNewPost({ ...newPost, endDate: e.target.value })
                  }
                  disabled={postLoading}
                  min={newPost.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload and Place Selection */}
          <div className="flex items-center justify-center gap-4 mt-6">
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

            {!hidePlaceSelection && (
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
            )}

            <button
              type="submit"
              disabled={postLoading}
              className="bg-[#8cc163] text-white px-6 py-2 rounded-lg hover:bg-[#79c340] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
            >
              {postLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                "Post Event"
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

        {/* Events Display */}
        {isLoading ? (
          // Skeleton Loader
          <div className="bg-white shadow-md rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-md mb-4"></div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="w-full h-40 bg-gray-300 rounded-md"></div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-32 h-8 bg-gray-300 rounded-md"></div>
              <div className="w-32 h-8 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ) : locationData?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No events yet. Create the first event!</p>
          </div>
        ) : (
          locationData?.slice(0, visiblePosts).map((post) => (
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onReply={handleReply}
              onDeleteComment={handleDeleteComment}
              onDeleteReply={handleDeleteReply}
              onDeletePost={handleDeletePost}
              showDate={true}
              loading={loading}
              deletingId={deletingId}
              loadingPost={loadingPost}
              replyLoading={replyLoading}
            />
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

export default EventTabSection;