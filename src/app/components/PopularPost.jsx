'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaHeart, FaEye, FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PopularPost = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followedUsers, setFollowedUsers] = useState([]); // Array to store followed users

  const posts = [
    {
      id: 1,
      user: 'Rakib Hasan',
      avatar:
        'https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2',
      heading: 'Explore Cox’s Bazar',
      text: 'The longest sea beach in the world awaits your visit. Perfect for family trips and adventure.',
      image:
        'https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg',
      district: 'Chattogram',
      subdistrict: 'Cox’s Bazar',
      likes: '330k',
      views: '540k',
      reviews: 4.5,
      postDate: '2024-12-25',
      likedBy: [
        {
          name: 'Amina',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
          name: 'Shakil',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
      ],
    },
    {
      id: 2,
      user: 'Sakib Khan',
      avatar:
        'https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2',
      heading: 'Saint Martin Island',
      text: 'A tropical paradise with crystal-clear water. Ideal for snorkeling and relaxation.',
      image:
        'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg',
      district: 'Chattogram',
      subdistrict: 'Saint Martin',
      likes: '120k',
      views: '300k',
      reviews: 4.7,
      postDate: '2024-11-20',
      likedBy: [
        {
          name: 'Arif',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
          name: 'Nabila',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
      ],
    },
  ];

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
      <h2 className="text-2xl text-black mb-6">Popular Posts</h2>
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post.id} className="p-2">
            <div
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(post)}
            >
              <div className="relative">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.heading}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-lg font-bold">{post.heading}</h4>
                  <p className="text-sm">
                    {post.district}, {post.subdistrict}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <h4 className="ml-3 text-sm font-medium text-gray-800">
                    {post.user}
                  </h4>
                  <FiMoreVertical className="ml-auto text-gray-500" />
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                      <FaHeart className="cursor-pointer text-red-500" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaEye className="cursor-pointer text-blue-500" />
                      <span className="text-sm">{post.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-yellow-500 ${
                          index < Math.round(post.reviews)
                            ? ''
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {isModalOpen && selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">{selectedPost.heading}</h2>
              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt={selectedPost.heading}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-center mb-4">
                <img
                  src={selectedPost.avatar}
                  alt={selectedPost.user}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="text-lg font-bold text-black">{selectedPost.user}</h4>
                  <p className="text-sm text-gray-500">
                    {selectedPost.district}, {selectedPost.subdistrict}
                  </p>
                  <p className="text-sm text-gray-400">
                    Posted on: {selectedPost.postDate}
                  </p>
                </div>
                {/* Follow Button */}
                <button
                  onClick={() => toggleFollow(selectedPost.user)}
                  className={`ml-auto px-4 py-2 rounded-lg shadow text-white ${
                    followedUsers.includes(selectedPost.user)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {followedUsers.includes(selectedPost.user)
                    ? 'Unfollow'
                    : 'Follow'}
                </button>
              </div>
              <p className="text-gray-700 mb-4">{selectedPost.text}</p>

              {/* Rating Section */}
              <div className="flex items-center mb-4">
                <h4 className="text-lg font-bold mr-2">Rating:</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-yellow-500 ${
                        index < Math.round(selectedPost.reviews)
                          ? ''
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({selectedPost.reviews.toFixed(1)})
                </span>
              </div>

              {/* Liked By Section */}
              <div className="mb-4">
  <h4 className="text-lg font-bold mb-2">Liked By:</h4>
  <div className="flex -space-x-4">
    {selectedPost.likedBy.map((user, index) => (
      <div
        key={index}
        className="relative group w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md"
        title={user.name}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        {/* Tooltip */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-md">
          {user.name}
        </div>
      </div>
    ))}
  </div>
</div>


             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularPost;
