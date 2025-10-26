"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Star, Heart, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";
import { getUserId } from "../utils/utils";

function ListsPage() {
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newComments, setNewComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [likingId, setLikingId] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [commentLoading, setCommentLoading] = useState(null);

  const userId = getUserId();

  // Fetch Lists
  const fetchLists = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/customer/lists"
      );
      const data = await response.json();

      if (data && data.data) {
        setSections(data.data);
        setFilteredSections(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch lists:", error);
      toast.error("Failed to load lists");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Handle Like/Unlike
  const handleLike = async (listId) => {
    if (!userId) {
      toast.error("Please login to like!");
      return;
    }

    setLikingId(listId);

    const sectionIndex = sections.findIndex((s) => s.id === listId);
    if (sectionIndex === -1) return;

    const oldSections = [...sections];
    const oldSection = oldSections[sectionIndex];
    const oldLikes = oldSection.like ? [...oldSection.like] : [];
    const isLiked = oldLikes.some((like) => like.userId === userId);

    // Optimistic UI update
    let newLikes;
    if (isLiked) {
      newLikes = oldLikes.filter((like) => like.userId !== userId);
    } else {
      newLikes = [...oldLikes, { userId }];
    }

    const updatedSection = { ...oldSection, like: newLikes };
    oldSections[sectionIndex] = updatedSection;
    setSections(oldSections);
    setFilteredSections(oldSections);

    try {
      const url = isLiked
        ? "https://parjatak-backend.vercel.app/api/v1/customer/delete-list-like"
        : "https://parjatak-backend.vercel.app/api/v1/customer/create-list-like";

      const method = isLiked ? "DELETE" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listId, userId }),
      });

      const data = await res.json();

      if (!data.success) {
        // Revert on error
        setSections([...sections]);
        setFilteredSections([...sections]);
        toast.error("Failed to update like");
      }
    } catch (error) {
      console.error("Like error:", error);
      // Revert on error
      setSections([...sections]);
      setFilteredSections([...sections]);
      toast.error("Something went wrong");
    } finally {
      setLikingId(null);
    }
  };

  // Handle Comment Post
  const handleCommentPost = async (listId) => {
    if (!userId) {
      toast.error("Please login to comment!");
      return;
    }

    if (!newComments[listId]?.trim()) {
      toast.warning("Please write a comment");
      return;
    }

    setCommentLoading(listId);

    try {
      const res = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/customer/create-list-review",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listId,
            userId,
            rating: 5,
            comment: newComments[listId],
          }),
        }
      );

      if (res.ok) {
        toast.success("Comment posted!", { duration: 1500 });
        setNewComments({ ...newComments, [listId]: "" });
        fetchLists();
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Comment error:", error);
      toast.error("Something went wrong");
    } finally {
      setCommentLoading(null);
    }
  };

  // Handle Comment Delete
  const handleCommentDelete = async (commentId) => {
    if (!userId) {
      toast.error("Please login first!");
      return;
    }

    setDeletingCommentId(commentId);

    try {
      const res = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/delete-list-review/${commentId}`,
        { method: "POST" }
      );

      if (res.ok) {
        toast.success("Comment deleted!", { duration: 1500 });
        fetchLists();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Delete comment error:", error);
      toast.error("Something went wrong");
    } finally {
      setDeletingCommentId(null);
    }
  };

  // Handle Search
  const handleSearch = (value) => {
    const query = value.toLowerCase();
    setSearchQuery(value);

    if (query.trim() === "") {
      setFilteredSections(sections);
    } else {
      const filtered = sections.filter((section) =>
        section.title?.toLowerCase().includes(query)
      );
      setFilteredSections(filtered);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Toaster position="top-right" richColors closeButton />

      {/* Navbar */}
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className=" px-8 py-8 space-y-16">
        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search lists by title..."
              className="w-full py-3 pl-5 pr-12 text-gray-700 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8cc163] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilteredSections(sections);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex space-x-2 mb-4">
              <span
                className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></span>
              <span
                className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
            </div>
            <p className="text-gray-700 text-lg font-semibold animate-pulse">
              Preparing the places for you...
            </p>
          </div>
        ) : filteredSections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? "No lists found matching your search"
                : "No lists available yet"}
            </p>
          </div>
        ) : (
          filteredSections.map((section) => (
            <section key={section.id} className="space-y-6">
              {/* Section Header */}
              <div className="flex justify-between items-center flex-wrap gap-4">
                <Link href={`/list/${section.slug}`}>
                  <h2 className="text-xl lg:text-3xl font-bold text-gray-900 hover:text-[#8cc163] transition">
                    {section.title}
                  </h2>
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">
                    {section.user.name}
                  </span>
                  <Link href={`/userprofile/${section.user.id}`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-[#8cc163] transition">
                      <img
                        src={section.user.image || "/default-avatar.png"}
                        alt={section.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>
              </div>

              {/* ✅ Fixed Responsive Slider */}
              {section?.listPlace?.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  observer={true}
                  observeParents={true}
                  grabCursor={true}
                  className="!pb-12 w-full"
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 12,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 16,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1280: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                  }}
                >
                  {section?.listPlace?.map((spot) => (
                    <SwiperSlide key={spot.id}>
                      <Link href={`/PlaceDetails/${spot.place.slug}`}>
                        <div className="group relative overflow-hidden rounded-xl w-full h-64 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                          <img
                            src={
                              spot.place?.images?.[0]?.image ||
                              "https://via.placeholder.com/600x400"
                            }
                            alt={spot.place?.name || "No Image Available"}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {spot.place?.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-white/90">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span>
                                {spot.place?.review?.length > 0
                                  ? (
                                      spot.place.review.reduce(
                                        (acc, curr) => acc + curr.rating,
                                        0
                                      ) / spot.place.review.length
                                    ).toFixed(1)
                                  : "0.0"}
                              </span>
                              <MapPin className="w-4 h-4 text-emerald-400 ml-2" />
                              <span className="truncate">
                                {spot.place?.address || "No address"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No Places Added</p>
                </div>
              )}

              {/* Like Button */}
              <button
                onClick={() => handleLike(section.id)}
                disabled={likingId === section.id}
                className="flex items-center gap-2 bg-white border border-gray-300 hover:border-red-400 transition-all px-4 py-2 rounded-full shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {likingId === section.id ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                ) : (
                  <Heart
                    size={20}
                    className={`transition-all ${
                      section.like?.some((like) => like.userId === userId)
                        ? "text-red-500 fill-red-500 scale-110"
                        : "text-gray-500"
                    }`}
                  />
                )}
                <span className="text-gray-700 font-medium">
                  {section?.like?.length || 0}
                </span>
              </button>

              {/* Description */}
              <p className="text-gray-600 max-w-6xl leading-relaxed">
                {section.description}
              </p>

              {/* Comments Section */}
              <div className="mt-6 max-w-6xl bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Comments ({section.review?.length || 0})
                </h2>

                {section.review?.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {section.review.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex items-start space-x-4 relative"
                      >
                        {deletingCommentId === comment.id && (
                          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg z-10">
                            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}

                        <img
                          src={comment.user?.image || "/default-avatar.png"}
                          alt={comment.user?.name || "User"}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <Link href={`/userprofile/${comment.user?.id}`}>
                              <p className="font-semibold text-gray-800 hover:text-[#8cc163] transition">
                                {comment.user?.name || "Anonymous"}
                              </p>
                            </Link>
                            {comment?.user?.id === userId && (
                              <button
                                onClick={() => handleCommentDelete(comment.id)}
                                disabled={deletingCommentId === comment.id}
                                className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                          <p className="text-gray-700 mt-1 break-words">
                            {comment.comment || comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}

                {/* Comment Input */}
                <div className="flex items-start space-x-3 border-t pt-4">
                  <textarea
                    className="flex-1 p-3 bg-white text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8cc163] resize-none transition disabled:opacity-50"
                    placeholder="Add a comment..."
                    rows="2"
                    value={newComments[section.id] || ""}
                    onChange={(e) =>
                      setNewComments({
                        ...newComments,
                        [section.id]: e.target.value,
                      })
                    }
                    disabled={commentLoading === section.id}
                  />
                  <button
                    className="bg-[#8cc163] text-white text-sm py-2 px-6 rounded-full hover:bg-[#79c340] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[80px] justify-center"
                    onClick={() => handleCommentPost(section.id)}
                    disabled={
                      !newComments[section.id]?.trim() ||
                      commentLoading === section.id
                    }
                  >
                    {commentLoading === section.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ListsPage;
