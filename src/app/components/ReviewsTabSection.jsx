import React, { useState, useEffect } from "react";

import {
  FaStar,
  FaRegStar,
  FaImage,
  FaTrashAlt,
} from "react-icons/fa";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ReviewsTabSection = ({ locationData, setReviews, isLoading }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const reviews = locationData?.review || [];

  const handleDeleteReview = async (reviewId) => {
    const userId = Cookies.get("userId");
    const accessToken = Cookies.get("token");

    if (!userId || !accessToken) {
      toast.error("User not authenticated!");
      return;
    }

    setDeletingId(reviewId);

    try {
      const response = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/delete-place-review/${reviewId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Review deleted successfully!", {
          duration: 1500,
        });
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } else {
        toast.error(data.message || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("An error occurred while deleting the review.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 mb-4">
      {/* Reviews List */}
      <div className="space-y-4">
        {/* ✅ Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#8cc163] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div
              key={review.id || index}
              className="bg-white p-4 rounded-lg shadow-md relative"
            >
              {/* Delete Loading Overlay */}
              {deletingId === review.id && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg z-10">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Link
                  href={`/userprofile/${review.user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  <img
                    src={review?.user?.image || "/default-avatar.png"}
                    alt={review?.user?.name || "User Avatar"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <Link
                    href={`/userprofile/${review.user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {review.user.name || "Anonymous"}
                    </h3>
                  </Link>
                  <div className="flex">
                    {[...Array(10)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} className="text-yellow-500 text-sm" />
                      ) : (
                        <FaRegStar key={i} className="text-gray-300 text-sm" />
                      )
                    )}
                  </div>
                </div>

                {review.user.id === Cookies.get("userId") && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={deletingId === review.id}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Delete review"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 mt-2">{review.comment}</p>

              {/* Review Images */}
              {review.images?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {review.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.image || img}
                      alt={`review-img-${i}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsTabSection;

