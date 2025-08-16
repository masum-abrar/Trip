'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

const Page = ({ params }) => {
  const decodedTitle = decodeURIComponent(params.slug);
  const [section, setSection] = useState(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/lists/${params.title}`
        );
        const result = await response.json();
        setSection(result.data);
      } catch (error) {
        console.error('Error fetching section data:', error);
      }
    };

    fetchSectionData();
  }, [params.slug]);

  if (!section) {
    return <div>Loading...</div>;
  }

  const user = section.user;
  const places = section.listPlace || [];

  const uniqueLocations = [
    ...new Set(places.map((p) => p.place?.address).filter(Boolean)),
  ];

  return (
    <div className="bg-white text-black">
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      {/* Cover Image */}
      <div className="relative w-full h-[60vh] md:h-96">
        <Image
          src={places[0]?.place?.images?.[0]?.image || '/placeholder.jpg'}
          alt="Cover Image"
          fill
          objectFit="cover"
          objectPosition="center"
          priority
          quality={100}
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            {section?.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center space-x-3">
          <Image
            src={user?.image || '/avatar.png'}
            alt={user?.fullname}
            width={48}
            height={48}
            className="rounded-full"
          />
          <h1 className="font-semibold">{user?.fullname}</h1>
        </div>

        <p className="mt-2 text-gray-800">{section.description}</p>

        {/* Location Tags */}
        <div className="flex flex-wrap gap-3 mt-4">
          {uniqueLocations.map((location, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer transform hover:scale-105 transition duration-300"
            >
              {location}
            </span>
          ))}
        </div>

        {/* Spots Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {places.map(({ id, place }) => (
            <Link
              key={place.id}
              href={`/PlaceDetails/${place?.slug}`}
              className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform duration-300 block"
            >
              <Image
                src={place?.images?.[0]?.image || '/placeholder.jpg'}
                alt={place?.name || 'Spot'}
                width={400}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 text-black bg-white bg-opacity-10">
                <h3 className="font-semibold text-lg">{place?.name}</h3>
                <p className="text-sm text-gray-600">{place?.address}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
