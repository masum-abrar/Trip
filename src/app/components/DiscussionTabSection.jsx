'use client';

import { useState,useEffect } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane, FaCalendarAlt ,FaTrash,FaEllipsisH} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Cookies from "js-cookie";
import Link from 'next/link';
import Swal from "sweetalert2";


const DiscussTabSection = ({hidePlaceSelection , PostData}) => {
  const [openOptionPostId, setOpenOptionPostId] = useState(null);
  const [showAllImages, setShowAllImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllCommentsForPost, setShowAllCommentsForPost] = useState({});
 const [locationData, setLocationData] = useState(null);
  const [activeTab, setActiveTab] = useState('Discussion');
  const districtId = PostData?.id;
  const cookiesuserId = Cookies.get("userId");
  const [liked, setLiked] = useState(false);
   const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(false);
     const [userId, setUserId] = useState(null);
     const [isLoading, setIsLoading] = useState(true); // This can be managed at the page level
     const [visiblePosts, setVisiblePosts] = useState(10);


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
  //     const response = await fetch("https://parjatak-backend.vercel.app/api/v1/posts", {
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
          const response = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/divisions");
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
              `https://parjatak-backend.vercel.app/api/v1/customer/districts?division=${newPost.divisionId}`
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
        const districtId = PostData?.id;
        try {
          const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/places-by-district-id/${districtId}`);
          const data = await response.json();
          setPlaces(data.data);
        } catch (error) {
          console.error("Failed to fetch places:", error);
        }
      };
      fetchPlaces();
    }, [districtId]);
  
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
      formData.append("type", "discussion");
      formData.append("eventStartDate", "");
      formData.append("eventEndDate", "");
      formData.append("isActive", "true");
      formData.append("slug", "");
      
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });
    
      try {
        const response = await fetch("https://parjatak-backend.vercel.app/api/v1/posts", {
          method: "POST",
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Post created successfully:", data);
        toast.success("Post has been created");
        setNewPost({ text: "", images: [], placeId: "" }); // Reset the form
        fetchCommunity();
    
        // Step 2: Trigger Notification after successful post creation
        const notificationPayload = {
          userId: userId, // You can change this to the user who should receive the notification
          message: `New post created: ${newPost.text}`, // Customize the message as needed
          type: "post",  // Notification type (could be 'post', 'comment', etc.)
          link: `https://example.com`,  // Link to the newly created post
        };
    
        // Send notification to the backend API
        await fetch("https://parjatak-backend.vercel.app/api/v1/create-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationPayload),
        });
    
        console.log("Notification sent successfully");
    
      } catch (error) {
        console.error("Post creation failed:", error);
      }
    };
    

    
   useEffect(() => {
      const idFromCookie = Cookies.get("userId");
      if (idFromCookie) {
        setUserId(idFromCookie);
      }
    }, []);
  

    // Display the posts

    const fetchCommunity = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/districts-posts-discussion/${districtId}`);
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


      //Post Like and Unlike
      const handleLike = async (postId, postOwnerUserId) => {
        try {
          const userName = Cookies.get("userName"); 
      
          await fetch("https://parjatak-backend.vercel.app/api/v1/customer/create-post-like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              postId,
              userId: cookiesuserId,  
              parentUserId: null, 
            }),
          });
      
         
          await fetch("https://parjatak-backend.vercel.app/api/v1/create-notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: cookiesuserId, 
              message: `You liked a post.`,
              type: "activity",
              link: `/post/${postId}`,
            }),
          });
      
          
          await fetch("https://parjatak-backend.vercel.app/api/v1/create-notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: postOwnerUserId, 
             
              message: `${userName} liked your post.`,
              type: "notification",
              link: `/post/${postId}`,
            }),
          });
      
          // UI update
          setLiked((prev) => !prev);
          fetchCommunity();
      
        } catch (error) {
          console.error("Error liking post:", error);
        }
      };
      
    
      const handleUnlike = async (postId, parentUserId) => {
        try {
          const res = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/delete-post-like", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postId: postId,
              userId: cookiesuserId,
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









       const handleCommentChange = (postId, value) => {
          setComments(prev => ({
            ...prev,
            [postId]: value,
          }));
        };
      
        const handleCommentSubmit = async (postId , postOwnerUserId) => {
          const comment = comments[postId];
          if (!comment?.trim()) return;
          const userName = Cookies.get("userName");
        
          setLoading(true);
          try {
            const res = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment", {
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
        
           
            await fetch("https://parjatak-backend.vercel.app/api/v1/create-notification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: cookiesuserId, 
                message: `You Comment on a post.`,
                type: "activity",
                link: ``,
              }),
            });
        
            
            await fetch("https://parjatak-backend.vercel.app/api/v1/create-notification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: postOwnerUserId, 
               
                message: `${userName} liked your post.`,
                type: "notification",
                link: ``,
              }),
            });

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
            const res = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment-reply", {
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
           
            fetchCommunity() 
          } catch (error) {
            console.error("Reply failed:", error);
          }
        };
        
        const handleDeleteComment = async (commentId, postId, parentUserId) => {
          try {
            const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/delete-post-comment/${commentId}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                postId: postId,
                parentUserId: parentUserId,
                userId: cookiesuserId,
              }),
            });
            if (!res.ok) throw new Error("Failed to delete comment");
        
          toast.success("Comment deleted successfully!");
            // Update UI after delete korle valo hoy
            fetchCommunity() 
          } catch (error) {
            console.error("Error deleting comment:", error);
          }
        };
        
        const handleDeleteReply = async (replyId, postId, postCommentId, parentUserId) => {
          try {
            const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/delete-post-comment-reply/${replyId}`, {
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
        
           toast.success("Reply deleted successfully!");
            // Update UI after delete korle valo hoy
            fetchCommunity() 
          } catch (error) {
            console.error("Error deleting reply:", error);
          }
        };

        const handleDeletePost = async (postId) => {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: " you want to delete this post? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8cc163',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true, // Cancel left, Delete right (optional, looks modern)
          
            // 👇 Compact korar settings
            customClass: {
              popup: 'p-4 text-sm',     // Popup padding and text small
              title: 'text-base',        // Title font small
              confirmButton: 'py-1 px-3 text-sm', // Confirm button chhoto
              cancelButton: 'py-1 px-3 text-sm',  // Cancel button chhoto
              content: 'text-sm',        // Content text chhoto
            },
            width: '320px', // 👈 Make the modal smaller
          });
          
        
          if (result.isConfirmed) {
            try {
              const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/posts/${postId}`, {
                method: "DELETE",
              });
        
              if (!res.ok) throw new Error("Failed to delete post");
        
              Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
              fetchCommunity() 
            } catch (error) {
              console.error("Error deleting post:", error);
              Swal.fire('Error!', 'Something went wrong.', 'error');
            }
          }
        };
        
        
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
      {places?.map((place) => (
        <option key={place.id} value={place.id}>
          {place.name}
        </option>
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
    <Link key={post.id} href={`/PostDetails/${post.id}`} className="bg-white shadow-md rounded-xl p-4 mb-4 block">
    <div key={post.id} className="bg-white shadow-md rounded-xl p-4">
    
    <div className="flex items-center justify-between mb-2 relative">
  <Link href={`/userprofile/${post.userId}`} className="flex items-center gap-2">
    <FaUserCircle className="text-2xl text-gray-600" />
    <span className="font-semibold text-gray-800">{post?.user?.name}</span>
  </Link>

  {post.user.id === cookiesuserId && (
    <div className="relative">
      <button
        onClick={() =>
          setOpenOptionPostId(openOptionPostId === post.id ? null : post.id)
        }
        className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
      >
        <FaEllipsisH className="text-gray-600 text-lg" />
      </button>

      {/* Show Options only if clicked post id matches */}
      {openOptionPostId === post.id && (
        <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg z-20 overflow-hidden animate-fadeIn">
          <button
            onClick={() => {
              handleDeletePost(post.id);
              setOpenOptionPostId(null);
            }}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-100 w-full text-sm transition-all"
          >
            <FaTrash />
            <span>Delete Post</span>
          </button>
        </div>
      )}
    </div>
  )}
</div>

   
    
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



{/* Like Button */}
            <button  className="flex items-center gap-1 text-black mt-2" >
{post.like.some(like => like.user?.id === cookiesuserId) ? (
  <FaHeart 
    className="text-red-500 cursor-pointer"
    onClick={() => handleUnlike(post.id, post.user?.id)} 
  />
) : (
  <FaRegHeart 
    className="cursor-pointer"
    onClick={() => handleLike(post.id , post.user?.id)}
  />
)}

{post.like.length}
</button>


        {/* Add Comment Input */}
        <div
  className="flex items-center gap-2 mt-2"
  onClick={(e) => {
    e.stopPropagation(); // stop bubbling up
    e.preventDefault();  // stop navigation
  }}
>
  <input
    type="text"
    value={comments[post.id] || ""}
    onChange={(e) => handleCommentChange(post.id, e.target.value)}
    placeholder="Write a comment..."
    className="flex-1 w-36 p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-400 bg-white"
  />
  <button
    onClick={() => handleCommentSubmit(post.id , post.user?.id)}
    disabled={loading || !userId}
    className="bg-[#8cc163] text-white px-4 py-1 rounded-md"
  >
    Comment
  </button>
</div>

        {/* Display Comments */}
      
        <div>

      
{/* Slice logic: only show 2 unless showAllComments is true */}
<div
 onClick={(e) => {
  e.stopPropagation(); // stop bubbling up
  e.preventDefault();  // stop navigation
}}
>
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

<div>
  
</div>
    </div>
    </Link>
    
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

export default DiscussTabSection