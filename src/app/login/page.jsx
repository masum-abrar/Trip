"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize(); // Run initially
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="bg-white">
      <div className="mb-2 shadow-lg">
        <Navbar />
      </div>
      <motion.div className="flex h-screen w-full items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full md:w-[800px] h-auto md:h-[500px] bg-white rounded-lg shadow-lg overflow-hidden relative">
          
          {/* Left Side - Image (Always Visible) */}
          <motion.div
  className="w-full md:w-1/2 h-[250px] md:h-full bg-cover bg-center"
  animate={
    isMobile
      ? {
          opacity: isSignUp ? 0.9 : 1, // Fade out the image during sign-up (opacity 0.5), but keep it visible
          scale: isSignUp ? 1.05 : 1, // Optionally scale up the image slightly for better effect
          transition: { duration: 0.5, ease: "easeInOut" },
        }
      : { x: isSignUp ? "100%" : "0%" } // For desktop, slide the image left or right
  }
  transition={{ duration: 0.5, ease: "easeInOut" }}
  style={{
    backgroundImage:
      "url('https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg')",
  }}
/>



          {/* Right Side - Forms (Login/SignUp) */}
          <motion.div
            className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative"
            animate={
              isMobile
                ? { opacity: 1, y: isSignUp ? 0 : -20, transition: { duration: 0.6, ease: "easeInOut" } }
                : { x: isSignUp ? "-100%" : "0%" }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Form Heading */}
            <h2 className="text-2xl font-bold mb-6">{isSignUp ? "Sign Up" : "Login"}</h2>

            {/* Form Fields */}
            {isSignUp ? (
              <>
                <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-4" />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />
                <button className="w-full p-2 bg-[#8cc163] text-white rounded">Sign Up</button>
              </>
            ) : (
              <>
                <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />
                <button className="w-full p-2 bg-[#8cc163] text-white rounded">Login</button>
              </>
            )}
   {/* Social Login Buttons */}
            <div className="flex space-x-4 mt-4">
              <button className="flex items-center space-x-2 px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
                <FaFacebook className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
            {/* Toggle Between Login & Signup */}
            <p className="mt-4 text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <motion.span
                    onClick={() => setIsSignUp(false)}
                    whileHover={{ scale: 1.1 }}
                    className="text-[#8cc163] cursor-pointer"
                  >
                    Login
                  </motion.span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <motion.span
                    onClick={() => setIsSignUp(true)}
                    whileHover={{ scale: 1.1 }}
                    className="text-[#8cc163] cursor-pointer"
                  >
                    Sign Up
                  </motion.span>
                </>
              )}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
