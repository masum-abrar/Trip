'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState ,useEffect } from 'react';
import Link from 'next/link';

const Carousel = () => {


  const [searchText, setSearchText] = useState('');
  const [places, setPlaces] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
 // Live search with debounce
 useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    if (searchText.trim() !== '') {
      handleSearch();
    } else {
      setPlaces([]);
      setShowDropdown(false);
    }
  }, 500); // 500ms delay

  return () => clearTimeout(delayDebounceFn);
}, [searchText]);

const handleSearch = async () => {
  try {
    setLoading(true);
    const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/places?name=${searchText}`);
    const data = await response.json();

    setPlaces(data.data || []);
    setShowDropdown(true);
  } catch (error) {
    console.error('Error fetching places:', error);
  } finally {
    setLoading(false);
  }
};


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
    {/* Swiper Slider */}
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
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

    {/* Search Bar */}
    <div className="absolute bottom-16 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] px-4 z-10">
      <div className="relative w-full">
        {/* Input */}
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search destination, places"
          className="w-full py-3 pl-4 pr-20 bg-[#FCF0DC] backdrop-blur-md border border-gray-300 rounded-3xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8cc163] focus:border-[#8cc163] shadow-md text-sm sm:text-base transition-all duration-300"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 py-2 px-5 sm:px-6 bg-gradient-to-r from-[#8cc163] to-[#6aa84f] text-white font-semibold rounded-full text-sm sm:text-base hover:from-gray-700 hover:to-gray-900 transition-all duration-300 shadow-lg"
        >
          Search
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute mt-1 w-full bg-[#FCF0DC] shadow-2xl rounded-3xl  max-h-60 overflow-y-auto z-20 animate-fade-in-up border border-gray-200">
            {loading ? (
             <div className="flex justify-center py-4 text-gray-600 font-semibold">
             {/* Spinner */}
             <div className="w-6 h-6 border-4 border-t-[#8cc163] border-gray-300 rounded-full animate-spin"></div>
           </div>
            ) : places.length > 0 ? (
              places.map((spot) => (
                <Link
                  key={spot.slug}
                  href={`/PlaceDetails/${spot.slug}`}
                  className="block px-4 py-2 hover:bg-[#FCF0DC] hover:text-[#256029] text-gray-700 font-medium transition-all duration-200"
                  onClick={() => setShowDropdown(false)}
                >
                  {spot.name}
                </Link>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">No places found</div>
            )}
          </div>
        )}
      </div>
    </div>

  </div>
  
  );
};

export default Carousel;
