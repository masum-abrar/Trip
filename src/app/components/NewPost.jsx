'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaHeart, FaEye, FaEllipsisH, FaStar,FaShareAlt } from 'react-icons/fa';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CommunitySlider = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const posts = [
    {
      id: 1,
      user: 'Rakib hasan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2',
      heading: 'Explore Cox’s Bazar',
      text: 'The longest sea beach in the world awaits your visit. Perfect for family trips and adventure.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg',
      likes: '330k',
      views: '540k',
      reviews: 4.5,
      district: 'Chattogram',
      subdistrict: 'Saint Martin',
      postDate: '2024-11-20',
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
      user: 'Sakib khan',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb',
      heading: 'Saint Martin Island',
      text: 'A tropical paradise with crystal-clear water. Ideal for snorkeling and relaxation.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg',
      likes: '120k',
      views: '300k',
      reviews: 4.7,
      district: 'Chattogram',
      subdistrict: 'Saint Martin',
      postDate: '2024-11-20',
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
      id: 3,
      user: 'Raihan ahmed',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb',
      heading: 'Explore Sylhet',
      text: 'Dive into the beauty of tea gardens and serene rivers in Sylhet. A must-see destination.',
      image: '',
      likes: '90k',
      views: '150k',
      reviews: 4.2,
      district: 'Chattogram',
      subdistrict: 'Saint Martin',
      postDate: '2024-11-20',
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
      id: 4,
      user: 'Sumaiya binte',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2',
      heading: 'Sajek Valley',
      text: 'A peaceful retreat with breathtaking views of lush green hills. Great for couples and nature lovers.',
      image: 'https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg',
      likes: '400k',
      views: '750k',
      reviews: 4.8,
      district: 'Chattogram',
      subdistrict: 'Saint Martin',
      postDate: '2024-11-20',
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
      <h2 className="text-2xl text-black mb-6">New Posts</h2>
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post.id} className="p-2">
            <div
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[380px] hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openModal(post)}
            >
              <div className="flex items-center p-4 border-b border-gray-200">
                {post.avatar ? (
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-500">
                      {post.user[0]}
                    </span>
                  </div>
                )}
                <h4 className="ml-3 text-sm font-medium text-gray-800">{post.user}</h4>
                <button className="ml-auto text-blue-500 font-semibold">Follow</button>
              
              </div>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.heading}
                  className="w-full h-[150px] object-cover"
                />
              )}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="text-lg font-semibold text-black">{post.heading}</h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.text}</p>
                </div>
                <div className="flex justify-between items-center mt-4 text-gray-600">
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                      <FaHeart className="cursor-pointer" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaEye className="cursor-pointer" />
                      <span className="text-sm">{post.views}</span>
                    </div>
                  
                    {/* <div className="flex items-center space-x-1">
                    <FaEllipsisH className="ml-auto text-gray-500" />
                      <span className="text-sm">{post.views}</span>
                    </div> */}
                    <div className="flex items-center space-x-1">
                    <FaShareAlt className="cursor-pointer text-gray-600" />
                    <span className="cursor-pointer text-gray-600">Save</span>
                  </div>
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
              <h2 className="text-xl font-bold text-black">{selectedPost.heading}</h2>
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
              {selectedPost.avatar ? (
                <img
                  src={selectedPost.avatar}
                  alt={selectedPost.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-500">
                    {selectedPost.user[0]}
                  </span>
                </div>
              )}
              
              <div className='ml-4'>
              <h4 className="text-lg font-bold text-black">{selectedPost.user}</h4>
              <p className="text-sm text-gray-500">
                {selectedPost.district}, {selectedPost.subdistrict}
              </p>
              <p className="text-sm text-gray-400">
                Posted on: {selectedPost.postDate}
              </p>
            </div>
            </div>
            
            <p className="text-black mb-4">{selectedPost.text}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1">
                  <FaHeart className="cursor-pointer text-red-500" />
                  <span className="text-sm text-black">{selectedPost.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaEye className="cursor-pointer text-blue-500" />
                  <span className="text-sm text-black">{selectedPost.views}</span>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-yellow-500 ${index < Math.round(selectedPost.reviews) ? '' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({selectedPost.reviews})</span>
              </div>
              
            </div>
            <h4 className="text-lg font-bold mb-2 mt-4 text-black">Liked By:</h4>
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
      )}
    </div>
  );
};

export default CommunitySlider;