'use client'
import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from "swiper/react";
import  { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import { motion } from "framer-motion";



const ProfilePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [fullname, setFullname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [password, setPassword] = useState("");
  
    const [userId, setUserId] = useState("");
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); 
 const [userName, setUserName] = useState(null);
//  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (showModal) {
      const id = Cookies.get("userId");
      const name = Cookies.get("userName");
      const fullName = Cookies.get("fullName");
      const userEmail = Cookies.get("userEmail");
      const userPhone = Cookies.get("userPhone");
      const userDivision = Cookies.get("userDivision");
      const userDistrict = Cookies.get("userDistrict");

      if (id) setUserId(id);
      if (name) setName(name);
      if (fullName) setFullname(fullName);
      if (userEmail) setEmail(userEmail);
      if (userPhone) setPhone(userPhone);
      if (userDivision) setDivision(userDivision);
      if (userDistrict) setDistrict(userDistrict);
    }
  }, [showModal]);

  // Fetch divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("https://parjatak-core.vercel.app/api/v1/customer/divisions");
        const data = await response.json();
        setDivisions(data.data);
      } catch (error) {
        console.error("Failed to fetch divisions:", error);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch districts on division change
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          `https://parjatak-core.vercel.app/api/v1/customer/districts?division=${division}`
        );
        const data = await response.json();
        setDistricts(data.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };
    if (division) fetchDistricts();
  }, [division]);

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const payload = {
        fullname,
        name,
        email,
        phone,
        division,
        district,
        password,
      };

      const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Optional: Update cookies
        Cookies.set("userName", name);
        Cookies.set("fullName", fullname);
        Cookies.set("userEmail", email);
        Cookies.set("userPhone", phone);
        Cookies.set("userDivision", division);
        Cookies.set("userDistrict", district);

        alert("Profile updated successfully!");
        setShowModal(false);
      } else {
        alert("Failed to update: " + result.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong!");
    }
  };


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const name = Cookies.get("userName");
    const id = Cookies.get("userId");

    if (name) setUserName(name);
    if (id) setUserId(id);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const spots1 = [
    { name: "St. Martin & Chera Dwip", image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" },
    { name: "Shahpori Island", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8uhJykGZFXCpVsg2LanJDFG9JUWJvf2YOkA&s" },
    { name: "ThanchiBandarban", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jR47t5ZChiuOqnYRDbSwhxZCXy730nIACA&s" },
    { name: "Nafakhum Waterfall", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3i781vXTkIc1p9dKWStDovqK10WgCUngI_w&s" },
    { name: "Boga Lake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBcxMV7NTTXVwVyzmBkMAmjl98Af62bm7cg&s" },
    { name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s" },
    { name: "Kuakata Sea Beach", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/a9/8b/44/sea-beach.jpg?w=900&h=-1&s=1" },
    { name: "Ratargul Swamp Forest", image: "https://www.travelmate.com.bd/wp-content/uploads/2019/07/Ratargul-2.jpg" },
    { name: "Lawachara National Park", image: "https://source.unsplash.com/600x400/?jungle,forest" },
    { name: "Tanguar Haor", image: "https://source.unsplash.com/600x400/?haor,river" },
  ];
  

  // Second Category: Top Adventure Spots
  const spots2 = [
    { name: "Saint Martin's Island", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s" },
    { name: "Keokradong", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/18/32/94/best-view-of-keokradong.jpg?w=1200&h=-1&s=1" },
    { name: "Amiakhum Waterfall", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/77/22/14/amiakhum.jpg?w=900&h=500&s=1" },
    { name: "Himchari National Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRltGRoSqSjk5aJz4fNvFp5l0MgYdLjoBsnfA&s" },
    { name: "Madhabkunda Waterfall", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo71rsffwGMdqcqzMRoU24AdzpLIv6oh8pug&s" },
    { name: "Nijhum Dwip", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQKTQkUYbNzdbnsLxPAJw26kkaZgoY8Lh6w&s" },
    { name: "Remakri Falls", image: "https://source.unsplash.com/600x400/?jungle,river" },
    { name: "Satchari National Park", image: "https://source.unsplash.com/600x400/?forest,camping" },
    { name: "Bandarban Hill Tracks", image: "https://source.unsplash.com/600x400/?hiking,adventure" },
    { name: "Jaflong", image: "https://source.unsplash.com/600x400/?river,mountains" },
  ];
  

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-[1120px]">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between border-b border-gray-300 pb-6 mb-6 space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">R</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userName}</h1>
              <p className="text-lg text-gray-600">ID: {userId}</p>
              <p className="text-gray-500 text-sm mt-1">Traveler | Explorer | Nature Enthusiast</p> {/* Short Bio */}
              <button
        onClick={() => setShowModal(true)}
        className="mt-2 px-4 py-2 bg-[#8cc163] text-white rounded hover:bg-green-500 text-sm"
      >
        Edit Profile
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative"
          >
            <button
              className="absolute top-2 right-2 text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black text-center">
              Edit Profile
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
              }}
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              ))}
            </select>

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full p-2 bg-[#8cc163] text-white rounded"
              onClick={handleUpdate}
            >
              Update Profile
            </button>
          </motion.div>
        </div>
      )}
            </div>
          </div>

          <div>
            <ul className="flex space-x-6 md:space-x-8">
              <li className="text-center">
                <h2 className="text-xl font-bold">1</h2>
                <p className="text-sm text-gray-500">Place</p>
              </li>
              <li className="text-center">
                <h2 className="text-xl font-bold">1</h2>
                <p className="text-sm text-gray-500">This Year</p>
              </li>
              <li className="text-center">
                <h2 className="text-xl font-bold">0</h2>
                <p className="text-sm text-gray-500">Following</p>
              </li>
              <li className="text-center">
                <h2 className="text-xl font-bold">0</h2>
                <p className="text-sm text-gray-500">Followers</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="text-center mb-8">
          <ul className="inline-flex flex-wrap justify-center border-b w-full border-gray-300 pb-2 space-x-4 sm:space-x-6">
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('profile')}
            >
              Profile
            </li>
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('activity')}
            >
              Activity
            </li>
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'place' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('place')}
            >
              Place
            </li>
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'diary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('diary')}
            >
              Diary
            </li>
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('reviews')}
            >
              Reviews
            </li>
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('list')}
            >
              Your List
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
        <div className="grid grid-cols-1  gap-8">
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
    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">Diary Entries</h2>
    <div className="space-y-4">
      <div className="bg-white rounded shadow-md overflow-hidden">
        <img className="w-full h-48 object-cover" src="https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg" alt="Srimangal" />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-700">Day 1: Exploring Srimangal</h3>
          <p className="text-gray-600">The lush green tea gardens and quiet countryside offered the perfect escape from city life.</p>
        </div>
      </div>
      <div className="bg-white rounded shadow-md overflow-hidden">
        <img className="w-full h-48 object-cover" src="https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" alt="Sundarbans" />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-700">Day 3: Boating in Sundarbans</h3>
          <p className="text-gray-600">Cruising through the serene waterways and spotting exotic wildlife was an unforgettable experience.</p>
        </div>
      </div>
    </div>
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
    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">Bucket List</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src="https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg" alt="Sajek Valley" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-700">Sajek Valley</div>
          <p className="text-gray-600 text-base">Trek to the clouds and stay in cozy hillside cottages. A must-visit for adventure lovers.</p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src="https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg" alt="Jaflong" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-700">Jaflong</div>
          <p className="text-gray-600 text-base">Crystal-clear rivers and beautiful hills await you here. A picturesque getaway.</p>
        </div>
      </div>
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
 <button 
  onClick={() => setIsModalOpen(true)}
 className="bg-[#8cc163] text-white px-3 lg:px-6 py-2 rounded-lg ml-[100px] lg:ml-[85%] mb-10 flex items-center gap-2 hover:bg-[#8fe44d]">
  <FaPlus /> {/* Icon here */}
  Add to List
