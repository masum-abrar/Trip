'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { FaStar, FaHeart } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../../../public/Final_logo.png';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(false);

  const movieSuggestions = [
    { name: 'Deadpool', image: 'https://a.ltrbxd.com/resized/alternative-poster/1/0/6/6/9/1/9/p/i2xiUNiDCTwKmzXoHnyqi6IKKQy-0-150-0-225-crop.jpg?v=d45fca1fe6' },
    { name: 'Squid Game', image: 'https://a.ltrbxd.com/resized/film-poster/4/7/8/4/2/8/478428-the-brutalist-0-300-0-450-crop.jpg?v=e23890665e' },
    { name: 'Final Destination', image: '/final-destination.jpg' },
    { name: 'Inception', image: '/inception.jpg' },
    { name: 'The Dark Knight', image: '/dark-knight.jpg' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchInput('');
    setSelectedMovie(null);
    setRating(0);
    setLikes(false);
  };

  const filteredSuggestions = movieSuggestions.filter((movie) =>
    movie.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    setSearchInput('');
  };

  const handleRating = (star) => {
    setRating(star);
  };

  const toggleLike = () => {
    setLikes((prevLikes) => !prevLikes);
  };

  return (
    <div className="container max-w-5xl mx-auto ">
      {/* Navbar */}
      <div className="navbar bg-white text-white px-4 ">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
        <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="text-black text-2xl focus:outline-none mr-4 lg:hidden" // Changed text-white to text-black
  >
    {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
  </button>
          <Image src={logo} alt="logo" width={50} height={50} />
          <a className="btn btn-ghost text-xl text-black">Travel</a>
        </div>

        {/* Navbar Center - Large Screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li><a className="text-black hover:text-gray-600">HOME</a></li>
            <li><a className="text-black hover:text-gray-600">LISTS</a></li>
            <li><a className="text-black hover:text-gray-600">PLAN A TRIP</a></li>
            <li><a className="text-black hover:text-gray-600">COMMUNITY</a></li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end hidden lg:flex items-center gap-4">
          <IoSearchOutline className="text-2xl text-white" />
          <button
            onClick={openModal}
            className="btn px-8 bg-[#443F38] text-white font-bold rounded-xl hover:bg-[#008f1a]"
          >
            <FaPlus className="mr-2" />
            LOG
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Small Devices */}
      {isMenuOpen && (
        <div className="bg-white text-white lg:hidden p-4 space-y-4">
          <ul className="space-y-2">
          <li><a className="text-black hover:text-gray-600">FILMS</a></li>
            <li><a className="text-black hover:text-gray-600">LISTS</a></li>
            <li><a className="text-black hover:text-gray-600">MEMBERS</a></li>
            <li><a className="text-black hover:text-gray-600">JOURNALS</a></li>
          </ul>
          <button
            onClick={openModal}
            className="btn w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-[#008f1a]"
          >
            <FaPlus className="mr-2" />
            LOG
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
    <div className="bg-[#2c3440] rounded-lg p-6 w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-lg">
      {selectedMovie ? (
        <>
          <button
            onClick={() => setSelectedMovie(null)}
            className="text-white bg-gray-600 px-4 py-2 rounded-full mb-4 hover:bg-gray-500"
          >
            ← Back
          </button>
          <div className="flex flex-col sm:flex-row">
            {/* Movie Image */}
            <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
              <img
                src={selectedMovie.image}
                alt={selectedMovie.name}
                className="rounded-lg w-2/3 sm:w-full mx-auto" 
              />
            </div>
            
            <div className="w-full sm:w-[70%] pl-0 sm:pl-6 p-4">
              <h2 className="text-2xl font-bold text-white mb-4">{selectedMovie.name}</h2>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2" />
                  Watched on
                </label>
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2" />
                  I've watched this film before
                </label>
              </div>
              <textarea
                className="w-full p-2 border border-gray-600 rounded mt-4"
                placeholder="Write your review..."
                rows="4"
              />
             <div className="mt-6">
  
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    {/* Tags Section */}
    <div className="flex flex-col w-full sm:w-auto">
      <h3 className="text-gray-400 text-lg mb-2 sm:mb-0">Tags</h3>
      <input
        type="text"
        placeholder="(e.g., Netflix)"
        className="p-2 border border-gray-600 rounded w-full sm:w-40"
      />
    </div>

   
    <div className="flex flex-col w-full sm:w-auto">
      <h3 className="text-gray-400 text-lg mb-2 sm:mb-0">Rating</h3>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            onClick={() => handleRating(star)}
            className={`cursor-pointer text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    </div>

  
    <div className="flex flex-col w-full sm:w-auto">
      <h3 className="text-gray-400 text-lg mb-2 sm:mb-0">Likes</h3>
      <button onClick={toggleLike} className="text-2xl">
        <FaHeart
          className={` ${likes ? 'text-red-500' : 'text-gray-400'}`}
        />
      </button>
    </div>
  </div>
</div>


              <div className="flex justify-end mt-6">
                <button className="btn bg-[#00ac1c] text-white rounded-lg px-8 py-2">
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold">Add to your films</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-white"
            >
              ✖
            </button>
          </div>
          <input
            type="text"
            placeholder="Search for a film..."
            className="w-full p-2 border border-gray-600 rounded mt-4"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
         
          {searchInput && (
            <ul className="mt-2">
              {filteredSuggestions.map((movie, index) => (
                <li
                  key={index}
                  onClick={() => selectMovie(movie)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  {movie.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  </div>
)}



    </div>
  );
};

export default Navbar;
