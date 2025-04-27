"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const payload = { email, password };

    try {
      const res = await fetch("https://parjatak-core.vercel.app/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Login Response:", data);
      console.log("User Data:", data?.data);
      console.log("Access Token:", data?.accessToken || data?.token || data?.data?.accessToken);
      const token = data?.accessToken || data?.token || data?.data?.accessToken;
if (token) {
  Cookies.set("token", token, { expires: 7 });
}
      if (res.ok) {
        toast.success("Login successful!");

        // Save user info in cookies
        Cookies.set("userName", data?.data?.name || "Guest", { expires: 7 }); 
        Cookies.set("userId", data?.data?.id || "", { expires: 7 });

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    }
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

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
            />

            <button
              onClick={handleLogin}
              className="w-full p-2 bg-[#8cc163] text-white rounded"
            >
              Login
            </button>

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
            <p className="text-sm mt-8 text-center text-black">
 <span className="font-bold text-black"> Forgot your password?</span> Please email us at{" "}
  <a href="mailto:support@parjatak.com" className="text-[#8cc163] underline">
    support@parjatak.com
  </a>{" "}
  from your registered email address, mentioning your username.
</p>

          </motion.div>
        
        </div>
      
      </motion.div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default LoginPage;