</button>
 {/* Header */}
 <div className="flex  justify-between items-center mb-4 w-full">
  
   <h2 className="text-lg lg:text-3xl font-bold text-gray-800">Best Places for Camping</h2>
   <button
 
  className="bg-[#8cc163] text-white px-2 lg:px-6 py-1 lg:py-2 rounded-lg flex items-center gap-2 hover:bg-[#8fe44d]"
>
<FaPlus /> {/* Icon here */}
  Add Spot
</button>
 </div>

 {/* First Row - Best Camping Spots */}
 <Swiper
  spaceBetween={16}
  breakpoints={{
    320: { slidesPerView: 1 }, // 1 slide on small screens (mobile)
    480: { slidesPerView: 2 }, // 2 slides on small tablets
    768: { slidesPerView: 3 }, // 3 slides on tablets
    1024: { slidesPerView: 4 }, // 4 slides on desktops
    1280: { slidesPerView: 5 }, // 5 slides on larger screens
  }}
  className="w-full"
>
  {spots1.map((spot, index) => (
    <SwiperSlide key={index} className="w-[250px]">
      <a href={spot.image} target="_blank" rel="noopener noreferrer">
        <div className="w-full h-[200px] bg-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
          <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
        </div>
        <p className="text-center mt-2 font-medium">{spot.name}</p>
      </a>
    </SwiperSlide>
  ))}
