'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const PopularReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // First e 6 ta dekhabe
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/popular-place-reviews");
        const result = await res.json();
        setReviews(result?.data || []);
      } catch (err) {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3); // Protibar 3 ta kore barabe
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container max-w-5xl mx-auto mt-20 p-3">
      <div className="">
        <div className="w-full">
          <div className="flex justify-between text-gray-400 mb-4">
            <h1 className="text-sm lg:text-lg font-bold">POPULAR REVIEWS </h1>
            <p className="cursor-pointer hover:underline">More</p>
          </div>
          <hr className="border-t border-gray-400 mb-6" />

          {/* Loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-full h-[380px] p-3 rounded-lg shadow-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleReviews.map((review) => (
                  <Link key={review.id} href={``} className="block">
                    <div className="w-full h-[380px] p-3 rounded-lg shadow-lg hover:shadow-2xl transition mb-4 bg-white">
                      <div className="mb-4">
                        <img
                          src={review.place?.images?.[0]?.image || "https://via.placeholder.com/300"}
                          alt={review.place?.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <h2 className="text-black font-bold text-lg truncate">
                            {review.place?.name || "Unknown Place"}
                          </h2>

                          <Link href={`/userprofile/${review.user?.id}`}>
                            <div className="flex items-center text-gray-400 text-sm mt-2 cursor-pointer">
                              <img
                                src={review.user?.image || "https://via.placeholder.com/50"}
                                alt={review.user?.name}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-black">{review.user?.name}</span>
                            </div>
                          </Link>

                          <p className="text-gray-400 text-sm mt-2">
                            ⭐ {review.rating} &nbsp; 
                            👀 {review.place.viewCount || 0} &nbsp; 🗨️ {review.comment?.length || 0}
                          </p>

                          <p className="text-black mt-2 line-clamp-3">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < reviews.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-[#8cc163] hover:bg-green-600 text-white rounded-lg transition"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularReviews;
