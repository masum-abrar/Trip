'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const Page = ({ params }) => {
  const [section, setSection] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(true); // ✅ New State for loader

  // Section fetch
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        setSectionLoading(true);
        const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/lists/${params.title}`);
        const data = await res.json();
        setSection(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setSectionLoading(false);
      }
    };
    fetchSectionData();
  }, [params.title]);

  // Place details fetch
  useEffect(() => {
    if (!selectedPlace) return;

    const fetchPlaceDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/popular-places`);
        const data = await res.json();
        const place = data.data.find(p => p.id === selectedPlace.id);
        setPlaceDetails(place);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [selectedPlace]);

  // ✅ Animated Loader Component
  const Loader = () => (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      <span className="ml-4 text-lg md:text-xl font-semibold text-gray-700 animate-pulse">
        Loading visited places...
      </span>
    </div>
  );

  if (sectionLoading) return <Loader />; // ✅ Show loader while fetching section

  if (!section) return <div>No data found!</div>;

  const places = section.listPlace || [];

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      <div className="flex-grow">
        {/* Cover Image */}
        <div className="relative w-full h-[60vh] md:h-96">
          <Image
            src={places[0]?.place?.images?.[0]?.image || '/placeholder.jpg'}
            alt="Cover"
            fill
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold text-center">{section.title}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* User info */}
          <Link href={`/userprofile/${section.user?.id}`} className="flex items-center space-x-3 cursor-pointer">
            <Image
              src={section.user?.image || '/avatar.png'}
              alt={section.user?.fullname}
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="font-semibold text-gray-800">{section.user?.fullname}</h1>
          </Link>

          <p className="mt-2 text-gray-800">{section.description}</p>

          {/* Places cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {places.map(({ place }) => (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform duration-300"
              >
                <Image
                  src={place.images?.[0]?.image || '/placeholder.jpg'}
                  alt={place.name}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 text-black bg-white bg-opacity-10">
                  <h3 className="font-semibold text-sm md:text-base">{place.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedPlace && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-2xl font-bold"
                onClick={() => {
                  setSelectedPlace(null);
                  setPlaceDetails(null);
                }}
              >
                ✕
              </button>

              {loading && (
                <div className="text-center py-20 text-lg md:text-xl animate-pulse">
                  Preparing your place details... ⏳
                </div>
              )}

              {placeDetails && !loading && (
                <div className="space-y-4">
                  <Image
                    src={placeDetails.images?.[0]?.image || '/placeholder.jpg'}
                    alt={placeDetails.name}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <h2 className="text-xl md:text-2xl font-bold">{placeDetails.name}</h2>
                  <p className="text-gray-700 text-sm md:text-base">
                    <span className="font-bold">Price Range:</span> {placeDetails.priceRange || 'Not Available'}
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    <span className="font-bold">Direction:</span> {placeDetails.direction || 'Not Available'}
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    <span className="font-bold">Map:</span>{' '}
                    {placeDetails.mapLink ? (
                      <a
                        href={placeDetails.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View on Map
                      </a>
                    ) : (
                      'Not Available'
                    )}
                  </p>

                  <div className="flex justify-center mt-4">
                    <Link
                      href={`/PlaceDetails/${placeDetails.slug || placeDetails.id}`}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition text-sm md:text-base"
                    >
                      View Place
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
