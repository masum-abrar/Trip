'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { FaPlus } from "react-icons/fa";
import Footer from '../../components/Footer';

import { Swiper, SwiperSlide } from "swiper/react";
import  { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Link from "next/link";



const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('diary');
   const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const cookiesuserId = Cookies.get("userId");
  const [places, setPlaces] = useState([]);
    const [lists, setLists] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedList, setSelectedList] = useState("");
    const [spotModalOpen, setSpotModalOpen] = useState(false);
    const [bucketList, setBucketList] = useState([]);
    const [diaryList, setDiaryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
     const [userId, setUserId] = useState("");
    //  const [isFollowing, setIsFollowing] = useState(false); 
     const cookiesUserId = Cookies.get("userId");
     const [showFollowers, setShowFollowers] = useState(false);
     const [showFollowing, setShowFollowing] = useState(false);




    //  useEffect(() => {
    //   const checkIfFollowing = async () => {
    //     try {
    //       const res = await axios.get(`https://parjatak-backend.vercel.app/api/v1/customer/check-follow-status?userId=${cookiesUserId}&parentUserId=${id}`);
    //       if (res.data.success && res.data.data) {
    //         setIsFollowing(true);
    //       } else {
    //         setIsFollowing(false);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    
    //   checkIfFollowing();
    // }, []);
    
    const isFollowing = user?.follower?.some(
      (f) => f.userId === id && f.parentUserId === cookiesUserId
    );

    const handleFollowToggle = async () => {

       if (!cookiesUserId) {
    toast.error("You need to login first to follow someone.");
    setTimeout(() => {
      router.push("/login"); // Ensure useRouter() is imported
    }, 2000);
    return;
  }
      const isFollowing = user?.follower?.some(
        (f) => f.userId === id && f.parentUserId === cookiesUserId
      );
      try {
        const res = await fetch('https://parjatak-backend.vercel.app/api/v1/customer/create-followers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: id,
            parentUserId: cookiesUserId,
          }),
        });
    
        const data = await res.json();
    
        if (data.success) {
          toast.success(data.message);
          // setIsFollowing((prev) => !prev); 
        } else {
          toast.error("Action failed!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    };
    
    

const createBucketList = async (payload) => {
  try {
    const res = await fetch("https://parjatak-backend.vercel.app/api/v1/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    console.error("Create Bucket List Error:", error.message);
    throw error;
  }
};
  
const fetchBucketList = async () => {
  try {
    const response = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/bucketLists");
    const result = await response.json();

    if (result?.data?.length > 0) {
      const userLists = result.data.filter((list) => list.user?.id === id);
      setBucketList(userLists);
    } else {
      setBucketList([]);
    }
  } catch (error) {
    console.error("Error fetching BucketList:", error);
  }
};

useEffect(() => {
  if (id) {
    fetchBucketList(); 
  }
}, [id]);


 // Diary List Fetch
 const fetchDiaryList = async () => {
  try {
    const response = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/diaries");
    const result = await response.json();

    if (result?.data?.length > 0) {
      const userDiaries = result.data.filter((diary) => diary.user?.id === id);
      setDiaryList(userDiaries);
    } else {
      setDiaryList([]);
    }
  } catch (error) {
    console.error("Error fetching DiaryList:", error);
  }
};

useEffect(() => {
  if (id) {
 
    fetchDiaryList();
  }
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    userId: id,
   
    title,
    description,
    isActive: privacy === "Public" ? "true" : "false",
  };

  try {
    const result = await createBucketList(payload);
    console.log("Bucket list created:", result);
    setIsModalOpen(false); // close modal
  } catch (error) {
    console.error("Failed to create bucket list:", error.message);
  }
};




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/users/${id}`);
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
    // Fetch places function
    const fetchPlaces = async () => {
      try {
        const response = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/places");
        const data = await response.json();
        setPlaces(data.data); 
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    
    // Fetch lists function
    const fetchLists = async () => {
      try {
        const response = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/lists");
        const data = await response.json();
        const userLists = data.data.filter((list) => list.user.id === id);
        setLists(userLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
      
    };

     useEffect(() => {
       if (id) {
         fetchPlaces();
         fetchLists();
       }
     }, [id]);
    
    const handleSpotSubmit = async () => {
      if (!selectedPlace || !selectedList) {
        alert("Please select both Place and List");
        return;
      }
  
      const payload = {
        userId : id,
        listId: selectedList,
        placeId: selectedPlace,
        isActive: true,
      };
  
      try {
        const response = await fetch("https://parjatak-backend.vercel.app/api/v1/add-lists-places", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          alert("Spot added successfully!");
          setSpotModalOpen(false);
          setSelectedPlace("");
          setSelectedList("");
        } else {
          alert("Failed to add spot!");
        }
      } catch (error) {
        console.error("Error posting spot:", error);
        alert("Something went wrong!");
      }
    };
  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="animate-pulse space-y-4 lg:w-[350px] w-[200px] p-6 bg-white rounded-lg shadow-sm">
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
          <div className="animate-pulse space-y-4 lg:w-[350px] w-[200px] p-6 bg-white rounded-lg shadow-sm">
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
          <div className="animate-pulse space-y-4 lg:w-[350px] w-[200px] p-6 bg-white rounded-lg shadow-sm">
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
           
              <button 
  onClick={handleFollowToggle}
  className={`mt-3 px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
    isFollowing ? 'bg-gray-400 text-white hover:bg-gray-600' : 'bg-[#8cc163] text-white hover:bg-green-700'
  }`}
>
  {isFollowing ? "Following" : "Follow"}
</button>

            </div>
          </div>

          {/* Right Section: Stats */}
          <div className="mt-6 md:mt-0 w-full md:w-1/2">
            <ul className="flex justify-center lg:justify-end gap-4 text-center">
             
              <li onClick={() => setShowFollowing(true)} className="cursor-pointer">
  <h2 className="text-xl font-bold">{user?.following?.length || 0}</h2>
  <p className="text-sm text-gray-500">Following</p>
</li>
{showFollowing && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-md rounded-lg p-5 max-h-[400px] overflow-y-auto relative shadow-lg">
      <button
        className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        onClick={() => setShowFollowing(false)}
      >
        ✕
      </button>

      <h3 className="text-xl font-semibold mb-4 text-center">Following</h3>

      {user.following?.length > 0 ? (
        user.following.map((f, index) => (
          <Link key={index} href={`/userprofile/${f?.otherUser?.id}`}>
      <div className="flex items-center gap-3 mb-4 border-b pb-2 cursor-pointer">
        <img
          src={f?.otherUser?.image || "https://via.placeholder.com/40"}
          alt={f?.otherUser?.name || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{f?.otherUser?.fullname || f?.otherUser?.name || "User"}</p>
        </div>
      </div>
    </Link>
        ))
      ) : (
        <p className="text-gray-600 text-sm">No following found.</p>
      )}
    </div>
  </div>
)}

              <li onClick={() => setShowFollowers(true)} className="cursor-pointer">
  <h2 className="text-xl font-bold">{user.follower?.length || 0}</h2>
  <p className="text-sm text-gray-500">Followers</p>
</li>
{showFollowers && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-md rounded-lg p-5 max-h-[400px] overflow-y-auto relative shadow-lg">
      <button
        className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        onClick={() => setShowFollowers(false)}
      >
        ✕
      </button>

      <h3 className="text-xl font-semibold mb-4 text-center">Followers</h3>

      {user.follower?.length > 0 ? (
        user.follower.map((f, index) => (
               <Link key={index} href={`/userprofile/${f?.meUser?.id}`}>
          <div key={index} className="flex items-center gap-3 mb-4 border-b pb-2">
            <img
              src={f?.meUser?.image || "https://via.placeholder.com/40"}
              alt={f?.meUser?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{f?.meUser?.fullname || f?.meUser?.name}</p>
             
            </div>
          </div>

          </Link>
        ))
      ) : (
        <p className="text-gray-600 text-sm">No followers found.</p>
      )}
    </div>
  </div>
)}

            </ul>
          </div>

        </div>
         {/* Tab Navigation */}
                <div className="text-center mb-8">
                  <ul className="inline-flex flex-wrap justify-center border-b w-full border-gray-300 pb-2 space-x-4 sm:space-x-6">
                    {/* <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('profile')}
                    >
                      Profile
                    </li> */}
                    {/* <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('activity')}
                    >
                      Activity
                    </li> */}
                    {/* <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'place' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('place')}
                    >
                      Place
                    </li> */}
                    <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'diary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('diary')}
                    >
                      Diary
                    </li>
                    {/* <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('reviews')}
                    >
                      Reviews
                    </li> */}
                    <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('list')}
                    >
                     List
                    </li>
                    <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'bucket' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('bucket')}
                    >
                      Bucket list
                    </li>
                    <li
                      className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                        activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabClick('events')}
                    >
                      Events
                    </li>
                  </ul>
                </div>
        
                {/* Content Section */}
                <div className="grid grid-cols-1  gap-8 p-7">
                  <div className="lg:col-span-2">
                    {/* Profile Section */}
                    {activeTab === 'profile' && (
                      <div>
                        <h2 className="text-xl font-bold mb-4 border-b">Favorite Places</h2>
                        <p className="text-gray-500 text-sm mb-4">
                          Don’t forget to select your <span className="font-bold">favorite places</span>!
                        </p>
                        <h2 className="text-xl font-bold mb-4 border-b">Recent Activity</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {[ 
                            { name: "Sylhet", img: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg" },
                            { name: "Coxs Bazar", img: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg" },
                            { name: "Saint Martin", img: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg" },
                            { name: "Coxs Bazar", img: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" },
                          ].map((place, idx) => (
                            <div key={idx} className="bg-gray-100 p-4 rounded">
                              <img src={place.img} alt={place.name} className="w-full rounded" />
                              <h3 className="mt-2 text-sm font-bold text-center">{place.name}</h3>
                              <p className="text-center text-gray-500 text-xs">★★★★½</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
        
                    {/* Activity Section */}
                    {activeTab === 'activity' && (
                      <div>
                        <h2 className="text-xl font-bold mb-4 border-b">Recent Activity</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {[ 
                            { name: "Sylhet", img: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg" },
                            { name: "Coxs Bazar", img: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg" },
                            { name: "Saint Martin", img: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg" },
                            { name: "Coxs Bazar", img: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" },
                          ].map((place, idx) => (
                            <div key={idx} className="bg-gray-100 p-4 rounded">
                              <img src={place.img} alt={place.name} className="w-full rounded" />
                              <h3 className="mt-2 text-sm font-bold text-center">{place.name}</h3>
                              <p className="text-center text-gray-500 text-xs">★★★★½</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
        
                   {/* Place Section */}
                   {activeTab === 'place' && (
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">Places Visited</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full h-48 object-cover" src="https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg" alt="Cox's Bazar" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-700">Cox's Bazar</div>
                  <p className="text-gray-600 text-base">Walked along the world’s longest sea beach and enjoyed fresh seafood.</p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full h-48 object-cover" src="https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg" alt="Sundarbans" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-700">Sundarbans</div>
                  <p className="text-gray-600 text-base">Explored the largest mangrove forest and spotted the Royal Bengal Tiger.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
      {/* Diary Section */}
{activeTab === 'diary' && (
  <div className="p-6">
    {/* Diary Entries */}
    <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-4 border-b-2 border-gray-300 pb-2 text-center">
      Diary Entries
    </h2>

    {diaryList.length > 0 ? (
      <div className="space-y-4">
        {diaryList.map((diary) => (
          <div key={diary.id} className="bg-white rounded shadow-md overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={diary.place?.images?.[0]?.image || "https://via.placeholder.com/300x200"}
              alt={diary.place?.name || "Diary Image"}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-700">{diary.title}</h3>
              <p className="text-gray-600">{diary.description}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 text-lg mt-8">
        No diary entries found.
      </p>
    )}
  </div>
)}

        
        {/* Reviews Section */}
        {activeTab === 'reviews' && (
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">
              Reviews 
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full h-48 object-cover" src="https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" alt="Ratargul Swamp Forest" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-700">Ratargul Swamp Forest</div>
                  <p className="text-gray-600 text-base">A magical experience of rowing through a submerged forest. Nature at its best!</p>
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-star-fill text-yellow-500" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.203-.82-.161-.768-.603L4.6 10.847 1.72 7.792c-.307-.301-.146-.812.283-.854l4.605-.615L7.943.717c.188-.379.702-.379.89 0l2.088 5.606 4.605.615c.43.042.59.553.283.854l-2.88 3.055 1.757 4.993c.052.442-.382.806-.768.603L8 12.531l-4.282 2.912z"/>
                    </svg>
                    <span className="ml-1 text-gray-600">4.8</span>
                    <span className="ml-2 text-gray-500">(12 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full h-48 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOiD3UI5bi40_D626coWyXI-y5PsDnGgFyA&s" alt="Jaflong" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-700">Jaflong</div>
                  <p className="text-gray-600 text-base">Enjoyed the crystal-clear rivers and lush hills at the Bangladesh-India border.</p>
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-star-fill text-yellow-500" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.203-.82-.161-.768-.603L4.6 10.847 1.72 7.792c-.307-.301-.146-.812.283-.854l4.605-.615L7.943.717c.188-.379.702-.379.89 0l2.088 5.606 4.605.615c.43.042.59.553.283.854l-2.88 3.055 1.757 4.993c.052.442-.382.806-.768.603L8 12.531l-4.282 2.912z"/>
                    </svg>
                    <span className="ml-1 text-gray-600">4.6</span>
                    <span className="ml-2 text-gray-500">(8 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        
        
    {/* Bucket List Section */}
{activeTab === 'bucket' && (
  <div className="p-6">
    {/* <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">
      Bucket List
    </h2> */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bucketList.map((item) => (
        <Link
          
         href={`/PlaceDetails/${item.place?.slug}`} key={item.id}// আপনার route অনুযায়ী adjust করুন
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
        >
          <img
            className="w-full h-48 object-cover"
            src={item.place?.images[0]?.image || 'https://via.placeholder.com/400x300'}
            alt={item.place?.name || "Place Image"}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-700">
              {item.place?.name || item.title}
            </div>
            <p className="text-gray-600 text-base">
              {item.description || 'No Description'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
        
        {/* Events Section */}
        {activeTab === 'events' && (
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full h-48 object-cover" src="https://bangladeshinfo.com/storage/images/1581139784.jpg" alt="Dhaka Art Summit" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-700">Dhaka Art Summit</div>
                  <p className="text-gray-600 text-base">Explore contemporary art from February 2–10 in Dhaka. Don’t miss it!</p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full h-48 object-cover" src="https://ecdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/04/14/978e5f322b7f038c29006532ab5d6a49-64386a39a750e.jpg?jadewits_media_id=6895" alt="Pohela Boishakh" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-700">Pohela Boishakh</div>
                  <p className="text-gray-600 text-base">Celebrate the Bangla New Year in Dhaka and other major cities with cultural events and food.</p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img className="w-full h-48 object-cover" src="https://pathfriend-bd.com/wp-content/uploads/2019/08/Bandarban.jpg" alt="Chittagong Hill Tracts" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-700">Chittagong Hill Tracts</div>
                  <p className="text-gray-600 text-base">Join the annual festival of indigenous cultures, celebrating heritage and tradition.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        
        
        
        
        {/* List Section */}
        {activeTab === 'list' && (
         <div className="p-6 w-full">
        
         {/* Header */}
         <div className="flex  justify-between items-center mb-4 w-full">
          
           {/* <h2 className="text-lg lg:text-3xl font-bold text-gray-800">Best Places for Camping</h2> */}
           <div>
              {/* Add Spot Button */}
             
        
              {/* Modal */}
              {spotModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <motion.div 
                    className="bg-white p-6 rounded-lg w-11/12 md:w-1/3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Add Spot to List</h2>
        
                    <div className="mb-4">
                      <label className="block mb-1">Select Place</label>
                      <select
                        value={selectedPlace}
                        onChange={(e) => setSelectedPlace(e.target.value)}
                        className="w-full border p-2 rounded"
                      >
                        <option value="">Select a Place</option>
                        {places.map((place) => (
                          <option key={place.id} value={place.id}>
                            {place.name}
                          </option>
                        ))}
                      </select>
                    </div>
        
                    <div className="mb-4">
                      <label className="block mb-1">Select List</label>
                      <select
                        value={selectedList}
                        onChange={(e) => setSelectedList(e.target.value)}
                        className="w-full border p-2 rounded"
                      >
                        <option value="">Select a List</option>
                        {lists.map((list) => (
                          <option key={list.id} value={list.id}>
                            {list.title}
                          </option>
                        ))}
                      </select>
                    </div>
        
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSpotModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSpotSubmit}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Submit
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
         </div>
        
         {/* First Row - Best Camping Spots */}
        
      {lists.map((spot, index) => (
  <div key={index} className="mb-8">
    {/* List Title */}
    <h2 className="text-lg lg:text-3xl font-bold text-gray-800 mb-4">{spot.title}</h2>

    {/* Swiper for places */}
    {spot.listPlace.length > 0 ? (
      typeof window !== "undefined" && ( // client-side only to avoid hydration issues
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {spot.listPlace.map((listPlaceItem, idx) => (
            <SwiperSlide key={idx} className="w-[250px]">
              <Link
                href={`/PlaceDetails/${listPlaceItem.place?.slug}`}
                key={listPlaceItem.id}
                className="block mb-4"
              >
                <div className="w-full h-[200px] bg-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <img
                    src={listPlaceItem.place?.images[0]?.image || "/placeholder.png"}
                    alt={listPlaceItem.place?.name || "Place Image"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium text-gray-700">
                  {listPlaceItem.place?.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )
    ) : (
      <div className="w-full h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
        <p>No Places Added</p>
      </div>
    )}
  </div>
))}
        
        
        
        
        
        
         {/* Modal */}
         {isModalOpen && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
             <div className="bg-white p-8 rounded-lg w-[600px]">
               <h2 className="text-2xl font-bold mb-4">Add New List</h2>
               <form onSubmit={handleSubmit}>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3 bg-white"
            placeholder="Enter Title"
          />
        
          <label className="block mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3 bg-white"
            placeholder="Enter description"
          />
        
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[#8cc163] text-white rounded">
              Save Spot
            </button>
          </div>
        </form>
        
             </div>
           </div>
         )}
        </div>
        )}
        
                  </div>
        
                  {/* Right Side Section - only visible in profile tab */}
                  {activeTab === 'profile' && (
                    <div>
                      {/* Diary Section */}
                      <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4 border-b">Diary</h2>
                        <p className="text-gray-500 text-sm">📅 <strong>Coxs Bazar</strong></p>
                      </div>
        
                      {/* Ratings Section */}
                      <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4 border-b">Ratings</h2>
                        <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
                          <p className="text-gray-500 text-sm">★★★★½</p>
                        </div>
                      </div>
        
                      {/* Activity Section */}
                      <div>
                        <h2 className="text-lg font-bold mb-4 border-b">Activity</h2>
                        <p className="text-gray-500 text-sm">
                          • You liked, and rated <strong>Coxs Bazar</strong> ★★★★½ on Tuesday.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
      </div>

      {/* Footer */} <div className="w-full"> <Footer /> </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default UserProfile;
