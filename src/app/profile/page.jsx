"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaPlus, FaUserAltSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLink } from "react-icons/fa";

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [userId, setUserId] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [activeTab, setActiveTab] = useState("activity");
  const [userName, setUserName] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const cookiesuserId = Cookies.get("userId");
  const [places, setPlaces] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [spotModalOpen, setSpotModalOpen] = useState(false);
  const [bucketList, setBucketList] = useState([]);
  const [diaryList, setDiaryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const userImage = Cookies.get("userImage");

  const [activities, setActivities] = useState([]);

  //NewApi
  const [userData, setUserData] = useState(null);
const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  const userIdFromCookie = Cookies.get("userId");

  const imageSrc =
    userImage && userImage !== "null" ? userImage : "/default-avatar.png";

  useEffect(() => {
    const fetchActivities = async () => {
      const userId = Cookies.get("userId"); // cookies theke userId nibo
      if (!userId) {
        console.error("User ID not found in cookies");
        return;
      }

      try {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/activities/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data.data); // assuming backend returns { data: [...] }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    if (activeTab === "activity") {
      fetchActivities();
    }
  }, [activeTab]);

  //  const [userId, setUserId] = useState("");
  const createBucketList = async (payload) => {
    try {
      const res = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/lists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    } catch (error) {
      console.error("Create Bucket List Error:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (!userIdFromCookie) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `https://parjatak-backend.vercel.app/api/v1/customer/place-reviews/user/${userIdFromCookie}`
        );
        if (res.data.success) {
          setReviews(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    fetchReviews();
  }, [userIdFromCookie]);

  const fetchBucketList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/customer/bucketLists"
      );
      const result = await response.json();

      if (result?.data?.length > 0) {
        const userLists = result.data.filter(
          (list) => list.user?.id === userId
        );
        setBucketList(userLists);
        setLoading(false);
      } else {
        setBucketList([]);
      }
    } catch (error) {
      console.error("Error fetching BucketList:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBucketList(); // 👈 ekhane function ta call hobe
    }
  }, [userId]);

  // Diary List Fetch
  const fetchDiaryList = async () => {
    try {
      const response = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/customer/diaries"
      );
      const result = await response.json();

      if (result?.data?.length > 0) {
        const userDiaries = result.data.filter(
          (diary) => diary.user?.id === userId
        );
        setDiaryList(userDiaries);
      } else {
        setDiaryList([]);
      }
    } catch (error) {
      console.error("Error fetching DiaryList:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDiaryList();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.warn("Please fill in all fields");
      return;
    }

    const payload = {
      userId: cookiesuserId,
      title,
      description,
      isActive: privacy === "Public" ? "true" : "false",
    };

    setLoading(true);

    try {
      const result = await createBucketList(payload);
      toast.success("List created successfully!");

      // ✅ Instantly add new list to UI without reload
      const newList = {
        id: result.data?.id || Date.now(), // Use API response ID or temporary ID
        title: title,
        description: description,
        slug: result.data?.slug || title.toLowerCase().replace(/\s+/g, "-"),
        isActive: privacy === "Public" ? "true" : "false",
        listPlace: [], // Empty array for new list
        createdAt: new Date().toISOString(),
      };

      // Add new list to the beginning of the array
      setLists([newList, ...lists]);

      // Close modal and reset form
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setPrivacy("Public");
    } catch (error) {
      console.error("Failed to create bucket list:", error.message);

      if (error.message.includes("already exists")) {
        toast.error(
          "Bucket list with this name already exists. Please change the name."
        );
      } else {
        toast.error("Failed to create bucket list. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      const id = Cookies.get("userId");
      const name = Cookies.get("userName");
      const fullName = Cookies.get("fullName");
      const userEmail = Cookies.get("userEmail");
      const userPhone = Cookies.get("userPhone");
      const userDivision = Cookies.get("userDivision");
      const userDistrict = Cookies.get("userDistrict");
      const userPassword = Cookies.get("userPassword");
      const userImage = Cookies.get("userImage");
      const billingAddress = userData?.billingAddress;

      if (id) setUserId(id);
      if (name) setName(name);
      if (fullName) setFullname(fullName);
      if (userEmail) setEmail(userEmail);
      if (userPhone) setPhone(userPhone);
      if (userDivision) setDivision(userDivision);
      if (userDistrict) setDistrict(userDistrict);
      if (userPassword) setPassword(userPassword);
      if (userImage) setImage(userImage);
      if (billingAddress) setBio(billingAddress);
    }
  }, [showModal]);

  // Fetch divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch(
          "https://parjatak-backend.vercel.app/api/v1/customer/divisions"
        );
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

  // Handle profile update
  const handleUpdate = async () => {
    try {
      setLoading(true); // start loading

      const formData = new FormData();
      formData.append("name", name);
      formData.append("billingAddress", bio);

      if (image) formData.append("image", image); // image only if selected

      const response = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/users/${userId}`,
        {
          method: "PUT",
          body: formData, // don't set Content-Type
        }
      );

      const result = await response.json();

      if (response.ok) {
        // update cookies / state instantly
        if (result.data.image) setPreview(result.data.image);
        toast.success("Profile updated successfully!");

        // update other cookies
        Cookies.set("userName", name);
        Cookies.set("fullName", fullname);
        Cookies.set("userEmail", email);
        Cookies.set("userPhone", phone);
        Cookies.set("userDivision", division);
        Cookies.set("userDistrict", district);

        setShowModal(false);
      } else {
        alert("Failed to update: " + result.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
      fetchUserData() // stop loading
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const name = Cookies.get("userName");
    const id = Cookies.get("userId");

    if (name) setUserName(name);
    if (id) setUserId(id);
  }, []);

  const spots1 = [
    {
      name: "St. Martin & Chera Dwip",
      image:
        "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg",
    },
    {
      name: "Shahpori Island",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8uhJykGZFXCpVsg2LanJDFG9JUWJvf2YOkA&s",
    },
    {
      name: "ThanchiBandarban",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jR47t5ZChiuOqnYRDbSwhxZCXy730nIACA&s",
    },
    {
      name: "Nafakhum Waterfall",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3i781vXTkIc1p9dKWStDovqK10WgCUngI_w&s",
    },
    {
      name: "Boga Lake",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBcxMV7NTTXVwVyzmBkMAmjl98Af62bm7cg&s",
    },
    {
      name: "Sajek Valley",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s",
    },
    {
      name: "Kuakata Sea Beach",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/a9/8b/44/sea-beach.jpg?w=900&h=-1&s=1",
    },
    {
      name: "Ratargul Swamp Forest",
      image:
        "https://www.travelmate.com.bd/wp-content/uploads/2019/07/Ratargul-2.jpg",
    },
    {
      name: "Lawachara National Park",
      image: "https://source.unsplash.com/600x400/?jungle,forest",
    },
    {
      name: "Tanguar Haor",
      image: "https://source.unsplash.com/600x400/?haor,river",
    },
  ];

  const spots2 = [
    {
      name: "Saint Martin's Island",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s",
    },
    {
      name: "Keokradong",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/18/32/94/best-view-of-keokradong.jpg?w=1200&h=-1&s=1",
    },
    {
      name: "Amiakhum Waterfall",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/77/22/14/amiakhum.jpg?w=900&h=500&s=1",
    },
    {
      name: "Himchari National Park",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRltGRoSqSjk5aJz4fNvFp5l0MgYdLjoBsnfA&s",
    },
    {
      name: "Madhabkunda Waterfall",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo71rsffwGMdqcqzMRoU24AdzpLIv6oh8pug&s",
    },
    {
      name: "Nijhum Dwip",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQKTQkUYbNzdbnsLxPAJw26kkaZgoY8Lh6w&s",
    },
    {
      name: "Remakri Falls",
      image: "https://source.unsplash.com/600x400/?jungle,river",
    },
    {
      name: "Satchari National Park",
      image: "https://source.unsplash.com/600x400/?forest,camping",
    },
    {
      name: "Bandarban Hill Tracks",
      image: "https://source.unsplash.com/600x400/?hiking,adventure",
    },
    {
      name: "Jaflong",
      image: "https://source.unsplash.com/600x400/?river,mountains",
    },
  ];

  // Fetch places function
  const fetchPlaces = async () => {
    try {
      const response = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/customer/places"
      );
      const data = await response.json();
      setPlaces(data.data); // API response structure anujayi
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // Fetch lists function
  const fetchLists = async () => {
    try {
      const response = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/customer/lists"
      );
      const data = await response.json();
      const userLists = data.data.filter((list) => list.user.id === userId);
      setLists(userLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  // Fetch on modal open
  useEffect(() => {
    if (userId) {
      fetchPlaces();
      fetchLists();
    }
  }, [userId]);

  const handleSpotSubmit = async () => {
    if (!selectedPlace || !selectedList) {
      alert("Please select both Place and List");
      return;
    }

    const payload = {
      userId: cookiesuserId,
      listId: selectedList,
      placeId: selectedPlace,
      isActive: true,
    };

    try {
      const response = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/add-lists-places",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Spot added successfully!");
        setSpotModalOpen(false);
        setSelectedPlace("");
        setSelectedList("");
      } else {
        alert("Failed to add spot!");
      }
    } catch (error) {
      console.error("Error posting spot:", error);
      alert("Something went wrong!");
    }
  };

  //New Api
  const fetchUserData = async () => {
    setLoadingUser(true);
    try {
      const response = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/users/${userIdFromCookie}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.data && data.data.id === userIdFromCookie) {
          setUserData(data.data);
        } else {
          setError("User not found.");
        }
      } else {
        setError(data.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError("Error fetching data.");
    } finally {
     setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (!userIdFromCookie) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetchUserData();
  }, [userIdFromCookie]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // Destructure the user data
  const { billingAddress, following, followers } = userData || {};

  const fetchUserEvents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/user-events/${userId}`
      );
      const data = await res.json();
      setUserEvents(data.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch user events:", error);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (activeTab === "events") {
  //     fetchUserEvents();
  //   }
  // }, [activeTab]);

  // if (activeTab !== "events") return null;

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-32 h-32 flex justify-center items-center">
            {/* Bouncing Circles */}
            <div className="absolute w-8 h-8 bg-green-500 rounded-full animate-bounce delay-150"></div>
            <div className="absolute w-8 h-8 bg-green-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute w-8 h-8 bg-green-300 rounded-full animate-bounce delay-450"></div>
          </div>
          <p className="mt-6 text-white text-xl font-semibold animate-pulse text-center">
            Loading Profile...
          </p>
        </div>
      )}

      <div className="shadow-lg w-full z-40 relative">
        <Navbar />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-[1120px]">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between border-b border-gray-300 pb-6 mb-6 space-y-6 lg:space-y-0">
         <div className="flex flex-col lg:flex-row items-center lg:justify-between border-b border-gray-300 pb-6 mb-6 space-y-6 lg:space-y-0">
  <div className="flex items-center space-x-4">
    <div className="flex flex-col items-center mb-4">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-300">
        {loadingUser ? (
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-full" />
        ) : (
          <Image
            src={userData?.image || "https://cdn-icons-png.flaticon.com/512/9368/9368192.png"}
            alt="Profile Preview"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>

    <div>
      <h1 className="text-3xl font-bold">
        {loadingUser ? (
          <div className="h-6 w-32 bg-gray-300 animate-pulse rounded" />
        ) : (
          userData?.name
        )}
      </h1>

      <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
        {loadingUser ? (
          <div className="h-4 w-48 bg-gray-300 animate-pulse rounded" />
        ) : billingAddress?.trim() ? (
          billingAddress
        ) : (
          <>
            <FaUserAltSlash className="text-gray-400" />
            <span className="italic text-gray-400">No bio added yet</span>
          </>
        )}
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="mt-2 px-4 py-2 bg-[#8cc163] text-white rounded hover:bg-green-500 text-sm"
      >
        {loadingUser ? "Loading..." : "Edit Profile"}
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

                    {/* <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            /> */}
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="bio"
                      className="w-full p-2 border rounded mb-4 bg-[#FCF0DC] text-black"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    {/* <input
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
            /> */}

                    {/* <select
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
/> */}
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-gray-800 font-medium">
                        Change Profile Picture
                      </p>

                      <label className="inline-block px-4 py-2 bg-white text-gray-700 rounded cursor-pointer">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setImage(file);
                            setPreview(URL.createObjectURL(file)); // show preview instantly
                          }}
                        />
                      </label>

                      {preview && (
                        <img
                          src={preview}
                          alt="Profile Preview"
                          className="w-20 h-20 rounded-full mt-2 object-cover border border-gray-300"
                        />
                      )}
                    </div>

                    <button
                      className={`w-full p-2 rounded mt-4 text-white ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#8cc163]"
                      }`}
                      onClick={handleUpdate}
                      disabled={loading}
                    >
                      {loading ? "Updating Profile..." : "Update Profile"}
                    </button>
                  </motion.div>
                </div>
              )}

    </div>
  </div>
