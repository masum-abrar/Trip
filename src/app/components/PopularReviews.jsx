import React from "react";
import { FaHeart, FaComment, FaPlus } from "react-icons/fa";

const PopularReviews = () => {
  const reviews = [
    {
      id: 1,
      movieTitle: "Nosferatu",
      year: "2024",
      reviewer: "ziwe",
      stars: 4,
      likes: 1023,
      text: "The dangers of a little crush",
      reactions: 123,
      comments: 159,
      avatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
      image: "https://a.ltrbxd.com/resized/alternative-poster/1/0/6/6/9/1/9/p/i2xiUNiDCTwKmzXoHnyqi6IKKQy-0-150-0-225-crop.jpg?v=d45fca1fe6",
    },
    {
      id: 2,
      movieTitle: "The Velvet Underground",
      year: "2021",
      reviewer: "ischraib",
      stars: 5,
      likes: 4229,
      text: "A wonderfully accurate depiction of art and commerce colliding.",
      reactions: 245,
      comments: 159,
      avatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb",
      image: "https://a.ltrbxd.com/resized/film-poster/3/1/8/1/9/5/318195-deadpool-2-0-150-0-225-crop.jpg?v=b43b5ab190",
    },
    {
      id: 2,
      movieTitle: "The Velvet Underground",
      year: "2021",
      reviewer: "ischraib",
      stars: 5,
      likes: 4229,
      text: "A wonderfully accurate depiction of art and commerce colliding.",
      reactions: 245,
      comments: 159,
      avatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
      image: "https://a.ltrbxd.com/resized/film-poster/3/1/8/1/9/5/318195-deadpool-2-0-150-0-225-crop.jpg?v=b43b5ab190",
    },
  ];

  const crewPicks = [
    { id: 1, name: "Pick 1", image: "https://a.ltrbxd.com/resized/alternative-poster/1/0/6/6/9/1/9/p/i2xiUNiDCTwKmzXoHnyqi6IKKQy-0-150-0-225-crop.jpg?v=d45fca1fe6" },
    { id: 2, name: "Pick 2", image: "https://a.ltrbxd.com/resized/film-poster/3/3/7/0/3/6/337036-wicked-2024-0-150-0-225-crop.jpg?v=c519c37ff7" },
    { id: 3, name: "Pick 3", image: "https://a.ltrbxd.com/resized/film-poster/6/1/7/4/4/3/617443-dune-part-two-0-150-0-225-crop.jpg?v=cc533700f8" },
    { id: 4, name: "Pick 4", image: "https://a.ltrbxd.com/resized/film-poster/8/3/8/1/4/0/838140-the-substance-0-150-0-225-crop.jpg?v=ab9e1072f8" },
  ];

  const popularUsers = [
    { id: 1, name: "James (Schaffrillas)", likes: "1,042,10 likes", avatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb" },
    
    { id: 2, name: "Karsten", likes: "608,000 likes", avatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb" },
    { id: 3, name: "jeaba", likes: "1,089 reviews", avatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2" },
  ];

  return (
    <div className="container max-w-5xl mx-auto mt-20 p-3">
      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Popular Reviews Section */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between text-gray-400 mb-4">
            <h1 className="text-lg font-bold">POPULAR REVIEWS THIS WEEK</h1>
            <p className="cursor-pointer hover:underline">More</p>
          </div>
          <hr className="border-t border-gray-400 mb-6" />
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex mb-6 bg-[#2c3440] p-4 rounded-lg shadow-lg"
            >
            
              <div className="w-20 h-28">
                <img
                  src={review.image}
                  alt={review.movieTitle}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
             
              <div className="ml-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-white font-bold text-lg">
                    {review.movieTitle}{" "}
                    <span className="text-gray-400">{review.year}</span>
                  </h2>
                  <div className="flex items-center text-gray-400 text-sm">
                    <img
                      src={review.avatar}
                      alt={review.reviewer}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{review.reviewer}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    ⭐ {review.stars} &nbsp; ❤️ {review.reactions} &nbsp; 🗨️{" "}
                    {review.comments}
                  </p>
                  <p className="text-white mt-2">{review.text}</p>
                </div>
                <div className="flex items-center text-gray-400 text-sm mt-2">
                  <FaHeart className="text-blue-500 mr-1" />
                  Like review &nbsp; • &nbsp;
                  <span className="text-white">{review.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

     
        <div className="w-full lg:w-1/3">
          {/* Crew Picks */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-400 mb-4">CREW PICKS</h2>
            <hr className="border-t border-gray-400 mb-6" />
            <div className="grid grid-cols-2 gap-4">
              {crewPicks.map((pick) => (
                <div key={pick.id} className="w-full h-40">
                  <img
                    src={pick.image}
                    alt={pick.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

         
          <div>
            <h2 className="text-lg font-bold text-gray-400 mb-4">
              POPULAR REVIEWERS
            </h2>
            <hr className="border-t border-gray-400 mb-6" />
            {popularUsers.map((user) => (
  <div
    key={user.id}
    className="flex flex-col bg-[#2c3440] p-3 rounded-lg mb-2"
  >
    {/* Reviewer Details */}
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <p className="text-white">{user.name}</p>
      </div>
      <FaPlus className="text-gray-400 ml-2 cursor-pointer" />
    </div>

    {/* Likes (Next Line) */}
    <div className="text-gray-400 text-sm mt-2">{user.likes}</div>
  </div>
))}

          </div>

          <div className="top-10 bottom-20">
          <h2 className="text-lg font-bold text-gray-400 mb-4 capitalize">
             Can't find a flim?
            </h2>
            <hr className="border-t border-gray-400 mb-6" />
            <h1 className="text-gray-400">
                Help Keep Letterboard Up To Date
                Find Out How to Add or Edit a Flim
            </h1>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularReviews;
