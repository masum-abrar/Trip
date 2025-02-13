'use client';

import { useState } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import Navbar from "@/app/components/Navbar";
import EventSection from '@/app/components/EventSection';

const DistrictPage = ({ params }) => {
  const districtName = params.districtName;
  const [showAllImages, setShowAllImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [activeTab, setActiveTab] = useState('Discussion');
  const [newPost, setNewPost] = useState({ text: '', images: [], place: '', subdistrict: '' });
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Rakib Hasan",
      text: "Beautiful sunset at the beach!",
      replies: [],
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s"], // Change `image` to `images`

      place: "Beach",
      subdistrict: "North",
      likes: 2,
      liked: false,
      comments: [
        { id: 1, user: "Raihan", text: "Wow, amazing view!", replies: [] },
        { id: 2, user: "Sakib", text: "I love this place!", replies: [] },
        { id: 3, user: "Rihan", text: "So peaceful!", replies: [] },
        { id: 4, user: "Saad", text: "Nature's beauty!", replies: [] },
      ],
      newComment: '',
      showAllComments: false,
    },
    {
      id: 2,
      user: "Sakib Hasan",
      text: "Visited a historical site today!",
      replies: [],
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s"], // Change `image` to `images`

      place: "Hill",
      subdistrict: "South",
      likes: 5,
      liked: false,
      comments: [
        { id: 5, user: "Rihan", text: "Looks great!", replies: [] },
        { id: 6, user: "Sohel", text: "I need to visit this!", replies: [] },
        { id: 7, user: "Omar", text: "History is fascinating.", replies: [] },
        { id: 8, user: "Imran", text: "Amazing architecture!", replies: [] },
      ],
      newComment: '',
      showAllComments: false,
    },
  ]);
  const handleImageChange = (e) => {
    if (!e.target.files) return;  // Ensure files exist
  
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
  
    setNewPost(prevState => ({
      ...prevState,
      images: [...(prevState.images || []), ...imageUrls]  // Ensure it's always an array
    }));
  };
  
  
  const removeImage = (index) => {
    setNewPost(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index)
    }));
  };
  
  
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

  const handlePost = () => {
    if (!newPost.text.trim() && newPost.images.length === 0) {
      alert("Please write something or add an image.");
      return;
    }
  
    const newPostData = {
      id: Date.now(),
      user: "User Name",
      text: newPost.text,
      images: [...(newPost.images || [])],  // Ensure images is an array
      comments: [],
      likes: 0,
      liked: false
    };
  
    setPosts([newPostData, ...posts]);
    setNewPost({ text: "", images: [], place: "" });  // Reset state after posting
  };
  

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      <div className="relative w-full h-64">
        <img src="https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" alt="District" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{districtName.charAt(0).toUpperCase() + districtName.slice(1)}</h1>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {['Discussion', 'Events', 'Places'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-[#8cc163] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 max-w-[750px] mx-auto">
      {activeTab === 'Discussion' && (
  <div className="space-y-6">
    {/* Post Input Section */}
    <div className="bg-white shadow-md rounded-xl p-4">
      <textarea
        className="w-full p-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="What's on your mind?"
        value={newPost.text}
        onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
      ></textarea>

      {/* Image Upload Section */}
      <div className="flex items-center justify-center gap-4 mt-3">
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

        {/* Preview Selected Images
        <div className="mt-3 grid grid-cols-3 gap-2">
          {newPost.images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Selected ${index}`} className="w-full h-20 object-cover rounded-md" />
              <button 
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div> */}

        {/* Place Selection */}
        <select
          value={newPost.place}
          onChange={(e) => setNewPost({ ...newPost, place: e.target.value })}
          className="border bg-white p-2 text-black rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Place</option>
          <option value="Beach">Beach</option>
          <option value="Hill">Hill</option>
        </select>

        {/* Post Button */}
        <button onClick={handlePost} className="bg-[#8cc163] text-white px-6 py-2 rounded-lg hover:bg-[#39c252]">
          Post
        </button>
      </div>
        {/* Preview Selected Images */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {newPost.images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Selected ${index}`} className="w-full h-20 object-cover rounded-md" />
              <button 
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
    </div>
    

    {/* Posts Display */}
    {posts.map((post) => (
      <div key={post.id} className="bg-white shadow-md rounded-xl p-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-gray-600" />
          <span className="font-semibold text-gray-800">{post.user}</span>
        </div>

{/* Display Multiple Images */}
{post.images && post.images.length > 0 && (
  <div className={`mt-2 ${post.images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2"} gap-2 relative`}>
    {post.images.slice(0, 4).map((img, index) => (
      <div key={index} className="relative">
        <img 
          src={img} 
          alt="Post" 
          className={`w-full ${post.images.length === 1 ? "h-56" : "h-40"} object-cover rounded-md cursor-pointer`}
          onClick={() => setSelectedImage(img)} // Click to preview
        />
        
        {/* Show overlay if more than 4 images */}
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


        <p className="mt-2 text-gray-800">{post.text}</p>

        {/* Like Button */}
        <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 mt-2 text-black">
          {post.liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {post.likes}
        </button>

        {/* Comments Section */}
        {post.comments.slice(0, post.showAllComments ? post.comments.length : 2).map(comment => (
          <div key={comment.id} className="ml-4 mt-2 bg-gray-100 p-2 rounded-md">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-xl text-black" />
              <p className="font-medium text-black">{comment.user}</p>
            </div>
            <p className='text-black'>{comment.text}</p>

            {/* Reply Button */}
            <button onClick={() => handleReplyToggle(post.id, comment.id)} className="text-blue-500 text-sm">Reply</button>

            {/* Reply Input */}
            {showReplyInput[comment.id] && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="border p-1 rounded-md flex-1"
                  value={replyTexts[comment.id] || ''}
                  onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
                />
                <FaPaperPlane className="text-[#8cc163] cursor-pointer" onClick={() => handleReply(post.id, comment.id)} />
              </div>
            )}

            {/* Display Replies */}
            {comment.replies.map(reply => (
              <div key={reply.id} className="ml-4 text-sm text-gray-600 flex items-center gap-1">
                <FaUserCircle className="text-sm text-gray-500" />
                <p>{reply.text}</p>
              </div>
            ))}
          </div>
        ))}

        {/* "See More" / "See Less" Button */}
        {post.comments.length > 2 && (
          <button
            onClick={() => toggleComments(post.id)}
            className="text-blue-500 text-sm mt-1"
          >
            {post.showAllComments ? "See Less" : "See More"}
          </button>
        )}

        {/* Add Comment Input */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={post.newComment}
            onChange={(e) => setPosts(posts.map(p => p.id === post.id ? { ...p, newComment: e.target.value } : p))}
            placeholder="Write a comment..."
            className="flex-1 w-36 p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button onClick={() => handleComment(post.id)} className="bg-[#8cc163] text-white px-4 py-1 rounded-md">
            Comment
          </button>
        </div>
      </div>
    ))}
  </div>
)}

           {/* //Events Tab Started// */}
        {activeTab === 'Events' && (
         <div>
          <EventSection/>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictPage;