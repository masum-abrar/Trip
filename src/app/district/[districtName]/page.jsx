'use client';

import { useState } from 'react';
import Navbar from "@/app/components/Navbar";

const DistrictPage = ({ params }) => {
  const districtName = params.districtName;
  const [activeTab, setActiveTab] = useState('Discussion');
  const [newPost, setNewPost] = useState({ text: '', image: null, place: '', subdistrict: '' });
  const [posts, setPosts] = useState([]);

  const districtInfo = {
    district: districtName.charAt(0).toUpperCase() + districtName.slice(1),
    image: 'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg',
  };

  const handlePost = () => {
    if (newPost.text || newPost.image) {
      setPosts([...posts, { ...newPost, id: Date.now() }]);
      setNewPost({ text: '', image: null, place: '', subdistrict: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      <div className="relative w-full h-64">
        <img
          src={districtInfo.image}
          alt={districtInfo.district}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{districtInfo.district}</h1>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {['Discussion', 'Events', 'Places'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 max-w-[750px] mx-auto">
        {activeTab === 'Discussion' && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-xl p-4">
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="What's on your mind?"
                value={newPost.text}
                onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
              ></textarea>
              <div className="flex items-center gap-4 mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPost({ ...newPost, image: URL.createObjectURL(e.target.files[0]) })}
                  className="text-sm text-gray-500"
                />
                <select
                  value={newPost.place}
                  onChange={(e) => setNewPost({ ...newPost, place: e.target.value })}
                  className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Place</option>
                  <option value="Beach">Beach</option>
                  <option value="Hill">Hill</option>
                </select>
                <select
                  value={newPost.subdistrict}
                  onChange={(e) => setNewPost({ ...newPost, subdistrict: e.target.value })}
                  className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Sub-district</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                </select>
                <button
                  onClick={handlePost}
                  className="bg-[#008f1a] text-white px-6 py-2 rounded-lg hover:bg-[#39c252]"
                >
                  Post
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white shadow-md rounded-xl p-4">
                  {post.image && (
                    <img src={post.image} alt="Post" className="w-full h-60 object-cover rounded-md" />
                  )}
                  <p className="mt-2 text-gray-800">{post.text}</p>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{post.place}</span>
                    <span>{post.subdistrict}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Events' && (
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
            <p>Discover the latest events happening in {districtInfo.district}.</p>
          </div>
        )}

        {activeTab === 'Places' && (
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold mb-2">Popular Places</h2>
            <p>Explore the must-visit places in {districtInfo.district}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictPage;
