"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  // Form fields
  const [fullname, setFullname] = useState("");
  const [name, setName] = useState(""); // username or display name
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Fetch divisions on load
  useEffect(() => {
    fetch("https://parjatak-backend.vercel.app/api/v1/customer/divisions")
      .then((res) => res.json())
      .then((data) => setDivisions(data.data || []))
      .catch((error) => console.error("Failed to load divisions:", error));
  }, []);

  // Fetch districts when division changes
  useEffect(() => {
    if (!division) {
      setDistricts([]);
      return;
    }
    
    fetch(
      `https://parjatak-backend.vercel.app/api/v1/customer/districts-by-division-id/${division}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Districts for division:", division, data.data);
        setDistricts(data.data || []);
      })
      .catch((error) => {
        console.error("Failed to load districts:", error);
        setDistricts([]);
      });
  }, [division]);

  // Handle Sign Up
  const handleSignUp = async () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation regex (Bangladesh format: starts with 01, total 11 digits)
    const phoneRegex = /^01[0-9]{9}$/;

    // --- Validation checks ---
    if (!fullname.trim()) {
      toast.error("Full name is required");
      return;
    }
    if (!name.trim()) {
      toast.error("Username is required");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!division) {
      toast.error("Please select a division");
      return;
    }
    if (!district) {
      toast.error("Please select a district");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const payload = {
      divisionId: division,
      districtId: district,
      name,
      fullname,
      email,
      phone,
      password,
      type: "customer",
    };

    setLoading(true);

    try {
      const res = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Signup Response:", data);

      if (res.ok) {
        toast.success("Registration successful! Redirecting to login...");
        
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error(data.message || "Registration failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error signing up:", err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="mb-20 lg:mb-3 shadow-lg">
        <Navbar />
      </div>
      <motion.div className="flex h-screen w-full items-center justify-center ">
        <div className="flex flex-col md:flex-row w-full md:w-[800px] h-auto md:h-[550px] rounded-lg shadow-lg overflow-hidden relative">
          {/* Left Side - Image */}
          <motion.div
            className="w-full md:w-1/2 h-[250px] md:h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg')",
            }}
          />

          {/* Right Side - Sign Up Form */}
          <motion.div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-black">Sign Up</h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black disabled:opacity-50"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black disabled:opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black disabled:opacity-50"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />

            {/* Division Dropdown */}
            <select
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black disabled:opacity-50"
              value={division}
              onChange={(e) => {
                const selectedDivision = e.target.value;
                setDivision(selectedDivision);
                setDistrict(""); // Reset district when division changes
                setDistricts([]); // Clear districts list
              }}
              disabled={loading}
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>

            {/* District Dropdown */}
            <select
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black disabled:opacity-50"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={loading || !division || districts.length === 0}
            >
              <option value="">
                {!division 
                  ? "Select Division First" 
                  : districts.length === 0 
                  ? "Loading districts..." 
                  : "Select District"}
              </option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              ))}
            </select>

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black disabled:opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <button
              className="w-full p-2 bg-[#8cc163] text-white rounded hover:bg-[#7ab052] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="mt-4 text-sm text-black">
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-[#8cc163] cursor-pointer"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default SignUpPage;