</div>


         <div>
  <ul className="flex space-x-6 md:space-x-8">
    <li
      onClick={() => setShowFollowing(true)}
      className="cursor-pointer"
    >
      <h2 className="text-xl font-bold">
        {loadingUser ? (
          <div className="h-6 w-6 bg-gray-300 animate-pulse rounded" />
        ) : (
          userData?.following?.length || 0
        )}
      </h2>
      <p className="text-sm text-gray-500">Following</p>
    </li>

    <li
      onClick={() => setShowFollowers(true)}
      className="cursor-pointer"
    >
      <h2 className="text-xl font-bold">
        {loadingUser ? (
          <div className="h-6 w-6 bg-gray-300 animate-pulse rounded" />
        ) : (
          userData?.follower?.length || 0
        )}
      </h2>
      <p className="text-sm text-gray-500">Followers</p>
    </li>
  </ul>

  {/* Followers Modal */}
  {showFollowers && (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg p-5 max-h-[400px] overflow-y-auto relative shadow-lg">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={() => setShowFollowers(false)}
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4 text-center">Followers</h3>

        {loadingUser ? (
          // Skeleton for followers list
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-4 border-b pb-2">
              <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-32" />
              </div>
            </div>
          ))
        ) : userData?.follower?.length > 0 ? (
          userData?.follower?.map((f, index) => (
            <Link key={index} href={`/userprofile/${f?.meUser?.id}`}>
              <div className="flex items-center gap-3 mb-4 border-b pb-2 cursor-pointer">
                <img
                  src={f?.otherUser?.image || "https://via.placeholder.com/40"}
                  alt={f?.otherUser?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {f?.meUser?.fullname || f?.meUser?.name || "User"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No followers found.</p>
        )}
      </div>
    </div>
  )}

  {/* Following Modal */}
  {showFollowing && (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg p-5 max-h-[400px] overflow-y-auto relative shadow-lg">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={() => setShowFollowing(false)}
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4 text-center">Following</h3>

        {loadingUser ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-4 border-b pb-2">
              <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-32" />
              </div>
            </div>
          ))
        ) : userData?.following?.length > 0 ? (
          userData.following.map((f, index) => (
            <Link key={index} href={`/userprofile/${f?.otherUser?.id}`}>
              <div className="flex items-center gap-3 mb-4 border-b pb-2 cursor-pointer">
                <img
                  src={f?.otherUser?.image || "https://via.placeholder.com/40"}
                  alt={f?.otherUser?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {f?.otherUser?.fullname || f?.otherUser?.name || "User"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No following found.</p>
        )}
      </div>
    </div>
  )}
</div>

        </div>

        {/* Tab Navigation */}
        <div className="text-center mb-8">
          <ul className="inline-flex flex-wrap justify-center border-b w-full border-gray-300 pb-2 space-x-4 sm:space-x-6">
            {/* <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('profile')}
            >
              Profile
            </li> */}
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === "activity"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("activity")}
            >
              Activity
            </li>
            {/* <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'place' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('place')}
            >
              Place
            </li> */}
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === "diary"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("diary")}
            >
              Diary
            </li>
            {/* <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('reviews')}
            >
              Reviews
            </li> */}
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === "list"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("list")}
            >
              Your List
            </li>
            <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === "bucket"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("bucket")}
            >
              Bucket list
            </li>
            {/* <li
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('events')}
            >
              Events
            </li> */}
          </ul>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1  gap-8">
          <div className="lg:col-span-2">
            {/* Profile Section */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-4 border-b">
                  Favorite Places
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Don’t forget to select your{" "}
                  <span className="font-bold">favorite places</span>!
                </p>
                <h2 className="text-xl font-bold mb-4 border-b">
                  Recent Activity
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Sylhet",
                      img: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg",
                    },
                    {
                      name: "Coxs Bazar",
                      img: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg",
                    },
                    {
                      name: "Saint Martin",
                      img: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg",
                    },
                    {
                      name: "Coxs Bazar",
                      img: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg",
                    },
                  ].map((place, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded">
                      <img
                        src={place.img}
                        alt={place.name}
                        className="w-full rounded"
                      />
                      <h3 className="mt-2 text-sm font-bold text-center">
                        {place.name}
                      </h3>
                      <p className="text-center text-gray-500 text-xs">★★★★½</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Activity Section */}
            {activeTab === "activity" && (
              <div className="min-h-[400px]">
                {" "}
                {/* min-h adjust করতে পারেন */}
                <h2 className="text-xl font-bold mb-4 border-b">
                  Recent Activity
                </h2>
                {/* Activity List */}
                <div>
                  {activities?.length === 0 ? (
                    <p>No recent activity found.</p>
                  ) : (
                    activities
                      ?.filter((item) => item.type === "activity")
                      .map((activity) => (
                        <div key={activity?.id} className="border-b py-3">
                          <p className="text-gray-800">{activity?.message}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity?.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {/* Place Section */}
            {activeTab === "place" && (
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">
                  Places Visited
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <img
                      className="w-full h-48 object-cover"
                      src="https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg"
                      alt="Cox's Bazar"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 text-gray-700">
                        Cox's Bazar
                      </div>
                      <p className="text-gray-600 text-base">
                        Walked along the world’s longest sea beach and enjoyed
                        fresh seafood.
                      </p>
                    </div>
                  </div>
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <img
                      className="w-full h-48 object-cover"
                      src="https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg"
                      alt="Sundarbans"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 text-gray-700">
                        Sundarbans
                      </div>
                      <p className="text-gray-600 text-base">
                        Explored the largest mangrove forest and spotted the
                        Royal Bengal Tiger.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Diary Section */}

            {activeTab === "diary" && (
              <div className="p-6">
                {/* Diary Entries */}
                <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-4 border-b-2 border-gray-300 pb-2 text-center">
                  Diary Entries
                </h2>

                <div className="space-y-4">
                  {loading ? (
                    // Skeleton loader while data is loading
                    Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded shadow-md overflow-hidden animate-pulse"
                      >
                        <div className="w-full h-48 bg-gray-300"></div>
                        <div className="p-6">
                          <div className="h-6 bg-gray-300 rounded mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Render actual data once it's loaded
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {reviews.map((review) => (
                        <Link
                          href={`/PlaceDetails/${review.place?.slug}`}
                          key={review.id}
                        >
                          <div
                            key={review.id}
                            className="bg-white rounded shadow-md overflow-hidden"
                          >
                            <img
                              className="w-full h-48 object-cover"
                              src={
                                review.images?.[0]?.image ||
                                "https://via.placeholder.com/300x200"
                              }
                              alt={review.place?.name || "Review Image"}
                            />
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {review.place?.name || "Unknown Place"}
                              </h3>
                              <p className="text-sm text-gray-500 mb-2">
                                {new Date(
                                  review.reviewDate
                                ).toLocaleDateString()}
                              </p>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {activeTab === "reviews" && (
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">
                  Reviews
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <img
                      className="w-full h-48 object-cover"
                      src="https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg"
                      alt="Ratargul Swamp Forest"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 text-gray-700">
                        Ratargul Swamp Forest
                      </div>
                      <p className="text-gray-600 text-base">
                        A magical experience of rowing through a submerged
                        forest. Nature at its best!
                      </p>
                      <div className="flex items-center mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-star-fill text-yellow-500"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.203-.82-.161-.768-.603L4.6 10.847 1.72 7.792c-.307-.301-.146-.812.283-.854l4.605-.615L7.943.717c.188-.379.702-.379.89 0l2.088 5.606 4.605.615c.43.042.59.553.283.854l-2.88 3.055 1.757 4.993c.052.442-.382.806-.768.603L8 12.531l-4.282 2.912z" />
                        </svg>
                        <span className="ml-1 text-gray-600">4.8</span>
                        <span className="ml-2 text-gray-500">(12 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <img
                      className="w-full h-48 object-cover"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOiD3UI5bi40_D626coWyXI-y5PsDnGgFyA&s"
                      alt="Jaflong"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 text-gray-700">
                        Jaflong
                      </div>
                      <p className="text-gray-600 text-base">
                        Enjoyed the crystal-clear rivers and lush hills at the
                        Bangladesh-India border.
                      </p>
                      <div className="flex items-center mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-star-fill text-yellow-500"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.203-.82-.161-.768-.603L4.6 10.847 1.72 7.792c-.307-.301-.146-.812.283-.854l4.605-.615L7.943.717c.188-.379.702-.379.89 0l2.088 5.606 4.605.615c.43.042.59.553.283.854l-2.88 3.055 1.757 4.993c.052.442-.382.806-.768.603L8 12.531l-4.282 2.912z" />
                        </svg>
                        <span className="ml-1 text-gray-600">4.6</span>
                        <span className="ml-2 text-gray-500">(8 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bucket List Section */}
            {activeTab === "bucket" && (
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">
                  Bucket List
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading
                    ? // Skeleton Loader while data is loading
                      Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="max-w-sm rounded overflow-hidden shadow-lg bg-white animate-pulse"
                        >
                          <div className="w-full h-48 bg-gray-300"></div>
                          <div className="px-6 py-4">
                            <div className="h-6 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      ))
                    : // Render actual data once it's loaded
                      bucketList.map((item) => (
                        <Link
                          href={`/PlaceDetails/${item.place?.slug}`}
                          key={item.id}
                        >
                          <div
                            key={item.id}
                            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
                          >
                            <img
                              className="w-full h-48 object-cover"
                              src={
                                item.place?.images[0]?.image ||
                                "https://via.placeholder.com/400x300"
                              }
                              alt={item.place?.name || "Place Image"}
                            />
                            <div className="px-6 py-4">
                              <div className="font-bold text-xl mb-2 text-gray-700">
                                {item.place?.name || item.title}
                              </div>
                              <p className="text-gray-600 text-base">
                                {item.description || "No Description"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                </div>
              </div>
            )}

            {/* Events Section */}
            {/* {activeTab === 'events' && (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 text-center">Upcoming Events</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src="https://bangladeshinfo.com/storage/images/1581139784.jpg" alt="Dhaka Art Summit" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-700">Dhaka Art Summit</div>
          <p className="text-gray-600 text-base">Explore contemporary art from February 2–10 in Dhaka. Don’t miss it!</p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src="https://ecdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2023/04/14/978e5f322b7f038c29006532ab5d6a49-64386a39a750e.jpg?jadewits_media_id=6895" alt="Pohela Boishakh" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-700">Pohela Boishakh</div>
          <p className="text-gray-600 text-base">Celebrate the Bangla New Year in Dhaka and other major cities with cultural events and food.</p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src="https://pathfriend-bd.com/wp-content/uploads/2019/08/Bandarban.jpg" alt="Chittagong Hill Tracts" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-700">Chittagong Hill Tracts</div>
          <p className="text-gray-600 text-base">Join the annual festival of indigenous cultures, celebrating heritage and tradition.</p>
        </div>
      </div>
    </div>
  </div>
)} */}

            {/* List Section */}
            {activeTab === "list" && (
              <div className="p-6 w-full">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#8cc163] text-white px-3 lg:px-6 py-2 rounded-lg ml-[100px] lg:ml-[85%] mb-10 flex items-center gap-2 hover:bg-[#8fe44d]"
                >
                  <FaPlus /> {/* Icon here */}
                  Create List
                </button>
                {/* Header */}
                <div className="flex  justify-between items-center mb-4 w-full">
                  {/* <h2 className="text-lg lg:text-3xl font-bold text-gray-800">Best Places for Camping</h2> */}
                  <div>
                    {/* Add Spot Button */}
                    {/* <button
        className="bg-[#8cc163] text-white px-3 py-2 lg:px-6  lg:py-2 rounded-lg flex items-center ml-[100px]  gap-2 hover:bg-[#8fe44d]"
        onClick={() => setSpotModalOpen(true)}
      >
        <FaPlus /> Add Spot on List
      </button> */}

                    {/* Modal */}
                    {spotModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <motion.div
                          className="bg-white p-6 rounded-lg w-11/12 md:w-1/3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <h2 className="text-xl font-bold mb-4">
                            Add Spot to List
                          </h2>

                          <div className="mb-4">
                            <label className="block mb-1">Select Place</label>
                            <select
                              value={selectedPlace}
                              onChange={(e) => setSelectedPlace(e.target.value)}
                              className="w-full border p-2 rounded"
                            >
                              <option value="">Select a Place</option>
                              {places.map((place) => (
                                <option key={place.id} value={place.id}>
                                  {place.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="mb-4">
                            <label className="block mb-1">Select List</label>
                            <select
                              value={selectedList}
                              onChange={(e) => setSelectedList(e.target.value)}
                              className="w-full border p-2 rounded"
                            >
                              <option value="">Select a List</option>
                              {lists.map((list) => (
                                <option key={list.id} value={list.id}>
                                  {list.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setSpotModalOpen(false)}
                              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSpotSubmit}
                              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Submit
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>

                {/* First Row - Best Camping Spots */}

                {lists.length > 0 ? (
                  lists.map((spot, index) => (
                    <div key={spot.id || index} className="mb-8">
                      {/* List Title with Share */}
                      <div className="flex items-center justify-between mb-2">
                        <Link href={`/list/${spot.slug}`}>
                          <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-2 hover:text-[#8cc163] transition-colors">
                            {spot.title}
                          </h2>
                        </Link>

                        <div className="flex items-center gap-2">
                          {/* Copy Link */}
                          <button
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                const shareUrl = `${window.location.origin}/list/${spot.slug}`;
                                navigator.clipboard.writeText(shareUrl);
                                toast.success("Link copied to clipboard!");
                              }
                            }}
                            className="text-green-500 p-2 rounded hover:bg-green-100 transition"
                            title="Copy Link"
                          >
                            <FaLink />
                          </button>

                          {/* Facebook Share */}
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${
                              typeof window !== "undefined"
                                ? window.location.origin
                                : ""
                            }/list/${spot.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 p-2 rounded hover:bg-blue-100 transition"
                            title="Share on Facebook"
                          >
                            <FaFacebookF />
                          </a>

                          {/* Instagram (copy text for post) */}
                          <button
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                const instaText = `Check out my visited places: ${window.location.origin}/list/${spot.slug}`;
                                navigator.clipboard.writeText(instaText);
                                toast.success("Text copied for Instagram!");
                              }
                            }}
                            className="text-pink-500 p-2 rounded hover:bg-pink-100 transition"
                            title="Copy for Instagram"
                          >
                            <FaInstagram />
                          </button>

                          {/* WhatsApp Share */}
                          <a
                            href={`https://api.whatsapp.com/send?text=Check out my visited places: ${
                              typeof window !== "undefined"
                                ? window.location.origin
                                : ""
                            }/list/${spot.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 p-2 rounded hover:bg-green-100 transition"
                            title="Share on WhatsApp"
                          >
                            <FaWhatsapp />
                          </a>
                        </div>
                      </div>

                      {/* Swiper for places */}
                      {spot.listPlace && spot.listPlace.length > 0 ? (
                        <Swiper
                          spaceBetween={20}
                          slidesPerView={2}
                          breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                          }}
                        >
                          {spot.listPlace.map((listPlaceItem, idx) => (
                            <SwiperSlide key={idx} className="w-[250px]">
                              <Link
                                href={`/PlaceDetails/${listPlaceItem.place?.slug}`}
                              >
                                <div className="w-full h-[200px] bg-green-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                                  <img
                                    src={
                                      listPlaceItem.place?.images?.[0]?.image ||
                                      "/placeholder.jpg"
                                    }
                                    alt={
                                      listPlaceItem.place?.name || "Place Image"
                                    }
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-center mt-2 font-medium text-gray-700 hover:text-[#8cc163] transition-colors">
                                  {listPlaceItem.place?.name}
                                </p>
                              </Link>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <div className="w-full h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">No Places Added Yet</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No lists created yet. Create your first list!
                    </p>
                  </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
                      <h2 className="text-2xl font-bold mb-4">
                        Create New List
                      </h2>
                      <form onSubmit={handleSubmit}>
                        <label className="block mb-2 font-medium">Title:</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          disabled={loading}
                          className="w-full border px-3 py-2 rounded mb-3 bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#8cc163]"
                          placeholder="Enter Title"
                          required
                        />

                        <label className="block mb-2 font-medium">
                          Description:
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          disabled={loading}
                          className="w-full border px-3 py-2 rounded mb-3 bg-white min-h-[100px] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#8cc163]"
                          placeholder="Enter description"
                          required
                        />

                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => {
                              if (!loading) {
                                setIsModalOpen(false);
                                setTitle("");
                                setDescription("");
                              }
                            }}
                            disabled={loading}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-[#8cc163] text-white rounded hover:bg-[#7ab052] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Saving...</span>
                              </div>
                            ) : (
                              "Save list"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side Section - only visible in profile tab */}
          {activeTab === "profile" && (
            <div>
              {/* Diary Section */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 border-b">Diary</h2>
                <p className="text-gray-500 text-sm">
                  📅 <strong>Coxs Bazar</strong>
                </p>
              </div>

              {/* Ratings Section */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 border-b">Ratings</h2>
                <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
                  <p className="text-gray-500 text-sm">★★★★½</p>
                </div>
              </div>

              {/* Activity Section */}
              <div>
                <h2 className="text-lg font-bold mb-4 border-b">Activity</h2>
                <p className="text-gray-500 text-sm">
                  • You liked, and rated <strong>Coxs Bazar</strong> ★★★★½ on
                  Tuesday.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfilePage;
