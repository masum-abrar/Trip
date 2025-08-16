'use client';

import { useState, useEffect, use } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import Navbar from "@/app/components/Navbar";
import EventTabSection from '@/app/components/EventTabSection';
import PlacesTabSection from '@/app/components/PlacesTabSection';
import DiscussTabSection from '@/app/components/DiscussionTabSection';
import PlaceTabSec from '@/app/components/PlaceTabSec';
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DistrictPage = ({ params }) => {
  const resolvedParams = use(params);
  const districtName = resolvedParams?.districtName ?? '';
  const [community, setCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState('Discussion');
  const [newPost, setNewPost] = useState({ text: '', images: [], place: '', subdistrict: '' });
  const [loading, setLoading] = useState(false);

  const userId = Cookies.get("userId");
  const isLoggedIn = !!userId;

  const hasJoined = community?.follower?.some(follower => follower.user.id === userId);

  const fetchCommunity = async () => {
    try {
      const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/districts/${districtName}`);
      const data = await response.json();
      setCommunity(data.data); 
    } catch (error) {
      console.error('Failed to fetch community:', error);
    }
  };

  useEffect(() => {
    if (districtName) fetchCommunity();
  }, [districtName]);

  const handleJoin = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to join the community!");
      return;
    }

    if (!community?.id) return;

    try {
      const isAlreadyJoined = community.follower?.some(
        (follower) => follower.user.id === userId
      );

      if (isAlreadyJoined) {
        const response = await fetch(
          "https://parjatak-backend.vercel.app/api/v1/customer/delete-district-follower",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, districtId: community.id }),
          }
        );

        const data = await response.json();
        if (data.success) {
          toast.success(`You have successfully left "${community?.name}"!`);
          const updatedFollowers = community.follower.filter(
            (follower) => follower.user.id !== userId
          );
          setCommunity({ ...community, follower: updatedFollowers });
        } else {
          toast.error(data.message || "Failed to leave.");
        }
      } else {
        const response = await fetch(
          "https://parjatak-backend.vercel.app/api/v1/customer/create-district-follower",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, districtId: community.id }),
          }
        );

        const data = await response.json();
        if (data.success) {
          toast.success(`You have successfully joined "${community?.name}"!`);
          const updatedFollowers = [...community.follower, { user: { id: userId } }];
          setCommunity({ ...community, follower: updatedFollowers });
        } else {
          toast.error(data.message || "Failed to join.");
        }
      }
    } catch (error) {
      console.error("Failed to join/leave community:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      {/* Banner Image */}
      <div className="relative w-full h-64">
        <img
          src={community?.images?.[0]?.image || "https://via.placeholder.com/600x400"}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            {community?.name?.charAt(0).toUpperCase() + community?.name?.slice(1) || "Loading..."}
          </h1>
          <button
            onClick={handleJoin}
            disabled={loading}
            className={`${
              hasJoined ? "bg-gray-400 cursor-not-allowed" : "bg-[#8cc163] hover:bg-[#6fb936] hover:shadow-lg hover:scale-110"
            } text-white px-6 lg:px-8 py-2 ml-4 rounded-2xl shadow-md text-lg lg:text-xl font-bold transition-all duration-300 transform`}
          >
            {hasJoined ? "Joined" : loading ? "Joining..." : "Join"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-4">
        {['Discussion', 'Events', 'Places'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ${
              activeTab === tab ? 'bg-[#8cc163] text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 max-w-[750px] mx-auto">
        {activeTab === 'Discussion' && <DiscussTabSection PostData={community} />}
        {activeTab === 'Events' && <EventTabSection PostData={community} fetchCommunity={fetchCommunity} />}
        {activeTab === 'Places' && <PlaceTabSec PlaceData={community} />}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default DistrictPage;
