'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaHeart, FaEye, FaEllipsisH, FaStar, FaShareAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PopularPost = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const posts = [
    {
      id: 1,
      user: 'Rakib Hasan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2',
      heading: 'Explore Cox’s Bazar',
      text: 'The longest sea beach in the world awaits your visit. Perfect for family trips and adventure.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg',
      location: 'Cox’s Bazar',
      category: ['Adventure', 'Travel', 'Nature'],
      likes: '330k',
      views: '540k',
      reviews: 4.5,
    },
    {
      id: 2,
      user: 'Sakib Khan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2',
      heading: 'Saint Martin Island',
      text: 'A tropical paradise with crystal-clear water. Ideal for snorkeling and relaxation.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg',
      location: 'Saint Martin Island',
      category: ['Beach', 'Relaxation', 'Activities'],
      likes: '120k',
      views: '300k',
      reviews: 4.7,
    },
    {
      id: 3,
      user: 'Masud Khan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/2/0/3/7/7/7/shard/avtr-0-48-0-48-crop.jpg?v=ff62b2f12e',
      heading: 'Sajek Valley',
      text: 'A tropical paradise with crystal-clear water. Ideal for snorkeling and relaxation.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg',
      location: 'Sajek Valley',
      category: ['Beach', 'Relaxation', 'Activities'],
      likes: '120k',
      views: '300k',
      reviews: 4.7,
    },
    {
      id: 4,
      user: 'Sakib Khan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb',
      heading: 'Saint Martin Island',
      text: 'A tropical paradise with crystal-clear water. Ideal for snorkeling and relaxation.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg',
      location: 'Saint Martin Island',
      category: ['Beach', 'Relaxation', 'Activities'],
      likes: '120k',
      views: '300k',
      reviews: 4.7,
    },
    {
      id: 5,
      user: 'Sakib Khan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb',
      heading: 'Saint Martin Island',
      text: 'A tropical paradise with crystal-clear water. Ideal for snorkeling and relaxation.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg',
      location: 'Saint Martin Island',
      category: ['Beach', 'Relaxation', 'Activities'],
      likes: '120k',
      views: '300k',
      reviews: 4.7,
    },
    {
      id: 6,
      user: 'Sakib Khan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb',
      heading: 'Saint Martin Island',
      text: 'A tropical paradise with crystal-clear water. Ideal for snorkeling and relaxation.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg',
      location: 'Saint Martin Island',
      category: ['Beach', 'Relaxation', 'Activities'],
      likes: '120k',
      views: '300k',
      reviews: 4.7,
    },
    // Additional posts...
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
                  <p className="text-sm">{post.location}</p>
                </div>
              </div>
              <div className="p-4 ">
                <div className="flex items-center mb-2">
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <h4 className="ml-3 text-sm font-medium text-gray-800">{post.user}</h4>
                  <FiMoreVertical className="ml-auto text-gray-500" />
                  {/* <button className="ml-auto text-blue-500 font-semibold">Follow</button> */}
                </div>
                <div className="flex space-x-2 mb-4">
                  {post.category.map((cat, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                    >
                      {cat}
                    </span>
                  ))}
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
                          index < Math.round(post.reviews) ? '' : 'text-gray-300'
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
      className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{selectedPost.heading}</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
      {selectedPost.image && (
        <img
          src={selectedPost.image}
          alt={selectedPost.heading}
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
      )}
      <div className="flex items-center mb-4">
        <img
          src={selectedPost.avatar}
          alt={selectedPost.user}
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h4 className="text-lg font-bold">{selectedPost.user}</h4>
          <p className="text-sm text-gray-500">{selectedPost.location}</p>
        </div>
        <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Follow
        </button>
      </div>
      <p className="text-gray-700 mb-4">{selectedPost.text}</p>
      <div className="flex space-x-2 mb-4">
        {selectedPost.category.map((cat, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
          >
            {cat}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Share Post
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded">
         Save Post
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PopularPost;
