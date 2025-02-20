'use client';

import { useState } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import Navbar from "@/app/components/Navbar";
import EventTabSection from '@/app/components/EventTabSection';
import PlacesTabSection from '@/app/components/PlacesTabSection';
import DiscussTabSection from '@/app/components/DiscussionTabSection';

const DistrictPage = ({ params }) => {
  const districtName = params.districtName;
  // const [showAllImages, setShowAllImages] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(null);

  const [activeTab, setActiveTab] = useState('Discussion');
  const [newPost, setNewPost] = useState({ text: '', images: [], place: '', subdistrict: '' });
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
 

  return (
    <div className="min-h-screen bg-white">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      <div className="relative w-full h-64">
        <img src="https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" alt="District" className="w-full h-full object-cover" />
        {districtName && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <h1 className="text-4xl font-bold text-white">
      {districtName.charAt(0).toUpperCase() + districtName.slice(1)}
    </h1>
  </div>
)}

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
 <DiscussTabSection/>
)}

           {/* //Events Tab Started// */}
        {activeTab === 'Events' && (
         <div>
          <EventTabSection/>
          </div>
        )}
        {PlacesTabSection}
        {
          activeTab === 'Places' && (
           <div>
            <PlacesTabSection/>
             </div>
          )
        }
      </div>
    </div>
  );
};

export default DistrictPage;