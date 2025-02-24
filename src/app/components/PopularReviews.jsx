import Link from "next/link";
import React from "react";
import { FaHeart, FaComment, FaPlus } from "react-icons/fa";

const PopularReviews = () => {
  const reviews = [
    {
      id: 1,
      movieTitle: "Sylhet",
      year: "2024",
      reviewer: "ziwe",
      stars: 4,
      likes: 1023,
      text: "The dangers of a little crush of art and commerce colliding",
      reactions: 123,
      comments: 159,
      avatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
      image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg",
    },
    {
      id: 2,
      movieTitle: "Saint Martin",
      year: "2021",
      reviewer: "Rakib",
      stars: 5,
      likes: 4229,
      text: "A wonderfully accurate depiction of art and commerce colliding.",
      reactions: 245,
      comments: 159,
      avatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb",
      image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg",
    },
    {
      id: 2,
      movieTitle: "Coxs Bazar",
      year: "2021",
      reviewer: "ischraib",
      stars: 5,
      likes: 4229,
      text: "A wonderfully accurate depiction of art and commerce colliding.",
      reactions: 245,
      comments: 159,
      avatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
      image: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg",
    },
  ];

  const crewPicks = [
    { id: 1, name: "Pick 1", image: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg" },
    { id: 2, name: "Pick 2", image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" },
    { id: 3, name: "Pick 3", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg" },
    { id: 4, name: "Pick 4", image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" },
  ];

  const popularUsers = [
    { id: 1, name: "James (Schaffrillas)", likes: "1,042,10 likes", avatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb" },
    
    { id: 2, name: "Karsten", likes: "608,000 likes", avatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb" },
    { id: 3, name: "jeaba", likes: "1,089 reviews", avatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2" },
  ];

  return (
    <div className="container max-w-5xl mx-auto mt-20 p-3">
      {/* Main Section */}
      <div className="">
        {/* Popular Reviews Section */}
        <div className="w-full ">
          <div className="flex justify-between text-gray-400 mb-4">
            <h1 className="text-sm lg:text-lg font-bold">POPULAR REVIEWS THIS WEEK</h1>
            <p className="cursor-pointer hover:underline">More</p>
          </div>
          <hr className="border-t border-gray-400 mb-6" />
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
       {reviews.map((review) => (
          <Link href={`/AllPost/${review.id}`}>
            <div
              key={review.id}
              className=" w-72 lg:w-80 h-[425px] lg:h-[400px] p-3 rounded-lg shadow-lg mb-4 "
            >
            
              <div className="mb-4">
                <img
                  src={review.image}
                  alt={review.movieTitle}
                  className="w-96 rounded-lg"
                />
              </div>
             
              <div className="ml-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-black font-bold text-lg">
                    {review.movieTitle}{" "}
                    {/* <span className="text-gray-400">{review.year}</span> */}
                  </h2>
                <Link href='/profile'>
                <div className="flex items-center text-gray-400 text-sm">
                    <img
                      src={review.avatar}
                      alt={review.reviewer}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-black">{review.reviewer}</span>
                  </div>
                </Link>
                  <p className="text-gray-400 text-sm mt-2">
                    ⭐ {review.stars} &nbsp; ❤️ {review.reactions} &nbsp; 🗨️{" "}
                    {review.comments}
                  </p>
                  <p className="text-black mt-2">{review.text}</p>
                </div>
                <div className="flex items-center text-black text-sm mt-2">
                  <FaHeart className="text-blue-500 mr-1" />
                  Like review &nbsp; • &nbsp;
                  <span className="text-black">{review.likes} likes</span>
                </div>
              </div>
            </div>
          </Link>
          ))}
       </div>
        </div>

     
       
      </div>
    </div>
  );
};

export default PopularReviews;
