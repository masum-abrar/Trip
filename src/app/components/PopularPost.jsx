'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaHeart, FaComment } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";

const PopularPost = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const uid = Cookies.get("userId");
    setUserId(uid);
    if (!uid) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/new-posts-from-friends?userId=${uid}`
        );
        const data = await response.json();
        if (data.success) setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (!userId) return null;

  const settings = {
    dots: false,
    infinite: posts.length > 5,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    centerMode: false,
    centerPadding: "0px",
    variableWidth: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: Math.min(posts.length, 4) } },
      { breakpoint: 1024, settings: { slidesToShow: Math.min(posts.length, 3) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(posts.length, 2) } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full py-8 px-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl text-black mb-6 font-bold">New Posts From Friends</h2>

        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">Loading...</div>
        ) : posts?.length > 0 ? (
          <div className="overflow-x-visible">
            <Slider {...settings}>
              {posts.map((post) => (
                <div
                  key={post?.id}
                  className="px-2 flex-shrink-0"
                  style={{ width: "240px" }}
                >
                  <Link href={`/PostDetails/${post?.id}`} className="block">
                    <div className="bg-gray-40  rounded-xl overflow-hidden flex flex-col cursor-pointer w-full h-[320px] border border-gray-200 shadow hover:shadow-lg transition-shadow duration-300">

                      {/* Image Section */}
                      <div className="relative h-[160px] w-full overflow-hidden bg-gray-200 flex items-center justify-center rounded-t-xl">
                        {post?.images?.[0]?.image || post.image ? (
                          <img
                            src={post?.images?.[0]?.image || post.image}
                            alt="Post Image"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-500 font-medium">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* User Section */}
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Link href={`/userprofile/${post.user?.id}`}>
                            <img
                              src={post.user?.image || "/avatar.png"}
                              alt={post.user?.name || "User"}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                          </Link>
                          <Link href={`/userprofile/${post.user?.id}`}>
                            <h4 className="ml-2 text-sm font-medium text-gray-800">{post.user?.name || "Unknown"}</h4>
                          </Link>
                        </div>
                        <FiMoreVertical className="text-gray-500" />
                      </div>

                      {/* Description */}
                      <div className="px-3 flex-1 overflow-hidden">
                        <p className="text-gray-600 text-sm line-clamp-3">{post?.description || "No description available"}</p>
                      </div>

                      {/* Likes & Comments */}
                      <div className="flex justify-between items-center px-3 pb-3 text-gray-600">
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-1">
                            <FaHeart className="text-red-500" />
                            <span className="text-sm">{post.like?.length ?? 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaComment className="text-green-500" />
                            <span className="text-sm">{post.comment?.length ?? 0}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8 text-lg">No posts available</div>
        )}

      </div>
    </div>
  );
};

export default PopularPost;
