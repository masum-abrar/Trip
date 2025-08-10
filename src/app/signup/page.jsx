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

  // Form fields
  const [fullname, setFullname] = useState("");
  const [name, setName] = useState(""); // username or display name
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Fetch divisions on load
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/divisions");
        const data = await response.json();
        setDivisions(data.data);
      } catch (error) {
        console.error("Failed to fetch divisions:", error);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch districts when division changes
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/districts?division=${division}`
        );
        const data = await response.json();
        setDistricts(data.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    if (division) fetchDistricts();
  }, [division]);

  // ✅ Handle Sign Up
  // ✅ Handle Sign Up
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
      toast.success("Registration successful!");
      // Redirect or clear form if needed
    } else {
      toast.error(data.message || "Registration failed");
    }
  } catch (err) {
    console.error("Error signing up:", err);
    toast.error("Something went wrong");
  }
};


  return (
    <div className="">
      <div className="mb-2 shadow-lg">
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
          <motion.div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative">
            <h2 className="text-2xl font-bold mb-6 text-black">Sign Up</h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Division Dropdown */}
            <select
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
              }}
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
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              ))}
            </select>

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full p-2 bg-[#8cc163] text-white rounded"
              onClick={handleSignUp}
            >
              Sign Up
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
