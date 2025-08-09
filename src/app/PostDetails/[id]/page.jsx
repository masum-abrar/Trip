'use client';
import React, { useEffect, useState } from 'react';
import { FaImage, FaRegHeart, FaHeart, FaUserCircle, FaPaperPlane, FaCalendarAlt, FaTrash, FaEllipsisH } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Cookies from "js-cookie";
import Link from 'next/link';
import Swal from "sweetalert2";
import Navbar from '@/app/components/Navbar';
import { use } from 'react';
const Page = ({ params }) => {
  const resolvedParams = use(params);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeReplyInput, setActiveReplyInput] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [openOptionPostId, setOpenOptionPostId] = useState(null);
  const userId = Cookies.get('userId');
  const userName = Cookies.get('userName');
  const userImage = Cookies.get('userImage');

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`);
        const data = await res.json();
        setPost(data.data);
        
        // Check if current user has liked the post
        if (userId && data.data?.likes?.some(like => like.userId === userId)) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    fetchPost();
  }, [resolvedParams.id, userId]);

  const handleCommentChange = (postId, value) => {
    setComments(prev => ({ ...prev, [postId]: value }));
  };

  const handleReplyChange = (commentId, value) => {
    setReplyTexts(prev => ({ ...prev, [commentId]: value }));
  };

  const handleCommentSubmit = async (postId, postOwnerId) => {
    const comment = comments[postId];
    if (!comment?.trim()) return;

    setLoading(true);
    try {
      await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userId, parentUserId: null, comment }),
      });
      toast.success('Comment posted!');
      setComments(prev => ({ ...prev, [postId]: '' }));

      // Notifications
      await fetch(`https://parjatak-backend.vercel.app/api/v1/create-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          message: `You commented on a post.`,
          type: 'activity',
          link: `/post/${postId}`,
        }),
      });

      await fetch(`https://parjatak-backend.vercel.app/api/v1/create-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: postOwnerId,
          message: `${userName} commented on your post.`,
          type: 'notification',
          link: `/post/${postId}`,
        }),
      });

      // Refetch post
      const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`);
      const data = await res.json();
      setPost(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (postId, commentId, parentUserId) => {
    const reply = replyTexts[commentId];
    if (!reply?.trim()) return;

    setLoading(true);
    try {
      await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, postCommentId: commentId, parentUserId, userId, reply }),
      });
      toast.success('Reply posted!');
      setReplyTexts(prev => ({ ...prev, [commentId]: '' }));
      setActiveReplyInput(null);

      const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`);
      const data = await res.json();
      setPost(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId, postOwnerUserId) => {
    try {
      await fetch("https://parjatak-backend.vercel.app/api/v1/customer/create-post-like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId,
          parentUserId: null,
        }),
      });

      await fetch("https://parjatak-backend.vercel.app/api/v1/create-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
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

      setLiked(true);
      // Refetch post to update like count
      const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`);
      const data = await res.json();
      setPost(data.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const res = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/delete-post-like", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          userId: userId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to unlike the post");
      }

      setLiked(false);
      // Refetch post to update like count
      const res2 = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`);
      const data = await res2.json();
      setPost(data.data);
    } catch (error) {
      console.error("Error unliking post:", error);
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
          userId: userId,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");

      toast.success("Comment deleted successfully!");
      // Refetch post
      const res2 = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`);
      const data = await res2.json();
      setPost(data.data);
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
          userId: userId,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete reply");

      toast.success("Reply deleted successfully!");
      // Refetch post
      const res2 = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`);
      const data = await res2.json();
      setPost(data.data);
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this post?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8cc163',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
      customClass: {
        popup: 'p-4 text-sm',
        title: 'text-base',
        confirmButton: 'py-1 px-3 text-sm',
        cancelButton: 'py-1 px-3 text-sm',
        content: 'text-sm',
      },
      width: '320px',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/posts/${postId}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete post");

        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        // Redirect or handle post deletion
        window.location.href = '/community'; // Or wherever you want to redirect
      } catch (error) {
        console.error("Error deleting post:", error);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };



  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Navbar />
        <div className="bg-white shadow-md rounded-xl p-4 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
            </div>
          </div>
          <div className="w-full h-6 bg-gray-300 rounded-md mb-4"></div>
          <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
          <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
          <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
        </div>
      </div>
    );
  }

  return (
   <>
   <div className='bg-white shadow-md '>
     <Navbar />
   </div>
    <div className="max-w-3xl mx-auto px-4 py-6">
     
      
      {/* Post Info */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href={`/userprofile/${post.user?.id}`}>
              <img
                src={post.user?.image || '/default-user.png'}
                alt="author"
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link href={`/userprofile/${post.user?.id}`} className="font-medium hover:underline">
                {post.user?.name || 'Anonymous'}
              </Link>
              {/* <p className="text-xs text-gray-500">{post.place?.name}</p> */}
            </div>
          </div>

          {post.user?.id === userId && (
            <div className="relative">
              <button
                onClick={() => setOpenOptionPostId(openOptionPostId === post.id ? null : post.id)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FaEllipsisH className="text-gray-600" />
              </button>

              {openOptionPostId === post.id && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg z-20 overflow-hidden">
                  <button
                    onClick={() => {
                      handleDeletePost(post.id);
                      setOpenOptionPostId(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm"
                  >
                    <FaTrash />
                    <span>Delete Post</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Post Images */}
        {post.images?.length > 0 && (
          <div className={`mb-4 ${post.images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2"} gap-2`}>
            {post.images.slice(0, 4).map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.image}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(img.image)}
                />
                {index === 3 && post.images.length > 4 && (
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg cursor-pointer"
                    onClick={() => setShowAllImages(true)}
                  >
                    <span className="text-white text-lg font-semibold">+{post.images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <h1 className="text-2xl font-bold mb-2">{post.title || 'Untitled'}</h1>
        <p className="text-gray-600 mb-4">{post.description}</p>

        {/* Like and Comment Count */}
        <div className="flex items-center gap-4 border-t border-b py-2 mb-4">
          <button 
            onClick={() => {
              if (liked) {
                handleUnlike(post.id);
              } else {
                handleLike(post.id, post.user?.id);
              }
            }}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-500"
          >
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
            <span>{post.like?.length || 0}</span>
          </button>
          <div className="flex items-center gap-1 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.comment?.length || 0}</span>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-2 mb-6">
         
          <input
            type="text"
            value={comments[post.id] || ''}
            onChange={(e) => handleCommentChange(post.id, e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={() => handleCommentSubmit(post.id, post.user?.id)}
            disabled={loading || !userId}
            className="bg-[#8cc163] text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Comment'}
          </button>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          {post.comment?.slice(0, showAllComments ? post.comment.length : 3).map((comment) => (
            <div key={comment.id} className="border-l-2 border-gray-200 pl-3">
              <div className="flex gap-2 items-start">
                <Link href={`/userprofile/${comment.user?.id}`}>
                  <img
                    src={comment.user?.image || '/default-user.png'}
                    alt={comment.user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <div className="bg-gray-50 px-3 py-2 rounded-md">
                    <div className="flex justify-between items-center">
                      <Link href={`/userprofile/${comment.user?.id}`} className="font-medium text-sm hover:underline">
                        {comment.user?.name || 'Anonymous'}
                      </Link>
                      {(comment.user?.id === userId || post.user?.id === userId) && (
                        <button
                          onClick={() => handleDeleteComment(comment.id, post.id, comment.user?.id)}
                          className="text-red-500 text-sm"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{comment.comment}</p>
                  </div>

                  <button
                    className="text-xs text-blue-600 mt-1 ml-2"
                    onClick={() => setActiveReplyInput(activeReplyInput === comment.id ? null : comment.id)}
                  >
                    Reply
                  </button>

                  {/* Reply Input */}
                  {activeReplyInput === comment.id && (
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <img
                        src={userImage || '/default-user.png'}
                        alt="Your profile"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <input
                        type="text"
                        value={replyTexts[comment.id] || ''}
                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 bg-white"
                      />
                      <button
                        onClick={() => handleReplySubmit(post.id, comment.id, comment.user?.id)}
                        disabled={loading}
                        className="bg-[#8cc163] text-white px-3 py-1 rounded-md text-sm"
                      >
                        {loading ? 'Posting...' : 'Reply'}
                      </button>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.reply?.map((reply) => (
                    <div key={reply.id} className="flex gap-2 items-start mt-3 ml-4">
                      <Link href={`/userprofile/${reply.user?.id}`}>
                        <img
                          src={reply.user?.image || '/default-user.png'}
                          alt={reply.user?.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="bg-white border-l-2 border-[#8cc163] px-3 py-1 rounded-md">
                          <div className="flex justify-between items-center">
                            <Link href={`/userprofile/${reply.user?.id}`} className="text-xs font-medium hover:underline">
                              {reply.user?.name || 'Anonymous'}
                            </Link>
                            {(reply.user?.id === userId || post.user?.id === userId) && (
                              <button
                                onClick={() => handleDeleteReply(reply.id, post.id, comment.id, reply.user?.id)}
                                className="text-red-500 text-xs"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-gray-700">{reply.reply}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {post.comment?.length > 3 && (
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-blue-600 text-sm"
            >
              {showAllComments ? 'Show fewer comments' : `View all ${post.comment.length} comments`}
            </button>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full">
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full max-h-[80vh] object-contain rounded-md" 
            />
          </div>
        </div>
      )}

      {/* All Images Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
            <button 
              onClick={() => setShowAllImages(false)} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {post.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.image}
                  alt="Post"
                  className="w-full h-40 object-cover rounded-md cursor-pointer"
                  onClick={() => {
                    setSelectedImage(img.image);
                    setShowAllImages(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
   
   
   </>
  );
};

export default Page;