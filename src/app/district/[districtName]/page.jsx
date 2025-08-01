'use client';

import { useState, useEffect } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import Navbar from "@/app/components/Navbar";
import EventTabSection from '@/app/components/EventTabSection';
import PlacesTabSection from '@/app/components/PlacesTabSection';
import DiscussTabSection from '@/app/components/DiscussionTabSection';
import PlaceTabSec from '@/app/components/PlaceTabSec';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const DistrictPage  = ({ params }) => {
  const districtName = params?.districtName ?? '';
  const [community, setCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState('Discussion');
  // const [hasJoined, setHasJoined] = useState(false);
  const hasJoined = community?.follower?.some(follower => follower.user.id === Cookies.get("userId"));
  const [newPost, setNewPost] = useState({ text: '', images: [], place: '', subdistrict: '' });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Rakib Hasan",
      text: "Beautiful sunset at the beach!",
      replies: [],
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s"], // Change `image` to `images`
      place: "Beach",
      subdistrict: "North",
      likes: 2,
      liked: false,
      comments: [
        { id: 1, user: "Raihan", text: "Wow, amazing view!", replies: [] },
        { id: 2, user: "Sakib", text: "I love this place!", replies: [] },
        { id: 3, user: "Rihan", text: "So peaceful!", replies: [] },
        { id: 4, user: "Saad", text: "Nature's beauty!", replies: [] },
      ],
      newComment: '',
      showAllComments: false,
    },
    {
      id: 2,
      user: "Sakib Hasan",
      text: "Visited a historical site today!",
      replies: [],
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s"], // Change `image` to `images`
      place: "Hill",
      subdistrict: "South",
      likes: 5,
      liked: false,
      comments: [
        { id: 5, user: "Rihan", text: "Looks great!", replies: [] },
        { id: 6, user: "Sohel", text: "I need to visit this!", replies: [] },
        { id: 7, user: "Omar", text: "History is fascinating.", replies: [] },
        { id: 8, user: "Imran", text: "Amazing architecture!", replies: [] },
      ],
      newComment: '',
      showAllComments: false,
    },
  ]);
  const fetchCommunity = async () => {
    try {
      const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/districts/${districtName}`);
      const data = await response.json();
      setCommunity(data.data); 
    } catch (error) {
      console.error('Failed to fetch community:', error);
    }
  };
  // Fetch community data when districtName changes
  useEffect(() => {
   

    if (districtName) {
      fetchCommunity();
    }
  }, [districtName]);


  const handleJoin = async () => {
    const userId = Cookies.get("userId");
  
    if (!userId || !community?.id) {
      console.warn("Missing userId or community id");
      return;
    }
  
    try {
      const isAlreadyJoined = community.follower?.some(
        (follower) => follower.user.id === userId
      );
  
      if (isAlreadyJoined) {
        const response = await fetch(
          "https://parjatak-backend.vercel.app/api/v1/customer/delete-district-follower",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              districtId: community.id,
            }),
          }
        );
  
        const data = await response.json();
  
        if (data.success) {
          toast.success(
            `You have successfully left the "${community?.name}" community!`
          );
          // Remove follower from state
          const updatedFollowers = community.follower.filter(
            (follower) => follower.user.id !== userId
          );
          setCommunity({ ...community, follower: updatedFollowers });
          setHasJoined(false);
        } else {
          alert(data.message || "Failed to leave.");
        }
      } else {
        const response = await fetch(
          "https://parjatak-backend.vercel.app/api/v1/customer/create-district-follower",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              districtId: community.id,
            }),
          }
        );
  
        const data = await response.json();
  
        if (data.success) {
          toast.success(
            `You have successfully joined the "${community?.name}" community!`
          );
          // Add follower to state
          const updatedFollowers = [
            ...community.follower,
            { user: { id: userId } },
          ];
          setCommunity({ ...community, follower: updatedFollowers });
          setHasJoined(true);
        } else {
          alert(data.message || "Failed to follow.");
        }
      }
    } catch (error) {
      console.error("Failed to join/leave community:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-white">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      <div className="relative w-full h-64">
  <img
    src={community?.images?.[0]?.image || "https://via.placeholder.com/600x400"}
    alt=""
    className="w-full h-full object-cover"
  />


    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <h1 className="text-3xl lg:text-4xl font-bold text-white">
        {community?.name.charAt(0).toUpperCase() + community?.name.slice(1) || "loading District..."}
      </h1>
      <button
  onClick={handleJoin}
  disabled={loading} // prevent multiple calls
  className={`${
    hasJoined
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#8cc163] hover:bg-[#6fb936] hover:shadow-lg hover:scale-110"
  } text-white px-6 lg:px-8 py-2 ml-4 rounded-2xl shadow-md text-lg lg:text-xl font-bold transition-all duration-300 transform`}
>
  {hasJoined ? "Joined" : loading ? "Joining..." : "Join"}
</button>


    </div>
  
</div>


      <div className="flex justify-center mt-4">
        {['Discussion', 'Events', 'Places'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-[#8cc163] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 max-w-[750px] mx-auto">
        {activeTab === 'Discussion' && (
          <DiscussTabSection PostData={community}/>
        )}

        {activeTab === 'Events' && (
          <div>
            <EventTabSection PostData={community} fetchCommunity={fetchCommunity} />
          </div>
        )}

        {activeTab === 'Places' && (
          <div>
            <PlaceTabSec PlaceData={community} />
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000}  closeOnClick
  pauseOnHover/>
    </div>
  );
};

export default DistrictPage;
