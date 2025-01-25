'use client';

import React from 'react';
import Slider from 'react-slick';
import { FaHeart, FaEye, FaEllipsisH } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CommunitySlider = () => {
  // Sample data for posts
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
    },
    {
      id: 3,
      user: 'Raihan ahmed',
      avatar: 'https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb',
      heading: 'Explore Sylhet',
      text: 'Dive into the beauty of tea gardens and serene rivers in Sylhet. A must-see destination.',
      image: '', // Post without an image
      likes: '90k',
      views: '150k',
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
    },
    // Add more posts as needed
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 cards at a time
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <h2 className="text-2xl  mb-6 ">New Posts</h2>
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post.id} className="p-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[380px]">
              {/* User Info */}
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
                {/* <span className='ml-[88px]'> <BsThreeDotsVertical />
                </span> */}
              </div>
              {/* Image Section */}
              {post.image && (
                <img
                  src={post.image}
                  alt={post.heading}
                  className="w-full h-[150px] object-cover"
                />
              )}
              {/* Content Section */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="text-lg font-semibold">{post.heading}</h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.text}</p>
                </div>
                {/* Footer Icons */}
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
                    <div className='flex items-center space-x-1'>
                    <FaEllipsisH className="cursor-pointer" />
                    <span className="text-sm">{post.views}</span>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CommunitySlider;
