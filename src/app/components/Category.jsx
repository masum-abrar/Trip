"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Category = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(6);

  const [modalMessage, setModalMessage] = useState(null); // ✅ string | null lagbe na

  // Fetch Divisions
  useEffect(() => {
    fetch("https://parjatak-backend.vercel.app/api/v1/customer/divisions")
      .then((res) => res.json())
      .then((data) => setDivisions(data.data || []))
      .catch((error) => console.error("Failed to load divisions:", error));
  }, []);

  // Fetch Districts
  useEffect(() => {
    if (!divisionId) return;
    fetch(
      `https://parjatak-backend.vercel.app/api/v1/customer/districts-by-division-id/${divisionId}`
    )
      .then((res) => res.json())
      .then((data) => setDistricts(data.data || []))
      .catch((error) => console.error("Failed to load districts:", error));
  }, [divisionId]);

  // Search posts
  const handleSearch = async () => {
    try {
      setLoading(true);
      setModalMessage("Searching places...");
      const res = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/category-places?divisionId=${divisionId}&districtId=${districtId}&limit=6&page=1`
      );
      const data = await res.json();

      setPosts(data.data || []);
      setPage(1);
      setHasMore(data.data?.length >= 6);
      setLoading(false);

      if (!data.data || data.data.length === 0) {
        setModalMessage("No place found!");
      } else {
        setModalMessage(null);
      }
    } catch (error) {
      console.error("Failed to fetch places:", error);
      setModalMessage("Something went wrong!");
      setLoading(false);
    }
  };

  // Reset filters
  const handleReset = () => {
    setDivisionId("");
    setDistrictId("");
    setDistricts([]);
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setShowMore(6);
  };

  // Load more
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    try {
      const res = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/category-places?divisionId=${divisionId}&districtId=${districtId}&limit=6&page=${nextPage}`
      );
      const data = await res.json();
      setPosts((prev) => [...prev, ...(data.data || [])]);
      setPage(nextPage);
      setHasMore(data.data?.length >= 6);
    } catch (error) {
      console.error("Failed to load more places:", error);
    }
  };

  return (
    <div className="p-6 container max-w-[1120px] mx-auto mt-5">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4">
        <h1 className="text-black">Browse By:</h1>

        {/* Division Dropdown */}
        <select
          className="bg-[#FCF0DC] text-black rounded-md p-2 w-full md:w-auto max-h-40 overflow-y-auto"
          value={divisionId}
          onChange={(e) => {
            setDivisionId(e.target.value);
            setDistrictId("");
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
          className="bg-[#FCF0DC] text-black rounded-md p-2 w-full md:w-auto max-h-40 overflow-y-auto"
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
          disabled={!divisionId}
        >
          <option value="">Select District</option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="py-1.5 lg:px-10 px-8 bg-[#8cc163] text-white rounded-md hover:bg-gray-900 transition duration-300"
        >
          Search
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="py-1.5 lg:px-10 px-8 bg-[#8cc163] text-white rounded-md hover:bg-gray-900 transition duration-300"
        >
          Reset
        </button>
      </div>

      {/* Posts Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-300 rounded-xl h-64"
              ></div>
            ))
          : posts.slice(0, showMore).map((post) => (
              <Link href={`/PlaceDetails/${post.slug}`} key={post.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={post.images?.[0]?.image || "/no-image.jpg"}
                    alt={post.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-black">
                      {post.name}
                    </h2>
                    <p className="text-gray-600 mt-2 line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
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

      {/* Modal */}
      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold text-gray-800">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="mt-4 px-4 py-2 bg-[#8cc163] text-white rounded-md hover:bg-gray-900 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
