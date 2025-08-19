'use client';
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { FaEye, FaEllipsisH, FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image'; // <-- Use Next.js optimized Image

const Communities = () => {
  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      try {
        const [districtRes, placeRes] = await Promise.all([
          fetch('https://parjatak-backend.vercel.app/api/v1/customer/districts'),
          fetch('https://parjatak-backend.vercel.app/api/v1/customer/popular-places')
        ]);

        const [districtData, placeData] = await Promise.all([
          districtRes.json(),
          placeRes.json()
        ]);

        setDistricts(districtData.data || []);
        setPlaces(placeData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white relative">
      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/50">
          <div className="relative w-32 h-32 flex justify-center items-center">
            <div className="absolute w-8 h-8 bg-green-500 rounded-full animate-bounce delay-150"></div>
            <div className="absolute w-8 h-8 bg-green-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute w-8 h-8 bg-green-300 rounded-full animate-bounce delay-450"></div>
          </div>
          <p className="mt-6 text-white text-xl font-semibold animate-pulse">
            Searching Places...
          </p>
        </div>
      )}

      <div className="shadow-lg w-full z-40 relative">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16 relative z-10">
        {districts.map((district) => {
          const districtPlaces = places
            .filter((place) => place.districtId === district.id)
            .sort((a, b) => (a.name?.trim().toLowerCase() || '').localeCompare(b.name?.trim().toLowerCase() || ''));

          if (districtPlaces.length === 0) return null;

          return (
            <section key={district.id} className="space-y-4">
              <div className="flex justify-center items-center py-4">
                <Link href={`/district/${district.id}`}>
                  <h2 className="relative text-2xl lg:text-3xl font-bold text-gray-800 tracking-wide text-center cursor-pointer
                                before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-green-500
                                before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100
                                hover:text-green-600 transition-colors duration-300">
                    {district.name}
                  </h2>
                </Link>
              </div>

              <div className="flex space-x-4 overflow-x-auto py-4">
                {districtPlaces.map((place) => (
                  <Link href={`/PlaceDetails/${place.slug}`} key={place.id}>
                    <div className="relative min-w-[250px] sm:min-w-[280px] lg:min-w-[300px] flex-shrink-0 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-xl" />

                      {place.images && place.images.length > 0 ? (
                        <Image
                          src={place.images[0]?.image}
                          alt={place.name}
                          width={300}
                          height={200}
                          sizes="(max-width: 640px) 250px,
                                 (max-width: 1024px) 280px,
                                 300px"
                          className="w-full h-[200px] object-cover rounded-xl"
                          priority={false} // lazy load automatically
                        />
                      ) : (
                        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl">
                          No Image
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-3 z-20 bg-black/60 rounded-b-xl">
                        <h3 className="text-lg font-semibold text-white">{place.name}</h3>
                        <div className="flex items-center space-x-3 text-sm text-white/80 mt-1">
                          <div className="flex items-center">
                            <FaEye className="mr-1" />
                            <span>{place.viewCount || 0}</span>
                          </div>
                          <div className="flex items-center">
                            <FaEllipsisH className="mr-1" />
                            <span>{place.review?.length || 0}</span>
                          </div>
                          <div className="flex items-center">
                            <FaHeart className="mr-1" />
                            <span>{place.heartCount || 0}</span>
                          </div>
                          <div
                            className="flex items-center ml-2 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(place.mapLink, '_blank');
                            }}
                          >
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span>{place.location || '-'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Communities;