</Swiper>


 {/* Second Row - Adventure Camping */}
<div className="flex  justify-between items-center mb-4 w-full mt-12">
  
   <h2 className="text-xl lg:text-3xl font-bold text-gray-800 ">Top Adventure Spots</h2>
   <button
  onClick={() => setIsModalOpen(true)}
  className="bg-[#8cc163] text-white px-2 lg:px-6 py-1 lg:py-2 rounded-lg flex items-center gap-2 hover:bg-[#8fe44d]"
>
<FaPlus /> {/* Icon here */}
  Add Spot
</button>
 </div>

 <Swiper slidesPerView={5} spaceBetween={16}  breakpoints={{
    320: { slidesPerView: 1 }, // 1 slide on small screens (mobile)
    480: { slidesPerView: 2 }, // 2 slides on small tablets
    768: { slidesPerView: 3 }, // 3 slides on tablets
    1024: { slidesPerView: 4 }, // 4 slides on desktops
    1280: { slidesPerView: 5 }, // 5 slides on larger screens
  }} className="w-full mt-4">
   {spots2.map((spot, index) => (
     <SwiperSlide key={index} className="w-[250px]">
       <a href={spot.image} target="_blank" rel="noopener noreferrer">
         <div className="w-full h-[200px] bg-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
           <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
         </div>
         <p className="text-center mt-2 font-medium">{spot.name}</p>
       </a>
     </SwiperSlide>
   ))}
 </Swiper>

 {/* Modal */}
 {isModalOpen && (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
     <div className="bg-white p-8 rounded-lg w-[600px]">
       <h2 className="text-2xl font-bold mb-4">Add New List</h2>
       <form>
         <label className="block mb-2">Title:</label>
         <input type="text" className="w-full border px-3 py-2 rounded mb-3 bg-white" placeholder="Enter Title" />

         {/* <label className="block mb-2">Image:</label>
         <input type="file" className="w-full border px-3 py-2 rounded mb-3  bg-white" placeholder="Enter image" /> */}

         <label className="block mb-2">Description:</label>
         <textarea className="w-full border px-3 py-2 rounded mb-3 bg-white" placeholder="Enter description"></textarea>

         {/* <label className="block mb-2">Places:</label>
<select className="w-full border px-3 py-2 rounded mb-3 bg-white">
  <option value="">Select a Place</option>
  <option value="coxsbazar">Cox's Bazar</option>
  <option value="saintmartin">Saint Martin</option>
  <option value="sajek">Sajek</option>
</select> */}


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

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
