'use client'
import React, { useState, useEffect } from 'react';

const Category = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);

  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [placeId, setPlaceId] = useState('');

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(6);

  // Fetch Divisions initially
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await fetch('https://parjatak-core.vercel.app/api/v1/customer/divisions');
        const data = await res.json();
        setDivisions(data.data || []);
      } catch (error) {
        console.error('Failed to load divisions:', error);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch Districts when divisionId changes
  useEffect(() => {
    if (!divisionId) return;
    const fetchDistricts = async () => {
      try {
        const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/districts?divisionId=${divisionId}`);
        const data = await res.json();
        setDistricts(data.data || []);
      } catch (error) {
        console.error('Failed to load districts:', error);
      }
    };
    fetchDistricts();
  }, [divisionId]);

  // Fetch Places when districtId changes
  useEffect(() => {
    if (!districtId) return;
    const fetchPlaces = async () => {
      try {
        const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/places?districtId=${districtId}`);
        const data = await res.json();
        setPlaces(data.data || []);
      } catch (error) {
        console.error('Failed to load places:', error);
      }
    };
    fetchPlaces();
  }, [districtId]);

  // Fetch posts on Search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/posts?divisionId=${divisionId}&districtId=${districtId}&placeId=${placeId}&limit=6&page=1`);
      const data = await res.json();
      setPosts(data.data || []);
      setPage(1);
      setHasMore(data.data.length >= 6);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };
  const handleReset = () => {
    setDivisionId('');
    setDistrictId('');
    setPlaceId('');
    setDistricts([]);
    setPlaces([]);
    setPosts([]);
    setPage(1);
    setHasMore(true);
    
    setShowMore(6);
  };

  // Load more posts
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    try {
      const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/posts?divisionId=${divisionId}&districtId=${districtId}&placeId=${placeId}&limit=6&page=${nextPage}`);
      const data = await res.json();
      setPosts((prev) => [...prev, ...(data.data || [])]);
      setPage(nextPage);
      setHasMore(data.data.length >= 6);
    } catch (error) {
      console.error('Failed to load more posts:', error);
    }
  };

  return (
    <div className="p-6 container max-w-[1120px] mx-auto mt-5">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4">
        <h1 className='text-black'>Browse By:</h1>

        {/* Division Dropdown */}
        <select
          className="bg-[#FCF0DC] text-black rounded-md p-2 w-full md:w-auto"
          value={divisionId}
          onChange={(e) => {
            setDivisionId(e.target.value);
            setDistrictId('');
            setPlaceId('');
            setDistricts([]);
            setPlaces([]);
          }}
        >
          <option value="">Select Division</option>
          {divisions.map((div) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
        </select>

        {/* District Dropdown */}
        <select
          className="bg-[#FCF0DC] text-black rounded-md p-2 w-full md:w-auto"
          value={districtId}
          onChange={(e) => {
            setDistrictId(e.target.value);
            setPlaceId('');
            setPlaces([]);
          }}
          disabled={!divisionId}
        >
          <option value="">Select District</option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.name}
            </option>
          ))}
        </select>

        {/* Place Dropdown */}
        <select
          className="bg-[#FCF0DC] text-black rounded-md p-2 w-full md:w-auto"
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
          disabled={!districtId}
        >
          <option value="">Select Place</option>
          {places.map((plc) => (
            <option key={plc.id} value={plc.id}>
              {plc.name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="right-3 py-1.5 lg:px-10 px-8 bg-[#8cc163] text-white rounded-md text-sm sm:text-base hover:bg-gray-900 transition duration-300"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="right-3 py-1.5 lg:px-10 px-8 bg-[#8cc163] text-white rounded-md text-sm sm:text-base hover:bg-gray-900 transition duration-300"
        >
          Reset
        </button>
      </div>

      {/* Posts Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton Loading
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="animate-pulse bg-gray-300 rounded-xl h-64"></div>
          ))
        ) : (
          posts.slice(0, showMore).map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={post.images?.[0]?.image || '/no-image.jpg'}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-black">{post.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {hasMore && posts.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-[#8cc163] hover:bg-gray-900 text-white px-6 py-2 rounded-md transition duration-300"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
