"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaGoogle, FaFacebook } from "react-icons/fa";
const districtsData = {
  "Dhaka": {
    "subDistricts": {
      "Dhanmondi": ["City 1", "City 2"],
      "Uttara": ["City 3", "City 4"]
    }
  },
  "Chattogram": {
    "subDistricts": {
      "Pahartali": ["City 5", "City 6"],
      "Agrabad": ["City 7", "City 8"]
    }
  }
};
const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [city, setCity] = useState("");
  // Detect mobile screen
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize(); // Run initially
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (email.trim() === "") {
      alert("Please enter your email!");
      return;
    }
    setIsOtpSent(true);
    // Here, you can integrate an API call to send the OTP
    console.log("OTP Sent to:", email);
  };

  const handleVerifyOtp = () => {
    if (otp.trim() === "") {
      alert("Please enter the OTP!");
      return;
    }
    console.log("OTP Verified:", otp);
    // Here, you can integrate an API call to verify the OTP
  };
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
            <h2 className="text-2xl font-bold mb-6 text-black">{isSignUp ? "Sign Up" : "Login"}</h2>

            {/* Form Fields */}
            {isSignUp ? (
              <>
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black" />
     <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black" />

     {/* District Dropdown */}
     <select 
       className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
       value={district} 
       onChange={(e) => {
         setDistrict(e.target.value);
         setSubDistrict("");
         setCity("");
       }}
     >
       <option value="">Select District</option>
       {Object.keys(districtsData).map((dist) => (
         <option key={dist} value={dist}>{dist}</option>
       ))}
     </select>

     {/* Sub-District Dropdown */}
     <select 
       className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
       value={subDistrict} 
       onChange={(e) => {
         setSubDistrict(e.target.value);
         setCity("");
       }}
       disabled={!district}
     >
       <option value="">Select Sub-District</option>
       {district && Object.keys(districtsData[district]?.subDistricts || {}).map((subDist) => (
         <option key={subDist} value={subDist}>{subDist}</option>
       ))}
     </select>

     {/* City Dropdown */}
     <select 
       className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
       value={city} 
       onChange={(e) => setCity(e.target.value)}
       disabled={!subDistrict}
     >
       <option value="">Select City</option>
       {subDistrict && (districtsData[district]?.subDistricts[subDistrict] || []).map((city) => (
         <option key={city} value={city}>{city}</option>
       ))}
     </select>

     <button className="w-full p-2 bg-[#8cc163] text-white rounded">Sign Up</button>
             </>
            ) : (
              <>
                 {!isOtpSent ? (
        <>
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
          />
          {/* Send OTP Button */}
          <button onClick={handleSendOtp} className="w-full p-2 bg-[#8cc163] text-white rounded">
            Send OTP
          </button>
        </>
      ) : (
        <>
          {/* OTP Field */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
          />
          {/* Verify OTP Button */}
          <button onClick={handleVerifyOtp} className="w-full p-2 bg-[#8cc163] text-white rounded">
           Login
          </button>
        </>
      )}
              </>
            )}
   {/* Social Login Buttons */}
            {/* <div className="flex space-x-4 mt-4">
              <button className="flex items-center space-x-2 px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
                <FaFacebook className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div> */}
            {/* Toggle Between Login & Signup */}
            <p className="mt-4 text-sm text-black">
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
