'use client';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function EditProfileModal() {
  const [showModal, setShowModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");

  const [userId, setUserId] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Prefill from cookies when modal opens
  useEffect(() => {
    if (showModal) {
      const id = Cookies.get("userId");
      const name = Cookies.get("userName");
      const fullName = Cookies.get("fullName");
      const userEmail = Cookies.get("userEmail");
      const userPhone = Cookies.get("userPhone");
      const userDivision = Cookies.get("userDivision");
      const userDistrict = Cookies.get("userDistrict");

      if (id) setUserId(id);
      if (name) setName(name);
      if (fullName) setFullname(fullName);
      if (userEmail) setEmail(userEmail);
      if (userPhone) setPhone(userPhone);
      if (userDivision) setDivision(userDivision);
      if (userDistrict) setDistrict(userDistrict);
    }
  }, [showModal]);

  // Fetch divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("https://parjatak-core.vercel.app/api/v1/customer/divisions");
        const data = await response.json();
        setDivisions(data.data);
      } catch (error) {
        console.error("Failed to fetch divisions:", error);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch districts on division change
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          `https://parjatak-core.vercel.app/api/v1/customer/districts?division=${division}`
        );
        const data = await response.json();
        setDistricts(data.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };
    if (division) fetchDistricts();
  }, [division]);

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const payload = {
        fullname,
        name,
        email,
        phone,
        division,
        district,
        password,
      };

      const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Optional: Update cookies
        Cookies.set("userName", name);
        Cookies.set("fullName", fullname);
        Cookies.set("userEmail", email);
        Cookies.set("userPhone", phone);
        Cookies.set("userDivision", division);
        Cookies.set("userDistrict", district);

        alert("Profile updated successfully!");
        setShowModal(false);
      } else {
        alert("Failed to update: " + result.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowModal(true)}
        className="mt-2 px-4 py-2 bg-[#8cc163] text-white rounded hover:bg-green-500 text-sm"
      >
        Edit Profile
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative"
          >
            <button
              className="absolute top-2 right-2 text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black text-center">
              Edit Profile
            </h2>

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
              onClick={handleUpdate}
            >
              Update Profile
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
