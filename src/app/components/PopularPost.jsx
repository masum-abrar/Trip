"use client";
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) return;
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/new-posts-from-friends?userId=${userId}`
        );
        const data = await response.json();
        if (data.success) setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const settings = {
    dots: true,
    infinite: posts.length > 5,
    speed: 500,
    slidesToShow: Math.min(posts.length, 5),
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: Math.min(posts.length, 4) } },
      { breakpoint: 1024, settings: { slidesToShow: Math.min(posts.length, 3) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(posts.length, 2) } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handleDistrictClick = (e) => e.stopPropagation();

  return (
    <div className="container mx-auto max-w-6xl py-8 px-2">
      <h2 className="text-2xl text-black mb-6">New Posts From Friends</h2>
      {posts?.length > 0 ? (
        <Slider {...settings}>
          {posts.map((post) => (
            <Link href={`/PostDetails/${post?.id}`} key={post?.id} className="block">
              <div className="p-2">
                <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col cursor-pointer w-[240px] h-[360px]">
                  {/* Fixed standard size */}
                  <div className="relative h-[180px]">
                    <img
                      src={post?.images?.[0]?.image || post.image}
                      alt={post?.heading}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-2 left-2 text-white">
                      <h4 className="text-lg font-bold">{post?.heading}</h4>
                      <Link href={`/district/${post.district?.name}`}>
                        <span
                          onClick={handleDistrictClick}
                          className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full mt-1 cursor-pointer hover:bg-blue-200"
                        >
                          {post?.district?.name}
                        </span>
                      </Link>
                    </div>
                  </div>
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
                        <h4 className="ml-2 text-sm font-medium text-gray-800">{post.user?.name}</h4>
                      </Link>
                    </div>
                    <FiMoreVertical className="text-gray-500" />
                  </div>
                  <div className="px-3 flex-1 overflow-hidden">
                    <p className="text-gray-600 text-sm line-clamp-3">{post?.description}</p>
                  </div>
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
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-500 py-8 text-lg">No posts available</div>
      )}
    </div>
  );
};

export default PopularPost;
