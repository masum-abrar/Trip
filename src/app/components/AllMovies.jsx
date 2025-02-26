'use client';
import React from 'react';
import { FaEye, FaEllipsisH, FaHeart } from 'react-icons/fa';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

const AllPlaces = () => {
  const movies = [
    { id: 1, title: 'Jaflong', district: "Chittagong", image: 'https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg', eyeCount: '990k', dotCount: '194k', heartCount: '366k' },
    { id: 2, title: 'Saint Martin', district: "CoxsBazar", image: 'https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg', eyeCount: '890k', dotCount: '134k', heartCount: '456k' },
    { id: 3, title: 'Inani', district: "CoxsBazar", image: 'https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg', eyeCount: '750k', dotCount: '294k', heartCount: '266k' },
    { id: 4, title: 'SadaPathor', district: "Sylhet",image: 'https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg', eyeCount: '620k', dotCount: '394k', heartCount: '166k' },
  ];

  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    nextArrow: <div className="slick-arrow slick-next">→</div>, 
    prevArrow: <div className="slick-arrow slick-prev">←</div>, 
    // Adjust the gap between items in the carousel using margin on the slider items
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="container max-w-6xl mx-auto mt-20 p-3">
      {/* Section Header */}
      <div className="flex justify-between text-black mb-12">
        <h1 className="text-lg font-bold">POPULAR PLACES THIS WEEK</h1>
       <Link href="/Communities"> <a className="text-sm font-semibold text-black">more..</a></Link>
      </div>
      <hr className="bg-gray-400 mb-6" />

      {/* Card Slider */}
    <Slider {...settings}>
        {movies.map((movie) => (
           <Link href={`/PlaceDetails/${movie.id}`}> 
          <div
            key={movie.id}
            className="relative bg-white shadow-md rounded-lg p-4 w-full group overflow-hidden transition-all duration-300"
          >
            {/* Movie Image */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-2/3 object-cover rounded-lg "
            />
            {/* Movie Title */}
            <div className="absolute top-[0px] left-1/2 w-full lg:w-[40%] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded-lg shadow-lg text-center">
              {movie.title}
            </div>

            {/* Overlay with Movie Info */}
            <div className="absolute top-0 left-0 w-full h-[60%] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:top-40">
              <div className="lg:flex justify-center gap-4 bg-stone-900 p-2 rounded-lg transform group-hover:scale-90 sm:group-hover:scale-100 transition-transform duration-300">
                <div className="lg:flex items-center text-white text-sm group-hover:text-xs sm:group-hover:text-sm">
                  <FaEye className="mr-1 group-hover:text-xs sm:group-hover:text-sm" />
                  <span className="group-hover:text-xs sm:group-hover:text-sm">{movie.eyeCount}</span>
                </div>
                <div className="flex items-center text-white text-sm group-hover:text-xs sm:group-hover:text-sm">
                  <FaEllipsisH className="mr-1 group-hover:text-xs sm:group-hover:text-sm" />
                  <span className="hidden sm:block group-hover:text-xs sm:group-hover:text-sm">{movie.dotCount}</span>
                </div>
                <div className="flex items-center text-white text-sm group-hover:text-xs sm:group-hover:text-sm">
                  <FaHeart className="mr-1 group-hover:text-xs sm:group-hover:text-sm" />
                  <span className="group-hover:text-xs sm:group-hover:text-sm">{movie.heartCount}</span>
                </div>
              </div>
            </div>

            {/* Bottom Info (Visible on Large Screens) */}
            <div className=" lg:top-12 lg:left-0 w-full flex justify-center items-center px-2 text-base">
              <div className="flex items-center text-green-500 px-2 py-1 rounded">
                <FaEye className="mr-1" />
                <span>{movie.eyeCount}</span>
              </div>
              <div className="flex items-center text-blue-500 px-2 py-1 rounded">
                <FaEllipsisH className="mr-1" />
                <span>{movie.dotCount}</span>
              </div>
              <div className="flex items-center text-orange-500 px-2 py-1 rounded">
                <FaHeart className="mr-1" />
                <span>{movie.heartCount}</span>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </Slider>
 
    </div>
  );
};

export default  AllPlaces;
