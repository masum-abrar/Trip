import React from "react";

const Reviews = () => {
  const movies = [
    { id: 1, title: "Movie 1", image: "https://a.ltrbxd.com/resized/alternative-poster/1/0/6/6/9/1/9/p/i2xiUNiDCTwKmzXoHnyqi6IKKQy-0-150-0-225-crop.jpg?v=d45fca1fe6" },
    { id: 2, title: "Movie 2", image: "https://a.ltrbxd.com/resized/film-poster/3/3/7/0/3/6/337036-wicked-2024-0-150-0-225-crop.jpg?v=c519c37ff7" },
    { id: 3, title: "Movie 3", image: "https://a.ltrbxd.com/resized/film-poster/6/1/7/4/4/3/617443-dune-part-two-0-150-0-225-crop.jpg?v=cc533700f8" },
    { id: 4, title: "Movie 4", image: "https://a.ltrbxd.com/resized/film-poster/3/1/8/1/9/5/318195-deadpool-2-0-150-0-225-crop.jpg?v=b43b5ab190" },
    { id: 5, title: "Movie 5", image: "https://a.ltrbxd.com/resized/film-poster/8/3/8/1/4/0/838140-the-substance-0-150-0-225-crop.jpg?v=ab9e1072f8" },
    { id: 6, title: "Movie 6", image: "https://a.ltrbxd.com/resized/film-poster/4/6/0/4/1/46041-in-the-heat-of-the-night-0-150-0-225-crop.jpg?v=7b3f8c5287" },
   
  ];

  return (
    <div className="container max-w-5xl mx-auto mb-4 p-3 ">
 
      <div className="flex justify-between text-gray-400 mb-4">
        <h1 className="text-lg font-bold">JUST REVIEWED...</h1>
        <p className="cursor-pointer hover:underline">2,340,259,273 films watched</p>
      </div>
     
      <hr className="border-t border-gray-400 mb-6" />

  
      <div className="grid grid-cols-6 md:grid-cols-6 gap-4">
        {movies.map((movie) => (
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
        ))}
      </div>
    </div>
  );
};

export default Reviews;
