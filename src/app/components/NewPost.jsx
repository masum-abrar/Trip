'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

const NewPost = () => {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Initially 6 posts
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/posts`
        ); // This API should return all users' new posts
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

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const handleDistrictClick = (e) => e.stopPropagation();

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="container mx-auto max-w-6xl py-8 px-2">
      <h2 className="text-2xl text-black mb-6">New Posts</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-[360px] p-2 rounded-lg shadow-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePosts.map((post) => (
              <Link href={`/PostDetails/${post?.id}`} key={post?.id} className="block">
                <div
                  className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col cursor-pointer w-full h-[360px] hover:shadow-2xl transition"
                  onClick={() => openModal(post)}
                >
                  <div className="relative h-[180px]">
                    {post.images?.[0]?.image || post.image ? (
                      <img
                        src={post.images?.[0]?.image || post.image}
                        alt={post.heading}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-2 left-2 text-white">
                      <h4 className="text-lg font-bold">{post.heading}</h4>
                      <Link href={`/district/${post.district?.name}`}>
                        <span
                          onClick={handleDistrictClick}
                          className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full mt-1 cursor-pointer hover:bg-blue-200"
                        >
                          {post.district?.name}
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <Link href={`/userprofile/${post.user?.id}`}>
                        <img
                          src={post.user?.image || "/avatar.png"}
                          alt={post.user?.name}
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
                    <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>
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
              </Link>
            ))}
          </div>

          {visibleCount < posts.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-[#8cc163] hover:bg-green-600 text-white rounded-lg transition"
              >
                See More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 py-8 text-lg">No posts available</div>
      )}

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-x-hidden"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">{selectedPost.heading}</h2>
            {(selectedPost.images?.[0]?.image || selectedPost.image) && (
              <img
                src={selectedPost.images?.[0]?.image || selectedPost.image}
                alt={selectedPost.heading}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex items-center mb-4">
              <img
                src={selectedPost.user.image || "/avatar.png"}
                alt={selectedPost.user?.name || "User"}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="text-lg font-bold text-black">{selectedPost.user?.name}</h4>
                <p className="text-sm text-gray-500">
                  {selectedPost.district?.name}, {selectedPost.subdistrict?.name}
                </p>
                <p className="text-sm text-gray-400">
                  Posted on: {selectedPost.createdAt.split("T")[0]} at {selectedPost.createdAt.split("T")[1].split(".")[0]}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{selectedPost.description}</p>
            <div className="flex items-center space-x-3 mb-4 mt-4">
              <FaHeart className="cursor-pointer text-red-500" />
              <span className="text-sm">{selectedPost.like?.length ?? 0}</span>
              <FaComment className="cursor-pointer text-green-500" />
              <span className="text-sm">{selectedPost.comment?.length ?? 0}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPost;
