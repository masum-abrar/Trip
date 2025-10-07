"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import logo from "../../../public/Trip_LoGo.png";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCommunityOpen, setIsMobileCommunityOpen] = useState(false);

  useEffect(() => {
    const name = Cookies.get("userName");
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    Cookies.remove("userName");
    Cookies.remove("userId");
    Cookies.remove("userToken");
    Cookies.remove("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/districts`
        );
        const data = await response.json();
        setDistricts(data.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  return (
    <div className="container max-w-5xl mx-auto ">
      {/* Navbar */}
      <div className="navbar bg-white text-black px-4 ">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black text-2xl focus:outline-none mr-4 lg:hidden"
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="logo" width={60} height={60} />
            <h1 className="text-xl font-bold text-black ml-0">Parjatak</h1>
          </Link>
        </div>

        {/* Navbar Center - Large Screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 flex items-center">
            {[
              { name: "Home", href: "/" },
              { name: "List", href: "/list" },
            ].map((item) => (
              <li key={item.href} className="relative list-none">
                <Link
                  href={item.href}
                  className={`block px-4 py-2 text-base font-medium transition-all duration-300 rounded-md ${
                    pathname === item.href
                      ? "text-[#8cc163] font-semibold relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-2/3 after:h-[3px] after:bg-[#8cc163] after:rounded-full after:-translate-x-1/2 after:transition-all after:duration-300 after:ease-in-out after:scale-x-100"
                      : "text-black hover:text-[#8cc163] after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Notification tab only if user is logged in */}
            {userName && (
              <li className="relative list-none">
                <Link
                  href="/notification"
                  className="block px-4 py-2 text-base font-medium transition-all duration-300 rounded-md text-black hover:text-[#8cc163]"
                >
                  Notification
                </Link>
              </li>
            )}

            {/* Communities dropdown */}
            <li
              className="relative group list-none"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 text-lg font-medium transition-all rounded-md ${
                  pathname.includes("/district/")
                    ? "text-[#8cc163] font-semibold relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-2/3 after:h-[3px] after:bg-[#8cc163] after:rounded-full after:-translate-x-1/2 after:transition-all after:duration-300 after:ease-in-out after:scale-x-100"
                    : "text-gray-800 hover:text-[#8cc163]"
                }`}
              >
                Communities <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {isOpen && districts.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 mt-3 w-56 max-h-72 bg-white bg-opacity-95 backdrop-blur-md border border-gray-200 shadow-lg rounded-lg overflow-y-auto z-50"
                  >
                    {districts.map((district, index) => (
                      <li key={district.id || index}>
                        <Link
                          href={`/district/${
                            district.slug?.toLowerCase() ||
                            district.name.toLowerCase()
                          }`}
                          className="block px-4 py-2 text-gray-700 hover:bg-[#8cc163] hover:text-white transition-all"
                        >
                          {district.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-4">
          {!userName && (
            <div className="hidden lg:flex space-x-4">
              <Link href="/login">
                <button className="relative px-6 py-2 rounded-lg text-[#8cc163] font-semibold bg-transparent border-2 border-[#8cc163] shadow-md transition-all duration-300 overflow-hidden group">
                  <span className="absolute inset-0 border-2 border-[#8cc163] rounded-lg animate-border-run"></span>
                  <span className="absolute inset-0 bg-[#8cc163] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  <span className="relative z-10 group-hover:text-white transition-all duration-300">
                    Login
                  </span>
                </button>
              </Link>
              <Link href="/signup">
                <button className="relative px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#8cc163] to-[#008f1a] shadow-lg transition-all duration-300 hover:brightness-110 hover:scale-105 hover:shadow-[0_0_10px_#8cc163]">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {userName && (
            <div className="flex items-center gap-2">
              <span className="text-black font-medium hidden md:inline">
                Hi, {userName}
              </span>
              <div className="relative">
                <FiUser
                  className="text-2xl text-black cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-black">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Hi, {userName}
                      </li>
                      
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
                      <li
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white text-black lg:hidden p-4 space-y-2 shadow-md">
          <ul className="space-y-1">
            <Link href="/">
              <li>
                <a className="text-black hover:text-gray-600">Home</a>
              </li>
            </Link>
             {userName && (
            <Link href="/profile">
              <li>
                <a className="text-black hover:text-gray-600">Profile</a>
              </li>
            </Link>
             )}
            <Link href="/list">
              <li>
                <a className="text-black hover:text-gray-600">List</a>
              </li>
            </Link>

            {userName && (
              <Link href="/notification">
                <li>
                  <a className="text-black hover:text-gray-600">Notification</a>
                </li>
              </Link>
            )}

            {/* Communities dropdown mobile */}
            <li className="relative list-none">
              <button
                onClick={() =>
                  setIsMobileCommunityOpen(!isMobileCommunityOpen)
                }
                className="flex items-center gap-1 text-lg font-medium transition-all rounded-md text-gray-800"
              >
                Communities{" "}
                <ChevronDown
                  size={16}
                  className={`${
                    isMobileCommunityOpen ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              <AnimatePresence>
                {isMobileCommunityOpen && districts.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-2 w-full max-h-60 bg-white border border-gray-200 shadow-lg rounded-lg overflow-y-auto z-50 relative"
                  >
                    {districts.map((district, index) => (
                      <li key={district.id || index}>
                        <Link
                          href={`/district/${
                            district.slug?.toLowerCase() ||
                            district.name.toLowerCase()
                          }`}
                          className="block px-4 py-2 text-gray-700 hover:bg-[#8cc163] hover:text-white transition-all"
                          onClick={() => setIsMobileCommunityOpen(false)}
                        >
                          {district.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="flex space-x-4 mt-2">
            {!userName ? (
              <>
                <Link href="/login">
                  <button className="relative px-6 py-2 rounded-lg text-[#8cc163] font-semibold bg-transparent border-2 border-[#8cc163] shadow-md">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="relative px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#8cc163] to-[#008f1a] shadow-lg">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="relative px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#8cc163] to-[#008f1a] shadow-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
