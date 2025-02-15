import React, { useState } from "react";
import { FaUserCircle, FaReply, FaStar,FaPaperPlane } from "react-icons/fa";

const places = [
  {
    id: 1,
    name: "Cox's Bazar",
    image: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg",
    rating: 4.5,
    reviews: [
      { id: 101, user: "Raihan", text: "Amazing place! The beach is stunning.", images: [], rating: 8, replies: [] },
      { id: 102, user: "Lamia" ,text: "Loved the sunset view.", images: [], rating: 9, replies: [] },
    ],
  },
  {
    id: 2,
    name: "Sundarbans",
    image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg",
    rating: 4.8,
    reviews: [
      { id: 201, user: "Salma", text: "A must-visit for nature lovers!", images: [], rating: 10, replies: [] },
    ],
  },
];

const PlacesTabSection = () => {
  const [touristPlaces, setTouristPlaces] = useState(places);
  const [reviewText, setReviewText] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [replyText, setReplyText] = useState({});

  const handleReviewSubmit = (placeId) => {
    if (!reviewText || selectedRating === null) return;

    const newReview = {
      id: Date.now(),
      text: reviewText,
      // images: reviewImages,
      images: reviewImages || [],

      rating: selectedRating,
      replies: [],
    };

    setTouristPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === placeId
          ? { ...place, reviews: [newReview, ...place.reviews] }
          : place
      )
    );

    setReviewText("");
    setReviewImages([]);
    setSelectedRating(null);
  };

  const handleReplySubmit = (placeId, reviewId) => {
    if (!replyText[reviewId]) return;

    setTouristPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === placeId
          ? {
              ...place,
              reviews: place.reviews.map((review) =>
                review.id === reviewId
                  ? { ...review, replies: [...review.replies, { id: Date.now(), text: replyText[reviewId] }] }
                  : review
              ),
            }
          : place
      )
    );
    setReplyText({ ...replyText, [reviewId]: "" });
  };


  const toggleShowMore = (placeId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [placeId]: !prev[placeId],
    }));
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setReviewImages((prevImages) => [...prevImages, ...imageUrls]);
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setReviewImages((prev) => [...prev, ...files]);
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
     
      <div className="grid grid-cols-1 gap-6">
        {touristPlaces.map((place) => (
          <div key={place.id} className="border rounded-lg shadow-lg p-4 bg-white relative">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{place.name}</h2>
              {/* <p className="text-yellow-500 font-semibold text-lg">⭐ {place.rating}</p> */}
            </div>
            <img src={place.image} alt={place.name} className="w-full h-56 object-cover rounded-md mt-2" />
            <div className="mt-3 p-2 flex items-center justify-between rounded-md">
            
              <p className="text-yellow-500 font-semibold text-base ">⭐ {place.rating}</p>
              <p className="text-base  text-black px-3 py-1 rounded-full ">
 {place.reviews.length} Reviews
</p>

            </div>

            {/* Review Section */}
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Leave a Review:</h3>
              <textarea
                className="w-full border p-2 rounded-md"
                rows="3"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <input type="file" multiple accept="image/*" className="mt-2"  onChange={handleImageChange}  />
              <div className="flex gap-2 mt-2">
                {reviewImages.map((img, index) => (
                  <img key={index} src={URL.createObjectURL(img)} alt="review" className="w-16 h-16 rounded-md" />
                ))}
              </div>
              <div className="mt-3">
                <h3 className="font-semibold">Rate (out of 10):</h3>
                <div className="flex gap-2 mt-2">
                  {[...Array(10)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`cursor-pointer ${selectedRating > i ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => setSelectedRating(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <button className="bg-[#8cc163] text-white px-4 py-2 mt-3 rounded-md w-full" onClick={() => handleReviewSubmit(place.id)}>
                Submit Review
              </button>
            </div>

            {/* Display Reviews */}
            {place.reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Recent Reviews:</h3>
                {place.reviews.slice(0, expandedReviews[place.id] ? place.reviews.length : 2).map((review) => (
                  <div key={review.id} className="border p-3 rounded-md mt-2 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="text-gray-500 text-2xl" />
                      <p className="font-semibold">{review.user}</p>
                    </div>
                    <p className="mt-1">{review.text}</p>
                    <p className="text-yellow-500">⭐ {review.rating}/10</p>
                    <div className="flex gap-2 mt-2">
                      {review.images.map((img, index) => (
                        <img key={index} src={img} alt="review" className="w-16 h-16 rounded-md" />
                      ))}
                    </div>  

                    {/* Reply Section */}
                    <div className="mt-2 flex items-center gap-2">
                      {/* <FaReply className="text-gray-500 cursor-pointer" /> */}
                      <input
                        type="text"
                        placeholder="Reply..."
                        className="border p-2 w-full rounded-md"
                        value={replyText[review.id] || ""}
                        onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                      />
                      {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={() => handleReplySubmit(place.id, review.id)}>Reply</button> */}
                       <FaPaperPlane className="text-[#8cc163] cursor-pointer"onClick={() => handleReplySubmit(place.id, review.id)} />
                    </div>
                    {/* Display Replies */}
                    {review.replies.length > 0 && (
                      <div className="mt-2 pl-4 border-l">
                        {review.replies.map((reply) => (
                          <p key={reply.id} className="text-sm text-gray-600">{reply.text}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {place.reviews.length > 2 && (
                  <button className="text-blue-600 mt-3 font-semibold" onClick={() => toggleShowMore(place.id)}>
                    {expandedReviews[place.id] ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesTabSection;
