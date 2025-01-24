'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile'); // State to track the active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
              <h1 className="text-3xl font-bold">Rakib</h1>
              <p className="text-gray-500 text-sm mt-1">Traveler | Explorer | Nature Enthusiast</p> {/* Short Bio */}
              <button className="mt-2 px-4 py-2 bg-[#8cc163] text-white rounded hover:bg-green-500 text-sm">
                Edit Profile
              </button>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <div>
                <h2 className="text-xl font-bold mb-4 border-b">Places Visited</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Here are some of the places you have visited recently.
                </p>
              </div>
            )}

            {/* Diary Section */}
            {activeTab === 'diary' && (
              <div>
                <h2 className="text-xl font-bold mb-4 border-b">Diary Entries</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Read your travel diary and explore your adventures.
                </p>
              </div>
            )}

            {/* Reviews Section */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-bold mb-4 border-b">Reviews</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Read and write reviews for the places you have visited.
                </p>
              </div>
            )}

            {/* Bucket list Section */}
            {activeTab === 'bucket' && (
              <div>
                <h2 className="text-xl font-bold mb-4 border-b">Bucket List</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Plan your upcoming trips with your bucket list!
                </p>
              </div>
            )}

            {/* Events Section */}
            {activeTab === 'events' && (
              <div>
                <h2 className="text-xl font-bold mb-4 border-b">Upcoming Events</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Explore the events happening in your favorite destinations.
                </p>
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
