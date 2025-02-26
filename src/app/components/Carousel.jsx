'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image:
        'https://content.r9cdn.net/rimg/dimg/c9/06/8d4fe0d8-city-28030-164fcc85915.jpg?width=1200&height=630&xhint=1477&yhint=1081&crop=true',
      title: 'Dhaka',
      description:
        'Discover Dhaka, the bustling capital of Bangladesh, where vibrant markets, rich history, and warm hospitality blend to create an unforgettable journey.',
    },
    {
      id: 2,
      image:
        'https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg',
      title: 'Coxs Bazar',
      description:
        'Coxs Bazar Beach The beach in Coxs Bazar is the main attraction of the town with an unbroken length of 150 km (93 mi) also termed the longest natural unbroken sea beach" in the world.',
    },
    {
      id: 3,
      image:
        'https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg',
      title: 'Sylhet',
      description:
        'Sylhet sits on the River Surma’s banks in northeastern Bengal, known for its mountain views and wooden houses. It has serene parks and cobblestone streets, like a fairytale. We will look at Sylhet, its top sights, and fun activities.',
    },
  ];

  return (
    <div className="relative">
 <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Pass modules here
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }} // Enable autoplay
      loop={true} // Loop slides
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[80vh]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              {slide.title && (
                <h1 className="text-white font-extrabold text-2xl sm:text-3xl lg:text-5xl mb-4 lg:mb-8">
                  {slide.title}
                </h1>
              )}
              <p className="text-white text-sm sm:text-base lg:text-lg max-w-lg lg:max-w-[1020px] mb-6 lg:mb-10 p-3">
                {slide.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  
    {/* Search Bar (Now outside the Swiper) */}
    <div className="absolute bottom-16 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] px-4 z-10">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search destination, places"
          className="w-full py-3 pl-4 pr-16 bg-[#FCF0DC] backdrop-blur-lg border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
        />
        {/* Search Button */}
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 py-2 px-4 sm:px-6 bg-[#8cc163] text-white rounded-full text-sm sm:text-base hover:bg-gray-900 transition duration-300">
          Search
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Carousel;
