'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar'

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/users/${id}`);
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="animate-pulse space-y-4 w-[350px] p-6 bg-white rounded-lg shadow-sm">
            {/* Circular Avatar */}
            <div className="h-24 w-24 bg-gray-300 rounded-full mx-auto"></div>
            
            {/* Loading Name */}
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
            
            {/* Loading Bio */}
            <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
            
            {/* Loading Button */}
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
            
            {/* Stats Boxes */}
            <div className="flex space-x-4 mt-6">
              <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto"></div>
              <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto"></div>
              <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto"></div>
              <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  
  
  

  return (
    <div className="min-h-screen bg-white">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white  rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start justify-between">
          
          {/* Left Section: Avatar + Info */}
          <div className="flex items-start gap-4 w-full md:w-1/2">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {user.name?.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-500 text-sm mt-1">Traveler | Explorer | Nature Enthusiast</p>
           
              <button className="mt-3 bg-[#8cc163] text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all text-sm font-semibold">
                Follow
              </button>
            </div>
          </div>

          {/* Right Section: Stats */}
          <div className="mt-6 md:mt-0 w-full md:w-1/2">
            <ul className="flex justify-around gap-4 text-center">
              <li>
                <h2 className="text-xl font-bold">{user.placesCount || 1}</h2>
                <p className="text-sm text-gray-500">Places</p>
              </li>
              <li>
                <h2 className="text-xl font-bold">{user.tripsThisYear || 1}</h2>
                <p className="text-sm text-gray-500">This Year</p>
              </li>
              <li>
                <h2 className="text-xl font-bold">{user.followingg || 1}</h2>
                <p className="text-sm text-gray-500">Following</p>
              </li>
              <li>
                <h2 className="text-xl font-bold">{user.followers || 0}</h2>
                <p className="text-sm text-gray-500">Followers</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
