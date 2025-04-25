'use client';

import { useState,useEffect } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Cookies from "js-cookie";
import Link from 'next/link';


const DiscussTabSection = ({hidePlaceSelection , PostData}) => {

  const [showAllImages, setShowAllImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
 const [locationData, setLocationData] = useState(null);
  const [activeTab, setActiveTab] = useState('Discussion');
  const districtId = PostData?.id;
  // const [newPost, setNewPost] = useState({
  //   text: "",
  //   images: [],
  //   divisionId: "",
  //   districtId: "",
  //   placeId: "",
  //   type: "discussion", // or "event"
  //   startDate: "",
  //   endDate: "",
  // });
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Rakib Hasan",
      text: "Sunset Music Festival is happening this weekend! Don’t miss out!",
      replies: [],
      images: ["https://media.istockphoto.com/id/497039777/photo/wedding-setting.jpg?s=612x612&w=0&k=20&c=uHwz_57iBRVXrUPacCiLTuTPYyZS1az9GA0sCDeMP5U="], // Change `image` to `images`
 startDate: "2025-03-01",
  endDate: "2025-03-02",
      place: "Beach",
      subdistrict: "North",
      likes: 2,
      liked: false,
      comments: [
        { id: 1, user: "Raihan", text: "Looking forward to this event! What’s the schedule?", replies: [] },
        { id: 2, user: "Sakib", text: "Can anyone join, or do I need to register first?", replies: [] },
        { id: 3, user: "Rihan", text: "This is going to be so much fun! Who else is coming?", replies: [] },
        { id: 4, user: "Saad", text: "Will there be any guest speakers or special activities?", replies: [] },
      ],
      
      newComment: '',
      showAllComments: false,
    },
    {
      id: 2,
      user: "Sakib Hasan",
      text: "Let's gather for a beach cleanup drive followed by a sunset picnic!",
      replies: [],
      images: ["https://media-api.xogrp.com/images/b9a84d67-c58e-4c08-aa9c-33e43ac93ebd"], // Change `image` to `images`
      startDate: "2025-03-01",
      endDate: "2025-03-02",
      place: "Hill",
      subdistrict: "South",
      likes: 5,
      liked: false,
      comments: [
        { id: 5, user: "Rihan", text: "This event sounds exciting! Can't wait to join.", replies: [] },
        { id: 6, user: "Sohel", text: "Is there any registration process for this event?", replies: [] },
        { id: 7, user: "Omar", text: "Looking forward to meeting new people at this event.", replies: [] },
        { id: 8, user: "Imran", text: "What’s the exact location? I’d love to participate!", replies: [] },
      ],
      
      newComment: '',
      showAllComments: false,
    },
  ]);
  // const handleImageChange = (e) => {
  //   if (!e.target.files) return;  // Ensure files exist
  
  //   const files = Array.from(e.target.files);
  //   const imageUrls = files.map(file => URL.createObjectURL(file));
  
  //   setNewPost(prevState => ({
  //     ...prevState,
  //     images: [...(prevState.images || []), ...imageUrls]  // Ensure it's always an array
  //   }));
  // };
  
  
  
  // const removeImage = (index) => {
  //   setNewPost(prevState => ({
  //     ...prevState,
  //     images: prevState.images.filter((_, i) => i !== index)
  //   }));
  // };
  
  
  const [showReplyInput, setShowReplyInput] = useState({});
  const [replyTexts, setReplyTexts] = useState({});

  const handleReplyToggle = (postId, commentId) => {
    setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReply = (postId, commentId) => {
    if (replyTexts[commentId]?.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: [...comment.replies, { id: Date.now(), text: replyTexts[commentId], user: "User" }]
                    }
                  : comment
              )
            }
          : post
      ));
      setReplyTexts(prev => ({ ...prev, [commentId]: '' }));
    }
  };

  // const handlePost = () => {
  //   if (!newPost.text.trim() && newPost.images.length === 0) {
  //     alert("Please write something or add an image.");
  //     return;
  //   }
  
  //   const newPostData = {
  //     id: Date.now(),
  //     user: "User Name",
  //     text: newPost.text,
  //     images: [...(newPost.images || [])], // Ensure images is an array
  //     startDate: newPost.startDate, // Add start date
  //     endDate: newPost.endDate, // Add end date
  //     comments: [],
  //     likes: 0,
  //     liked: false
  //   };
    
  
  //   setPosts([newPostData, ...posts]);
  //   setNewPost({ text: "", images: [], place: "" });  // Reset state after posting
  // };
  

  const toggleComments = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, showAllComments: !post.showAllComments } : post));
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const handleComment = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.newComment.trim()) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), user: "User", text: post.newComment, replies: [] }],
          newComment: '',
        };
      }
      return post;
    }));
  };
  // const handlePost = async () => {
  //   const payload = {
  //     divisionId: newPost.divisionId,
  //     districtId: newPost.districtId,
  //     placeId: newPost.placeId,
  //     title: newPost.text,
  //     description: newPost.text,
  //     type: "discussion",
  //     eventStartDate: "",
  //     eventEndDate: "",
  //     isActive: true,
  //   };
  
  //   try {
  //     const response = await fetch("https://parjatak-core.vercel.app/api/v1/posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     console.log("Post created successfully:", data);
  //   } catch (error) {
  //     console.error("Post creation failed:", error);
  //   }
  // };
  
  //neww

  
    const [newPost, setNewPost] = useState({
      text: "",
      divisionId: "",
      districtId: "",
      placeId: "",
      images: [],
    });
  
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [places, setPlaces] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
  
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
  
    // Fetch districts
    useEffect(() => {
      if (newPost.divisionId) {
        const fetchDistricts = async () => {
          try {
            const response = await fetch(
              `https://parjatak-core.vercel.app/api/v1/customer/districts?division=${newPost.divisionId}`
            );
            const data = await response.json();
            setDistricts(data.data);
          } catch (error) {
            console.error("Failed to fetch districts:", error);
          }
        };
        fetchDistricts();
      }
    }, [newPost.divisionId]);
  
    // Fetch places
    useEffect(() => {
      const fetchPlaces = async () => {
        try {
          const response = await fetch("https://parjatak-core.vercel.app/api/v1/customer/places");
          const data = await response.json();
          setPlaces(data.data);
        } catch (error) {
          console.error("Failed to fetch places:", error);
        }
      };
      fetchPlaces();
    }, []);
  
    // Handle image change
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedFiles(files);
      setNewPost((prev) => ({ ...prev, images: previewUrls }));
    };
  
    const removeImage = (index) => {
      const newImages = [...newPost.images];
      const newFiles = [...selectedFiles];
      newImages.splice(index, 1);
      newFiles.splice(index, 1);
      setNewPost({ ...newPost, images: newImages });
      setSelectedFiles(newFiles);
    };
  
    const handlePost = async () => {
     
      const userId = Cookies.get("userId"); // Adjust this key if needed
  
      const formData = new FormData();
  
      formData.append("userId", userId);
    formData.append("divisionId", locationData.divisionId);
    formData.append("districtId", locationData.id); // this is districtId
    formData.append("placeId", newPost.placeId);
    formData.append("title", newPost.text);
    formData.append("description", newPost.text);
    formData.append("type", "discussion");
    formData.append("eventStartDate", "");
    formData.append("eventEndDate", "");
    formData.append("isActive", "true");
      formData.append("slug", "");
  
      selectedFiles.forEach((file, index) => {
        formData.append(`images`, file);
      });
  
      try {
        const response = await fetch("https://parjatak-core.vercel.app/api/v1/posts", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Post created successfully:", data);
        toast.success("Post has been created");
      } catch (error) {
        console.error("Post creation failed:", error);
      }
    }
  

    // Display the posts


    useEffect(() => {
        const fetchCommunity = async () => {
          try {
            const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/districts-posts-discussion/${districtId}`);
            const data = await response.json();
            setLocationData(data.data);
          } catch (error) {
            console.error('Failed to fetch community:', error);
          }
        };
      
        if (districtId) {
          fetchCommunity();
        }
      }, [districtId]);
  return (
    <div>
     <div className="space-y-6">
    {/* Post Input Section */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handlePost();
      }}
      className="bg-white shadow-md rounded-xl p-4"
    >
      <textarea
        className="w-full p-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="What's on your mind?"
        value={newPost.text}
        onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
      ></textarea>

      <div className="flex items-center flex-wrap gap-3 mt-3">
        {/* Place Dropdown from Parent */}
        <select
          value={newPost.placeId}
          onChange={(e) => setNewPost({ ...newPost, placeId: e.target.value })}
          className="border bg-white p-2 text-black rounded-md"
        >
          <option value="">Select Place</option>
          {locationData?.place?.map((place) => (
  <option key={place.id} value={place.id}>{place.name}</option>
))}

        </select>

        {/* Image Upload */}
        <label className="cursor-pointer">
          <FaImage className="text-xl text-gray-600 hover:text-blue-500" />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <button type="submit" className="bg-[#8cc163] text-white px-6 py-2 rounded-lg hover:bg-[#39c252]">
          Post
        </button>
      </div>

      {/* Preview Images */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {newPost.images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`Selected ${index}`} className="w-full h-20 object-cover rounded-md" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </form>
    

    {/* Posts Display */}
    {locationData?.map((post) => (
      <div key={post.id} className="bg-white shadow-md rounded-xl p-4">
       <Link href={`/userprofile/${post.userId}`} className="flex items-center space-x-2 mb-2">
       <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-gray-600" />
          <span className="font-semibold text-gray-800">{post?.user?.name}</span>
        </div>
       </Link>

{/* Display Multiple Images */}

{post.images && post.images.length >= 0 && (
  <div className={`mt-2 ${post.images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2"} gap-2 relative`}>
    {post.images.slice(0, 4).map((imgObj, index) => (
      <div key={index} className="relative">
        <img 
          src={imgObj.image} 
          alt="Post" 
          className={`w-full ${post.images.length === 1 ? "h-56" : "h-40"} object-cover rounded-md cursor-pointer`}
          onClick={() => setSelectedImage(imgObj.image)} // Click to preview
        />

        {/* Overlay if there are more than 4 images */}
        {index === 3 && post.images.length > 4 && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md cursor-pointer"
            onClick={() => setShowAllImages(post.id)}
          >
            <span className="text-white text-lg font-semibold">+{post.images.length - 4}</span>
          </div>
        )}
      </div>
    ))}
  </div>
)}

{/* Single Image Preview Modal */}
{selectedImage && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="relative bg-white p-4 rounded-lg max-w-2xl w-full">
      <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white text-2xl">❌</button>
      <img src={selectedImage} alt="Preview" className="w-full max-h-[80vh] object-contain rounded-md" />
    </div>
  </div>
)}

{/* Show All Images Modal */}
{showAllImages === post.id && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg max-w-4xl w-full relative">
      <button onClick={() => setShowAllImages(null)} className="absolute top-4 right-4 text-black text-4xl">❌</button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {post.images.map((imgObj, index) => (
          <img 
            key={index} 
            src={imgObj.image} 
            alt="Post" 
            className="w-full h-40 object-cover rounded-md cursor-pointer"
            onClick={() => setSelectedImage(imgObj.image)} // Click to preview any image
          />
        ))}
      </div>
    </div>
  </div>
)}




{/* Modal for Single Image Preview */}
{selectedImage && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="relative bg-white p-4 rounded-lg max-w-2xl w-full">
      <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white text-2xl">❌</button>
      <img src={selectedImage} alt="Preview" className="w-full max-h-[80vh] object-contain rounded-md" />
    </div>
  </div>
)}

{/* Modal to Show All Images */}
{showAllImages === post.id && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg max-w-4xl w-full relative">
      <button onClick={() => setShowAllImages(null)} className="absolute top-4 right-4 text-black text-4xl">❌</button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {post.images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt="Post" 
            className="w-full h-40 object-cover rounded-md cursor-pointer"
            onClick={() => setSelectedImage(img)} // Click to preview any image
          />
        ))}
      </div>
    </div>
  </div>
)}


        <p className="mt-2 text-gray-800">{post?.title}</p>

      
      </div>
    ))}
  </div>

  <ToastContainer position="top-right" autoClose={3000} />

    </div>
    
  )
}

export default DiscussTabSection