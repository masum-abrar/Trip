'use client';

import { useState,useEffect } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane, FaCalendarAlt ,FaTrash} from 'react-icons/fa';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const EventTabSection = ({ hidePlaceSelection , PostData  }) => {
  const router = useRouter();
  const [showAllImages, setShowAllImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
 const [locationData, setLocationData] = useState(null);
  const [activeTab, setActiveTab] = useState('Discussion');
  const [comments, setComments] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState({});
const [replyTexts, setReplyTexts] = useState({});
const cookiesuserId = Cookies.get("userId");
const [liked, setLiked] = useState(false);
 const [places, setPlaces] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [visiblePosts, setVisiblePosts] = useState(10);
   const [showAllCommentsForPost, setShowAllCommentsForPost] = useState({});


const districtId = PostData?.id;
  // const [newPost, setNewPost] = useState({ text: '', images: [], place: '', startDate: "", endDate: "", subdistrict: '' });
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
  const isLiked =
  Array.isArray(locationData?.like) &&
  locationData.like.some((like) => like.user?.id === cookiesuserId);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("https://parjatak-core.vercel.app/api/v1/places");
        const data = await response.json();
        setPlaces(data.data); // API structure onujayi 'data' array access kortesi
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);
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
  
  
  

  // const handleReplyToggle = (postId, commentId) => {
  //   setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  // };



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
  const [newPost, setNewPost] = useState({
    
    text: "",
    divisionId: "",
    districtId: "",
    placeId: "",
    startDate: "",
    endDate: "",
    images: [],
  });
   const [divisions, setDivisions] = useState([]);
     const [districts, setDistricts] = useState([]);
    //  const [places, setPlaces] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

  //new code

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
       
        const userId = Cookies.get("userId");
    
        const formData = new FormData();
    
        formData.append("userId", userId);
      formData.append("divisionId", PostData.division.id);
      formData.append("districtId", PostData.id); 
      formData.append("placeId", newPost.placeId);
      formData.append("title", newPost.text);
      formData.append("description", newPost.text);
      formData.append("type", "event");
      formData.append("eventStartDate", newPost.startDate || "");
      formData.append("eventEndDate", newPost.endDate || "");
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
          router.refresh();
          fetchCommunity() // Refresh the page or fetch new posts
        } catch (error) {
          console.error("Post creation failed:", error);
        }
      }

       useEffect(() => {
    const idFromCookie = Cookies.get("userId");
    if (idFromCookie) {
      setUserId(idFromCookie);
    }
  }, []);


  const handleCommentChange = (postId, value) => {
    setComments(prev => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const comment = comments[postId];
    if (!comment?.trim()) return;
  
    setLoading(true);
    try {
      const res = await fetch("https://parjatak-core.vercel.app/api/v1/customer/create-post-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          parentUserId: null,
          userId,
          comment,
        }),
      });
  
      const data = await res.json();
      toast.success("Comment posted successfully!");
  
     
      setComments(prev => ({
        ...prev,
        [postId]: "",
      }));
  
      // ✅ Refresh server-rendered data (like updated comments)
      router.refresh();
      fetchCommunity() 
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleReplyToggle = (commentId) => {
    setShowReplyInput(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  
  
 

  const handleToggleAllComments = (postId) => {
    setShowAllCommentsForPost(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  
  const handleReply = async (postId, commentId, parentUserId) => {
    const reply = replyTexts[commentId];
    if (!reply?.trim()) return;
  
    try {
      const res = await fetch("https://parjatak-core.vercel.app/api/v1/customer/create-post-comment-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          postCommentId: commentId,
          parentUserId,
          userId,
          reply
        }),
      });
  
      const data = await res.json();
      toast.success("Reply posted successfully!");
  
      setReplyTexts(prev => ({ ...prev, [commentId]: "" }));
      setShowReplyInput(prev => ({ ...prev, [commentId]: false }));
      router.refresh(); 
      fetchCommunity() 
    } catch (error) {
      console.error("Reply failed:", error);
    }
  };
  

    // Display the posts
    const fetchCommunity = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/districts-posts-event/${districtId}`);
        const data = await response.json();
        setLocationData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch community:', error);
      }
    };

    useEffect(() => {
    
    
      if (districtId) {
        fetchCommunity();
      }
    }, [districtId]);



     // Check if current user already liked the post
    //  useEffect(() => {
    //   if (locationData?.like?.some((like) => like.user.id == userId)) {
    //     setLiked(true);
    //   }
    // }, [locationData?.like, userId]);

  const handleLike = async (postId) => {
    try {
      await fetch("https://parjatak-core.vercel.app/api/v1/customer/create-post-like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId: cookiesuserId,
          parentUserId: null,
        }),
      });

      // Toggle like state (optional — for instant UI feedback)
      setLiked((prev) => !prev);
      
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

const handleUnlike = async (postId, parentUserId) => {
  try {
    const res = await fetch("https://parjatak-core.vercel.app/api/v1/customer/delete-post-like", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: cookiesuserId,
        parentUserId: parentUserId,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to unlike the post");
    }

    console.log("Successfully unliked the post");
  } catch (error) {
    console.error("Error unliking post:", error);
  }
};

  
const handleDeleteComment = async (commentId, postId, parentUserId) => {
  try {
    const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/delete-post-comment/${commentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: postId,
        parentUserId: parentUserId,
        userId: cookiesuserId,
      }),
    });
    if (!res.ok) throw new Error("Failed to delete comment");

    toast.success("Comment deleted successfully");
    // Update UI after delete korle valo hoy
    fetchCommunity() 
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

const handleDeleteReply = async (replyId, postId, postCommentId, parentUserId) => {
  try {
    const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/delete-post-comment-reply/${replyId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: postId,
        postCommentId: postCommentId,
        parentUserId: parentUserId,
        userId: cookiesuserId,
      }),
    });
    if (!res.ok) throw new Error("Failed to delete reply");

    toast.success("Reply deleted successfully");
    // Update UI after delete korle valo hoy
    fetchCommunity() 
  } catch (error) {
    console.error("Error deleting reply:", error);
  }
};
  
  
  return (
    <div>
        <div className="space-y-6">
          {/* Post Input Section */}
          <form
  onSubmit={(e) => {
    e.preventDefault();
    handlePost(); // your existing post handler
  }}
  className="bg-white shadow-md rounded-xl p-4"
>
  <textarea
    className="w-full p-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="What's on your mind?"
    value={newPost.text}
    onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
  ></textarea>

  {/* Start Date & End Date */}
  <div className="flex flex-col lg:flex-row gap-4 mt-3">
    {/* Start Date */}
    <div className="w-full">
      <label className="block text-gray-700 mb-1">Start Date</label>
      <div className="relative">
        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="date"
          className="w-full p-2 pl-10 border bg-white text-black rounded-md focus:ring-2 focus:ring-blue-400"
          value={newPost.startDate}
          onChange={(e) => setNewPost({ ...newPost, startDate: e.target.value })}
        />
      </div>
    </div>

    {/* End Date */}
    <div className="w-full">
      <label className="block text-gray-700 mb-1">End Date</label>
      <div className="relative">
        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="date"
          className="w-full p-2 pl-10 border bg-white text-black rounded-md focus:ring-2 focus:ring-blue-400"
          value={newPost.endDate}
          onChange={(e) => setNewPost({ ...newPost, endDate: e.target.value })}
        />
      </div>
    </div>
  </div>

  {/* Image Upload and Place Selection */}
  <div className="flex items-center justify-center gap-4 mt-6">
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

    {/* Place Selection */}
    {!hidePlaceSelection && (
      <select
      value={newPost.placeId}
      onChange={(e) => setNewPost({ ...newPost, placeId: e.target.value })}
      className="border bg-white p-2 text-black rounded-md"
    >
      <option value="">Select Place</option>
      {places?.map((place) => (
        <option key={place.id} value={place.id}>
          {place.name}
        </option>
      ))}
    </select>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-[#8cc163] text-white px-6 py-2 rounded-lg hover:bg-[#39c252]"
    >
      Post
    </button>
  </div>

  {/* Image Preview */}
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
          {isLoading ? (
  <div className="bg-white shadow-md rounded-xl p-4 animate-pulse">
    {/* Skeleton for User Info */}
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
      </div>

      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
    </div>

    {/* Skeleton for Post Title */}
    <div className="w-full h-6 bg-gray-300 rounded-md mb-4"></div>

    {/* Skeleton for Images */}
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="w-full h-40 bg-gray-300 rounded-md"></div>
      ))}
    </div>

    {/* Skeleton for Like Button */}
    <div className="w-20 h-6 bg-gray-300 rounded-md mt-2"></div>

    {/* Skeleton for Comment Section */}
    <div className="w-full h-6 bg-gray-300 rounded-md mt-2"></div>
  </div>
) : (
  // Render actual post content when not loading
  locationData?.slice(0, visiblePosts).map((post) => (
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
  
  
          <p className="mt-2 text-gray-800">{post.title}</p>

          <div className="flex justify-between items-center text-gray-700 mt-4 mb-4">
{/* Start Date */}
<div className="flex items-center gap-1 sm:gap-2 bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">
<FaCalendarAlt className="text-green-500 text-sm sm:text-base" />
<span className="font-medium">Start: {post.eventStartDate}</span>
</div>

{/* End Date - Pushed to Extreme Right */}
<div className="flex items-center gap-1 sm:gap-2 bg-red-100 text-red-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ml-auto">
<FaCalendarAlt className="text-red-500 text-sm sm:text-base" />
<span className="font-medium">End: {post.evenetEndDate}</span>
</div>
</div>



          {/* Like Button */}
          <button className="flex items-center gap-1 text-black mt-2">
{post.like.some(like => like.user?.id === cookiesuserId) ? (
<FaHeart 
  className="text-red-500 cursor-pointer"
  onClick={() => handleUnlike(post.id, post.user?.id)}
/>
) : (
<FaRegHeart 
  className="cursor-pointer"
  onClick={() => handleLike(post.id)}
/>
)}

{post.like.length}
</button>



  
         
  
          {/* Add Comment Input */}
          <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={comments[post.id] || ""}
          onChange={(e) => handleCommentChange(post.id, e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 w-36 p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-400 bg-white"
        />
        <button
          onClick={() => handleCommentSubmit(post.id)}
          disabled={loading || !userId}
          className="bg-[#8cc163] text-white px-4 py-1 rounded-md"
        >
          {loading ? "Posting..." : "Comment"}
        </button>
      </div>
      {/* Display Comments */}
    
 <div>
  {(post.comment.slice(0, showAllCommentsForPost[post.id] ? post.comment.length : 2)).map((comment) => (
    <div key={comment.id} className="flex flex-col gap-1 mt-2 ml-4 bg-gray-100 p-2 rounded-md">
      
      <div className="flex justify-between items-center mb-2">
        <Link href={`/userprofile/${comment.user.id}`} className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-xl text-gray-600" />
            <span className="font-semibold text-gray-800">{comment.user.name}</span>
          </div>
        </Link>

        {/* Comment Delete Icon */}
        {(comment.user.id === cookiesuserId || post.userId === cookiesuserId) && (
  <FaTrash
    className="text-red-500 cursor-pointer text-sm"
    onClick={() => handleDeleteComment(comment.id, post.id, comment.user.id)}
  />
)}

      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-700 ml-7">{comment.comment}</p>

        {/* Reply Button */}
        <button
          onClick={() => handleReplyToggle(comment.id)}
          className="text-blue-500 text-sm mr-3"
        >
          Reply
        </button>
      </div>

      {/* Replies Section */}
      {comment.reply?.length > 0 && (
        <div className="mt-2">
          {comment.reply.map((reply) => (
            <div key={reply.id} className="flex flex-col gap-1 mt-1 bg-white p-2 rounded-md border-l-4 border-[#8cc163] w-full">
              <div className="flex justify-between items-center">
                <Link href={`/userprofile/${reply.user.id}`} className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={reply.user?.image || "https://cdn-icons-png.flaticon.com/512/9368/9368192.png"}
                      alt={reply.user?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-800">{reply.user?.name}</span>
                  </div>
                </Link>

                {/* Reply Delete Icon */}
                {(reply.user.id === cookiesuserId || post.userId === cookiesuserId) && (
  <FaTrash
    className="text-red-500 cursor-pointer text-sm mr-2"
    onClick={() => handleDeleteReply(reply.id, post.id, comment.id, reply.user.id)}
  />
)}

              </div>

              <p className="ml-7 text-sm text-gray-700">{reply.reply}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply Input Box */}
      {showReplyInput[comment.id] && (
        <div className="flex items-center gap-2 mt-1 ml-7">
          <input
            type="text"
            placeholder="Write a reply..."
            className="border p-1 rounded-md flex-1 text-black"
            value={replyTexts[comment.id] || ''}
            onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
          />
          <FaPaperPlane
            className="text-[#8cc163] cursor-pointer"
            onClick={() => handleReply(post.id, comment.id, comment.user.id)}
          />
        </div>
      )}

    </div>
  ))}

  {/* Only show the button if there are more than 2 comments */}
  {post.comment.length > 2 && (
    <button
      onClick={() => handleToggleAllComments(post.id)}
      className="ml-4 text-blue-600 text-sm mt-1"
    >
      {showAllCommentsForPost[post.id] ? "Show Less" : "View All Comments"}
    </button>
  )}
</div>


        </div>
  ))
)}

        </div>

        <ToastContainer position="top-right" autoClose={3000} />
        {visiblePosts < locationData?.length && (
  <div className="text-center mt-4">
    <button
      onClick={() => setVisiblePosts(visiblePosts + 10)}
      className="px-4 py-2 bg-[#8cc163] text-white rounded-md"
    >
      See More
    </button>
  </div>
)}

    </div>
  )
}

export default EventTabSection