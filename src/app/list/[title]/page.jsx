'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';

const Page = ({ params }) => {
    const decodedTitle = decodeURIComponent(params.slug);
    const [section, setSection] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchSectionData = async () => {
            try {
                const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/lists/${params.title}`);
                const data = await response.json();
                setSection(data.data); // Assuming the response matches the structure you need
            } catch (error) {
                console.error("Error fetching section data:", error);
            }
        };

        fetchSectionData();
    }, [params.slug]);

    if (!section) {
        return <div>Loading...</div>; // Or a skeleton loader for better UX
    }

    // Get unique locations
    const uniqueLocations = [...new Set(section?.place.map(spot => spot.location))];

    return (
        <div className="bg-white text-black ">
            <div className="shadow-lg w-full">
                <Navbar />
            </div>

            {/* Cover Image */}
            <div className="relative w-full h-[60vh] md:h-96">
                <Image 
                    src={section.spots[0].image} 
                    alt="Cover Image" 
                    fill 
                    objectFit="cover" 
                    objectPosition="center" 
                    priority 
                    quality={100} 
                    className="brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-5xl font-bold text-center">{section.title}</h1>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8 space-y-8'>
                <div className="flex items-center space-x-3">
                    <Image 
                        src={section.userAvatar} 
                        alt={section.userName} 
                        width={48} 
                        height={48} 
                        className="rounded-full" 
                    />
                    <h1 className="font-semibold">{section.userName}</h1>
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
                    {section.place.map(spot => (
                        <div key={spot.id} className=" rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform duration-300">
                            <Image 
                                src={spot.image} 
                                alt={spot.name} 
                                width={400} 
                                height={300} 
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3 text-black bg-white bg-opacity-10">
                                <h3 className="font-semibold text-lg">{spot.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
