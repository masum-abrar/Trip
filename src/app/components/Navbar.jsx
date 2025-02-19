"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import logo from "../../../public/Final_logo.png";
import Link from "next/link";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movieSuggestions = [
    {
      name: "Deadpool",
      image:
        "https://a.ltrbxd.com/resized/alternative-poster/1/0/6/6/9/1/9/p/i2xiUNiDCTwKmzXoHnyqi6IKKQy-0-150-0-225-crop.jpg?v=d45fca1fe6",
    },
    {
      name: "Squid Game",
      image:
        "https://a.ltrbxd.com/resized/film-poster/4/7/8/4/2/8/478428-the-brutalist-0-300-0-450-crop.jpg?v=e23890665e",
    },
    { name: "Final Destination", image: "/final-destination.jpg" },
    { name: "Inception", image: "/inception.jpg" },
    { name: "The Dark Knight", image: "/dark-knight.jpg" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchInput("");
    setSelectedMovie(null);
  };

  const filteredSuggestions = movieSuggestions.filter((movie) =>
    movie.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    setSearchInput("");
  };

  return (
    <div className="container max-w-5xl mx-auto">
      {/* Navbar */}
      <div className="navbar bg-white text-black px-4">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black text-2xl focus:outline-none mr-4 lg:hidden"
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
          <Image src={logo} alt="logo" width={50} height={50} />
          <a className="btn btn-ghost text-xl text-black">Travel</a>
        </div>

        {/* Navbar Center - Large Screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <Link href="/">
              <li>
                <a className="text-black hover:text-gray-600">Home</a>
              </li>
            </Link>
            <li>
              <a className="text-black hover:text-gray-600">Menu</a>
            </li>
           <Link href="/Communities">
           <li>
              <a className="text-black hover:text-gray-600">Communities</a>
            </li>
           </Link>
            <Link href="/list">
              <li>
                <a className="text-black hover:text-gray-600"> List</a>
              </li>
            </Link>
            <Link href="/notification">
              <li>
                <a className="text-black hover:text-gray-600">Notification</a>
              </li>
            </Link>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end hidden lg:flex items-center gap-4">
          {/* <IoSearchOutline className="text-2xl text-black" /> */}
          <button
            // onClick={openModal}
            className="btn px-8 bg-[#8cc163] text-white font-bold rounded-xl hover:bg-[#008f1a]"
          >
            <FaPlus className="mr-2" />
            LOG
          </button>

          {/* User Icon and Dropdown */}
          <div className="relative">
            <FiUser
              className="text-2xl text-black cursor-pointer"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <ul className="py-2 text-black">
                  <Link href="/profile">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                  </Link>
                  <Link href="/">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Home
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu for Small Devices */}
      {isMenuOpen && (
        <div className="bg-white text-black lg:hidden p-4 space-y-4">
          <ul className="space-y-2">
          <Link href="/">
              <li>
                <a className="text-black hover:text-gray-600">Home</a>
              </li>
            </Link>
            <Link href="profile">
              <li>
                <a className="text-black hover:text-gray-600">PROFILE</a>
              </li>
            </Link>
            <li>
              <a className="text-black hover:text-gray-600"> PLACES</a>
            </li>
            <Link href="/list">
              <li>
                <a className="text-black hover:text-gray-600"> LIST</a>
              </li>
            </Link>
            <Link href="/Communities">
           <li>
              <a className="text-black hover:text-gray-600">Communities</a>
            </li>
           </Link>
          </ul>
          <button
            onClick={openModal}
            className="btn w-full bg-[#8cc163] text-white font-bold py-2 rounded-lg hover:bg-[#008f1a]"
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
                  <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                    <img
                      src={selectedMovie.image}
                      alt={selectedMovie.name}
                      className="rounded-lg w-2/3 sm:w-full mx-auto"
                    />
                  </div>
                  <div className="w-full sm:w-[70%] pl-0 sm:pl-6 p-4">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {selectedMovie.name}
                    </h2>
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
