"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (email.trim() === "") {
      alert("Please enter your email!");
      return;
    }
    setIsOtpSent(true);
    console.log("OTP Sent to:", email);
  };

  const handleVerifyOtp = () => {
    if (otp.trim() === "") {
      alert("Please enter the OTP!");
      return;
    }
    console.log("OTP Verified:", otp);
  };

  return (
    <div className="bg-white">
      <div className="mb-2 shadow-lg">
        <Navbar />
      </div>
      <motion.div className="flex h-screen w-full items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full md:w-[800px] h-auto md:h-[500px] bg-white rounded-lg shadow-lg overflow-hidden relative">
          {/* Left Side - Image */}
          <motion.div
            className="w-full md:w-1/2 h-[250px] md:h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg')",
            }}
          />

          {/* Right Side - Login Form */}
          <motion.div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative">
            <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>

            {!isOtpSent ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
                />
                <button onClick={handleSendOtp} className="w-full p-2 bg-[#8cc163] text-white rounded">
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
                />
                <button onClick={handleVerifyOtp} className="w-full p-2 bg-[#8cc163] text-white rounded">
                  Login
                </button>
              </>
            )}

            {/* Link to Signup Page */}
            <p className="mt-4 text-sm text-black">
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-[#8cc163] cursor-pointer"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign Up
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
