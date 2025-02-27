"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const districtsData = {
  Dhaka: {
    subDistricts: {
      Dhanmondi: ["City 1", "City 2"],
      Uttara: ["City 3", "City 4"],
    },
  },
  Chattogram: {
    subDistricts: {
      Pahartali: ["City 5", "City 6"],
      Agrabad: ["City 7", "City 8"],
    },
  },
};

const SignUpPage = () => {
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [city, setCity] = useState("");

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

          {/* Right Side - Sign Up Form */}
          <motion.div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative">
            <h2 className="text-2xl font-bold mb-6 text-black">Sign Up</h2>

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
                <option key={dist} value={dist}>
                  {dist}
                </option>
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
              {district &&
                Object.keys(districtsData[district]?.subDistricts || {}).map((subDist) => (
                  <option key={subDist} value={subDist}>
                    {subDist}
                  </option>
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
              {subDistrict &&
                (districtsData[district]?.subDistricts[subDistrict] || []).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>

            <button className="w-full p-2 bg-[#8cc163] text-white rounded">Sign Up</button>

            {/* Link to Login Page */}
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
    </div>
  );
};

export default SignUpPage;
