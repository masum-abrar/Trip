'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const Carousel = () => {
  const [searchText, setSearchText] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    setLoading(true);
    setShowModal(true);
    setSearched(true);
    setPlaces([]);
    try {
      const response = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/places?name=${searchText}`
      );
      const data = await response.json();
      setPlaces(data.data || []);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const slides = [
    {
      id: 1,
      image:
        'https://wallpapers.com/images/hd/ahsan-manzil-museum-in-dhaka-nw0sfyt8x4ibglxq.jpg',
      title: 'Dhaka',
      description:
        'Discover Dhaka, the bustling capital of Bangladesh, where vibrant markets, rich history, and warm hospitality blend to create an unforgettable journey.',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1619177383949-f03975e50b19?fm=jpg&q=60&w=3000',
      title: 'Coxs Bazar',
      description:
        'Coxs Bazar Beach is the main attraction of the town with an unbroken length of 150 km, also termed the longest natural unbroken sea beach in the world.',
    },
    {
      id: 3,
      image:
        'https://live.staticflickr.com/4852/31056385007_f81c1aebbb_b.jpg',
      title: 'Sylhet',
      description:
        'Sylhet sits on the River Surma’s banks in northeastern Bengal, known for its mountain views and wooden houses.',
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
            <div className="relative w-full h-[70vh] md:h-[80vh]">
              {/* Blurred Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover filter blur-sm"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              {/* Text & Search */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white font-extrabold tracking-wide text-3xl sm:text-4xl lg:text-6xl mb-4 drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-white text-sm sm:text-base lg:text-lg max-w-[700px] mb-6 leading-relaxed drop-shadow-xl">
                  {slide.description}
                </p>
                <div className="w-full max-w-[500px]">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="🔍 Search destination or place..."
                    className="w-full py-3 px-5 bg-white/90 backdrop-blur-md border border-gray-300 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8cc163] shadow-lg text-base transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
 {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full transform scale-95 animate-[zoomIn_0.3s_ease_forwards] relative">
      {/* Close Button */}
      <button
        onClick={() => {
          setShowModal(false);
          setSearchText('');
          setSearched(false);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <X size={28} />
      </button>

      {/* Modal Content */}
      {loading ? (
        <div className="text-lg font-semibold text-center py-6">
          Searching...
        </div>
      ) : searched && places.length === 0 ? (
        <div className="text-lg font-semibold text-center py-6 text-red-500">
          No place found
        </div>
      ) : (
        places.length > 0 && (
          <Link href={`/PlaceDetails/${places[0].slug}`}>
            <div className="cursor-pointer">
              <img
                src={
                  places[0].images && places[0].images.length > 0
                    ? places[0].images[0]?.image
                    : 'https://via.placeholder.com/600x400?text=No+Image'
                }
                alt={places[0].name}
                className="w-full h-52 object-cover rounded-xl shadow-lg"
              />
              <h2 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                {places[0].name}
              </h2>
            </div>
          </Link>
        )
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Carousel;
