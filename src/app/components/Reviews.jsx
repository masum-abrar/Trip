import Link from "next/link";
import React from "react";

const Reviews = () => {
  const movies = [
    { id: 1, title: "Movie 1", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg" },
    { id: 2, title: "Movie 2", image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg" },
    { id: 3, title: "Movie 3", image: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg" },
    { id: 4, title: "Movie 4", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg" },
    { id: 5, title: "Movie 5", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg" },
    { id: 6, title: "Movie 6", image: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg" },
   
  ];

  return (
    <div className="container max-w-5xl mx-auto mb-4 p-3 ">
 
      <div className="flex justify-between text-gray-400 mb-4">
        <h1 className="text-lg font-bold">JUST REVIEWED...</h1>
        <p className="cursor-pointer hover:underline">2,340,259,273 places watched</p>
      </div>
     
      <hr className="border-t border-gray-400 mb-6" />

  
      <div className="grid grid-cols-6 md:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link href={``}> 
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden "
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover mb-2 rounded"
            />
          
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
