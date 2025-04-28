import React, { useState } from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { FaStar, FaRegStar, FaHeart, FaRegHeart ,FaPaperPlane,FaImage ,FaTrashAlt} from "react-icons/fa";
import { AiOutlineUpload } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ToastContainer } from 'react-toastify';
import Link from "next/link";


const ReviewsTabSection = ({locationData}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "", privacy: "Public", images: [], replies: [], likes: 0 ,user :["User"]});
  const [reviews, setReviews] = useState([
    { id: 1, user: "Abrar Ramin", rating: 7, comment: "Amazing place! Highly recommended.", images: [], replies: [], likes: 12, isReplying: false },
    
  ]);
  const [sortOption, setSortOption] = useState("Most Recent");
  const [replyText, setReplyText] = useState({}); // Track reply input for each review

  // Handle sorting
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "Most Liked") return b.likes - a.likes;
    if (sortOption === "Oldest") return a.id - b.id;
    return b.id - a.id;
  });

  // Handle Review Submission
  // const handleReviewSubmit = () => {
  //   setReviews([{ ...newReview, id: reviews.length + 1 }, ...reviews]);
  //   setNewReview({ rating: 0, comment: "", privacy: "Public", images: [], replies: [], likes: 0 });
  //   setIsModalOpen(false);
  // };

  // Handle Like
  const toggleLike = (id) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, likes: review.likes + 1 } : review)));
  };

  // Handle Reply
  const toggleReplyBox = (id) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, isReplying: !review.isReplying } : review)));
  };

  const submitReply = (id) => {
    if (!replyText[id]) return;
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, replies: [...review.replies, { user: "You", comment: replyText[id] }], isReplying: false } : review
      )
    );
    setReplyText({ ...replyText, [id]: "" });
  };

  //NewCode

  const handleReviewSubmit = async () => {
    try {
      const userId = Cookies.get("userId");
      if (!userId) {
        toast.error("User not logged in!");
        return;
      }
  
      const payload = {
        placeId: locationData?.id,
        userId,
        rating: newReview.rating,
        comment: newReview.comment,
      };
  
      const res = await fetch("https://parjatak-core.vercel.app/api/v1/customer/create-place-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error("Failed to submit review");
  
      toast.success("✅ You have reviewed this place!");
      setIsModalOpen(false);
      setNewReview({ rating: 0, comment: "", images: [] });
  
      // Optionally reload reviews
      
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to submit review");
    }
  };
  const handleDeleteReview = async (reviewId) => {
    const userId = Cookies.get("userId"); // Current user's ID
    const accessToken = Cookies.get("token"); // JWT Token
  
    if (!userId || !accessToken) {
      toast.error("User not authenticated!");
      return;
    }
  
    try {
      const response = await fetch(`https://parjatak-core.vercel.app/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success("Review deleted successfully!");
        // Optionally, update the state to reflect the deletion (e.g., remove the review from the list)
        // For example: setLocationData(prevData => ({ ...prevData, review: prevData.review.filter(r => r.id !== reviewId) }));
      } else {
        toast.error(data.message || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("An error occurred while deleting the review.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">

      {/* Reviews List */}
      <div className="space-y-4">
    {locationData?.review?.map((review, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-3">
          <Avatar />
          <div>
           <Link href={`/userprofile/${review.user.id}`} className="text-blue-500 hover:underline">
           <h3 className="font-semibold text-gray-900">{review.user.name || "Anonymous"}</h3>
           </Link>
            <div className="flex">
              {[...Array(10)].map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} className="text-yellow-500" />
                ) : (
                  <FaRegStar key={i} className="text-gray-300" />
                )
              )}
            </div>
          </div>
          
          {/* Delete button */}
          {review.user.id === Cookies.get("userId") && (
            <button
              onClick={() => handleDeleteReview(review.id)}
              className="text-red-500 hover:text-red-700 ml-28"
              aria-label="Delete review"
            >
              <FaTrashAlt />
            </button>
          )}
        </div>

        {/* Review Content */}
        <p className="text-gray-700 mt-2">{review.comment}</p>
      </div>
    ))}
  </div>


   
     <div className="flex justify-end mt-6 mb-10">
  <button onClick={() => setIsModalOpen(true)} className="bg-[#8cc163] text-white px-4 py-2 rounded-md">
    ✍️ Write a Review
  </button>
</div>


      {/* Review Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Your Review</DialogTitle>
        <DialogContent>
          {/* Star Rating */}
          <div className="flex space-x-1">
            {[...Array(10)].map((_, index) => (
              <IconButton key={index} onClick={() => setNewReview({ ...newReview, rating: index + 1 })}>
                {index < newReview.rating ? <FaStar className="text-yellow-500 text-xl" /> : <FaRegStar className="text-gray-300 text-sm" />}
              </IconButton>
            ))}
          </div>

          {/* Review Input */}
          <TextField
            multiline
            rows={3}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Write your review..."
            className="bg-white"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />

        
        {/* Image Upload */}
        <div className="mt-3 ">
        <Button sx={{
        backgroundColor: "#8cc163",
        color: "white",
        "&:hover": {
          backgroundColor: "#7aad58", // Slightly darker green on hover
        },
      }} component="label" startIcon={<FaImage /> }>
              Upload Images
              <input type="file" hidden multiple onChange={(e) => setNewReview({ ...newReview, images: [...e.target.files].slice(0, 7) })} />
            </Button> 

            <p className="text-xs text-gray-500 mt-1">Max 7 images</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <button onClick={handleReviewSubmit} className="bg-[#8cc163] px-4 py-2 text-white rounded-md" >
            ✅ Submit
          </button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
};

export default ReviewsTabSection;
