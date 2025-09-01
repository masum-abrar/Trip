'use client';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { MapPin, Star, Heart, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Footer import

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from "swiper/react";
import  { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function App() {
  const [sections, setSections] = useState([]);
  const [likes, setLikes] = useState({});
  const [newComments, setNewComments] = useState({});
  const [filteredSections, setFilteredSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = Cookies.get("userId"); 
  const [isLikeId, setIsLikeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // List fetch
  const fetchLists = async () => {
    try {
      const response = await fetch('https://parjatak-backend.vercel.app/api/v1/customer/lists');
      const data = await response.json();
      
      if (data && data.data) {
        setSections(data.data);
        setFilteredSections(data.data);

        const initialLikes = {};
        data.data.forEach(section => {
          initialLikes[section.id] = section.isLiked; 
        });
        setLikes(initialLikes);
      }
    } catch (error) {
      console.error("Failed to fetch lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleLike = async (listId) => {
    setIsLoading(true);
    // if(isLikeId === null){
    //   setIsLikeId(listId);
    // }else{
    //   setIsLikeId(null);
    // }
    const oldSections = [...sections];
    try {
      const sectionIndex = sections.findIndex((s) => s.id === listId);
      if (sectionIndex === -1) return;

      const oldSection = oldSections[sectionIndex];
      const oldLikes = oldSection.like ? [...oldSection.like] : [];
      const isLiked = oldLikes.some((like) => like.userId === userId);

      let newLikes;
      if (isLiked) {
        newLikes = oldLikes.filter((like) => like.userId !== userId);
      } else {
        newLikes = [...oldLikes, { userId }];
      }

      const updatedSection = { ...oldSection, like: newLikes };
      oldSections[sectionIndex] = updatedSection;
      setSections(oldSections);

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

      await fetchLists();

      // setIsLikeId(0);

      if (!data.success) {
        setSections([...sections]);
        console.error("Server error:", data.message);
      }
    } catch (error) {
      console.error("Like error:", error);
      setSections([...sections]);
    }finally {
      setIsLoading(false);
    }
  };

  const handleCommentPost = async (listId) => {
    if (newComments[listId]?.trim()) {
      try {
        await fetch('https://parjatak-backend.vercel.app/api/v1/customer/create-list-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            listId,
            userId,
            rating: 5,
            comment: newComments[listId],
          }),
        });

        fetchLists();
        setNewComments({ ...newComments, [listId]: '' });
      } catch (error) {
        console.error('Comment error:', error);
      }
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/delete-list-review/${commentId}`, {
        method: 'POST',
      });
  
      if (res.ok) {
        fetchLists();
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Delete comment error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                setSearchQuery(value);

                const filtered = sections.filter((section) =>
                  section.title?.toLowerCase().includes(value)
                );
                setFilteredSections(filtered);
              }}
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

        {sections.length === 0 ? (
     <div className="relative w-full h-96 flex items-center justify-center">
    {/* Dark overlay */}
    

    {/* Animated loading */}
  <div className="flex flex-col items-center justify-center py-20">
    <div className="flex space-x-2 mb-4">
      <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></span>
      <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300"></span>
      <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-450"></span>
    </div>
    <p className="text-gray-700 text-lg font-semibold animate-pulse">
      Preparing the places for you...
    </p>
  </div>
  </div>
        ) : (
          filteredSections.map((section) => (
            <section key={section.id} className="space-y-6">
              {/* Section Header */}
              <div className="flex justify-between items-center">
                <Link href={`/list/${(section.slug)}`}>
                  <h2 className="text-xl lg:text-3xl font-bold text-gray-900">{section.title}</h2>
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">{section.user.name}</span>
                  <Link href={`/userprofile/${section.user.id}`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={section.user.image} alt={section.user.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Slider */}
              {section?.listPlace?.length > 0 ? (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1200: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  className="mySwiper"
                >
                  {section.listPlace.map((spot) => (
                    <SwiperSlide key={spot.id} className="group relative overflow-hidden rounded-xl max-w-[350px] w-full aspect-[4/3] transform hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />
                      <Link href={`/PlaceDetails/${spot.place.slug}`} key={spot.id} className="block">
                        <img
                          src={spot.place?.images?.[0]?.image || "https://via.placeholder.com/600x400"}
                          alt={spot.place?.name || "No Image Available"}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </Link>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-lg font-semibold text-white">{spot.place?.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-white/80">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>
                            {spot.place?.review?.length > 0
                              ? (
                                  spot.place.review.reduce((acc, curr) => acc + curr.rating, 0) / spot.place.review.length
                                ).toFixed(1)
                              : "0.0"}
                          </span>
                          <MapPin className="w-4 h-4 text-emerald-400 ml-2" />
                          <span>{spot.place?.address}</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No Places Added</p>
                </div>
              )}

              {/* Like Button */}
              {isLoading ? <div className="spinner_loader"></div> : 
              <button
                onClick={() => handleLike(section.id)}
                className="flex items-center gap-2 bg-white border border-gray-300 hover:border-red-400 transition-all px-4 py-2 rounded-full shadow-sm hover:shadow-md mt-4"
              >
                <Heart
                  size={20}
                  className={`transition-all ${
                    (section.like?.some((like) => like.userId === userId))
                      ? "text-red-500 fill-red-500 scale-110"
                      : "text-gray-500"
                  }`}
                />
                <span className="text-gray-700 font-medium">{section?.like?.length}</span>
              </button>
              }

              {/* Description */}
              <p className="text-gray-600 max-w-6xl">{section.description}</p>

              {/* Comments Section */}
              <div className="mt-6 max-w-6xl bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Comments</h2>

                {section.review?.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4 mb-5">
                    <img 
                      src={comment.user?.image || "https://i.pravatar.cc/300"} 
                      alt={comment.name || "User"} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Link href={`/userprofile/${comment.user?.id}`}>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-gray-800">{comment.user?.name || "Anonymous"}</p>
                          </div>
                        </Link>
                        {comment.userId === userId && (
                          <button onClick={() => handleCommentDelete(comment.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-800 mt-1">{comment.comment || comment.text}</p>
                    </div>
                  </div>
                ))}

                {/* Comment Box */}
                <div className="mt-4 flex items-start space-x-3 border-t pt-4">
                  <textarea
                    className="w-full p-3 bg-gray-100 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
                    placeholder="Add a comment..."
                    rows="2"
                    value={newComments[section.id] || ""}
                    onChange={(e) => setNewComments({ ...newComments, [section.id]: e.target.value })}
                  />
                  <button
                    className={`bg-[#8cc163] text-white text-sm py-2 px-4 rounded-full hover:bg-green-700 transition ${!newComments[section.id]?.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleCommentPost(section.id)}
                    disabled={!newComments[section.id]?.trim()}
                  >
                    Post
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

export default App;
