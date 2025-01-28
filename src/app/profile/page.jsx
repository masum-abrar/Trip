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
