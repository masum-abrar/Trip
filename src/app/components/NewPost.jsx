'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaHeart, FaEye, FaStar, FaList, FaPlus ,FaComment } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cookies from 'js-cookie';

const PopularPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = Cookies.get('userId');
        const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/new-posts-from-users?userId=${userId}`);
        const data = await response.json(); // ⬅️ important
  
        if (data.success) {
          setPosts(data.data);  // Update the state with fetched posts
        } else {
          console.error("Failed to load posts:", data.message || data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handleDistrictClick = (e) => {
    e.stopPropagation(); // Prevent modal from opening
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const toggleFollow = (username) => {
    if (followedUsers.includes(username)) {
      setFollowedUsers(followedUsers.filter((user) => user !== username)); // Unfollow
    } else {
      setFollowedUsers([...followedUsers, username]); // Follow
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 p-2">
    <h2 className="text-2xl text-black mb-6">New Posts </h2>

{posts?.length > 0 ? (
    <Slider {...settings}>
      {posts.map((post) => (
        <div key={post.id} className="p-2">
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => openModal(post)}
          >
            <div className="relative">
             
                <img
                  src={post.images[0]?.image || post.image}
                  alt={post.heading}
                  className="w-full h-48 object-cover"
                />
             
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
            <div className="p-4">
              <div className="flex items-center mb-2" onClick={handleDistrictClick}>
                <Link href='/profile'>
                  <img
                    src={post.user?.image || '/avatar.png'}
                    alt={post.user?.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>
                <Link href='/profile'>
                  <h4 className="ml-3 text-sm font-medium text-gray-800">{post.user?.name}</h4>
                </Link>
                <FiMoreVertical className="ml-auto text-gray-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-2">{post.description}</p>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaHeart className="cursor-pointer text-red-500" />
                    <span className="text-sm">{post.like?.length ?? 0}</span>

                  </div>
                  <div className="flex items-center space-x-1">
                  <FaComment className="cursor-pointer text-green-500" />
                  <span className="text-sm">{post.comment?.length ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
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
  
          <div>
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
                src={selectedPost.user.image}
                alt={selectedPost.user?.name || 'User'}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="text-lg font-bold text-black">{selectedPost.user?.name}</h4>
                <p className="text-sm text-gray-500">
                  {selectedPost.district?.name}, {selectedPost.subdistrict?.name}
                </p>
                <p className="text-sm text-gray-400">
                  Posted on: {selectedPost.createdAt.split('T')[0]} at {selectedPost.createdAt.split('T')[1].split('.')[0]}
                </p>
              </div>
            </div>
            <div>
                <p className="text-gray-600 text-sm mb-2">{selectedPost.description}</p>
              </div>
              <div className="flex items-center space-x-3 mb-4 mt-4">
                    <FaHeart className="cursor-pointer text-red-500" />
                    <span className="text-sm">{selectedPost.like?.length ?? 0}</span>
                    <FaComment className="cursor-pointer text-green-500" />
                    <span className="text-sm">{selectedPost.comment?.length ?? 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                 
                  </div>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default PopularPost;
