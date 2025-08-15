'use client';
import React, { useEffect, useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { FaEye, FaEllipsisH, FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const Communities = () => {
  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      try {
        const districtRes = await fetch('https://parjatak-backend.vercel.app/api/v1/customer/districts');
        const districtData = await districtRes.json();

        const placeRes = await fetch('https://parjatak-backend.vercel.app/api/v1/customer/popular-places');
        const placeData = await placeRes.json();

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
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500 text-xl font-semibold">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {districts.map((district) => {
          const districtPlaces = places
            .filter((place) => place.districtId === district.id)
            .sort((a, b) => (a.name?.trim().toLowerCase() || '').localeCompare(b.name?.trim().toLowerCase() || ''));

          if (districtPlaces.length === 0) return null;

          return (
            <section key={district.id} className="space-y-4">
              {/* District Name */}
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

              {/* Places */}
              <div className="flex space-x-4 overflow-x-auto py-4">
                {districtPlaces.map((place) => (
                  <Link href={`/PlaceDetails/${place.slug}`} key={place.id}>
                    <div className="relative min-w-[250px] sm:min-w-[280px] lg:min-w-[300px] flex-shrink-0 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-xl" />
                      {place.images && place.images.length > 0 ? (
                        <img
                          src={place.images[0]?.image || 'https://via.placeholder.com/600x400'}
                          alt={place.name}
                          className="w-full h-[200px] object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl">
                          No Image
                        </div>
                      )}

                      {/* Info Box */}
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
                          <div className="flex items-center ml-2 cursor-pointer"
                               onClick={(e) => { e.preventDefault(); window.open(place.mapLink, '_blank'); }}>
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
