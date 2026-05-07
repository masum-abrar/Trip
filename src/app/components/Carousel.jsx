'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { X, Search, MapPin, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://i.pinimg.com/736x/92/5b/77/925b777aa608935f5f26ff0074eb672b.jpg',
    title: 'Dhaka',
    subtitle: 'The City of Mosques',
    description:
      'Discover Dhaka — the bustling capital where vibrant markets, rich history, and warm hospitality blend to create an unforgettable journey.',
    tag: 'Capital City',
    color: 'from-emerald-900/80',
  },
  {
    id: 2,
    image: 'https://t4.ftcdn.net/jpg/02/13/57/63/360_F_213576368_kLr4oB8dvm7AY2Yj0NOXJwH0CY8hHPEr.jpg',
    title: 'Chattogram',
    subtitle: 'The Commercial Capital',
    description:
      'Surrounded by hills, sea, and rivers, Chattogram beautifully blends nature with industry — Bangladeshs thriving port city.',
    tag: 'Port City',
    color: 'from-blue-900/80',
  },
  {
    id: 3,
    image: 'https://t4.ftcdn.net/jpg/06/95/32/19/360_F_695321901_3WWpN79doL9Ao0wrEJyqKzsoIwjP9US2.jpg',
    title: 'Sylhet',
    subtitle: 'Land of Tea & Nature',
    description:
      'Sylhet sits along the River Surma in northeastern Bengal, renowned for its emerald tea gardens and breathtaking mountain views.',
    tag: 'Tea Gardens',
    color: 'from-teal-900/80',
  },

];

const Carousel = () => {
  const [searchText, setSearchText] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

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

  const closeModal = () => {
    setShowModal(false);
    setSearchText('');
    setSearched(false);
    setPlaces([]);
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 64px)', minHeight: '560px' }}>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev',
        }}
        pagination={false}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">

            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent opacity-60`} />


            <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6 md:px-16 lg:px-24">

              <span className="inline-flex items-center gap-1.5 self-start bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                <MapPin size={11} />
                {slide.tag}
              </span>


              <h1 className="text-white font-extrabold leading-none tracking-tight text-5xl sm:text-6xl lg:text-8xl drop-shadow-2xl mb-2">
                {slide.title}
              </h1>


              <p className="text-green-300 font-semibold text-lg sm:text-xl mb-4 tracking-wide">
                {slide.subtitle}
              </p>


              <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                {slide.description}
              </p>


              <div>
                <Link
                  href="/AllPost"
                  className="inline-flex items-center gap-2 bg-[#8cc163] hover:bg-emerald-500 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 group"
                >
                  Explore Places
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      <button
        className="swiper-btn-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="swiper-btn-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>


      <div className="absolute bottom-8 left-6 md:left-16 lg:left-24 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex
              ? 'w-10 bg-[#8cc163]'
              : 'w-4 bg-white/40'
              }`}
          />
        ))}
      </div>


      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-full max-w-2xl px-4">
        <div className="bg-white rounded-2xl shadow-2xl flex items-center gap-3 px-4 py-3 border border-gray-100">
          <Search className="text-gray-400 flex-shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for a destination, place, or district..."
            className="flex-1 text-gray-700 placeholder-gray-400 text-sm bg-transparent focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="flex-shrink-0 bg-[#8cc163] hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-emerald-300/50"
          >
            Search
          </button>
        </div>
      </div>


      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
              Search Result
            </h3>

            {loading ? (
              <div className="flex flex-col items-center py-10 gap-3">
                <div className="spinner_loader" />
                <p className="text-gray-500 text-sm">Searching destinations…</p>
              </div>
            ) : searched && places.length === 0 ? (
              <div className="flex flex-col items-center py-10 gap-3">
                <div className="text-4xl">🗺️</div>
                <p className="text-gray-600 font-semibold">No place found</p>
                <p className="text-gray-400 text-xs">Try a different keyword</p>
              </div>
            ) : (
              places.length > 0 && (
                <Link href={`/PlaceDetails/${places[0].slug}`} onClick={closeModal}>
                  <div className="cursor-pointer group">
                    <div className="overflow-hidden rounded-2xl mb-4">
                      <img
                        src={
                          places[0].images && places[0].images.length > 0
                            ? places[0].images[0]?.image
                            : 'https://via.placeholder.com/600x400?text=No+Image'
                        }
                        alt={places[0].name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-green-500" />
                      <h2 className="text-lg font-bold text-gray-800">{places[0].name}</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 ml-5">Tap to explore this place →</p>
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
