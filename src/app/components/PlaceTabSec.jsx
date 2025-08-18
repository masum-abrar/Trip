"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Star, Plus } from "lucide-react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Cookies from "js-cookie";

const PlaceTabSec = ({ PlaceData }) => {
  const [locationData, setLocationData] = useState([]); // default empty array
  const [categories, setCategories] = useState([]); // default empty array
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [phone, setPhone] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [direction, setDirection] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const districtId = PlaceData?.id;
  const divisionId = PlaceData?.division?.id;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://parjatak-backend.vercel.app/api/v1/place-categories"
        );
        const data = await res.json();
        setCategories(data?.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch places for the district
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/districts-places/${districtId}`
        );
        const data = await res.json();
        setLocationData(data?.data || []);
      } catch (err) {
        console.error("Failed to fetch places", err);
      }
    };

    if (districtId) fetchPlaces();
  }, [districtId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const userId = Cookies.get("userId");
    if (!userId) {
      toast.error("Please login first");
      setLoader(false);
      return;
    }

    if (!name?.trim() || !address?.trim() || !divisionId || !districtId || !categoryId) {
      toast.error("Please fill all required fields");
      setLoader(false);
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("divisionId", divisionId);
    formData.append("districtId", districtId);
    formData.append("categoryId", categoryId);
    formData.append("address", address);
    formData.append("description", description || "");
    formData.append("tag", tag || "");
    formData.append("priceRange", priceRange || "");
    formData.append("phone", phone || "");
    formData.append("openingHour", openingHour || "");
    formData.append("mapLink", mapLink || "");
    formData.append("direction", direction || "");
    formData.append("isActive", "false");

    images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/places",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Submission failed");
      } else {
        toast.success("Place added successfully! Wait for admin approval.");
        setShowModal(false);
        setName("");
        setAddress("");
        setDescription("");
        setTag("");
        setPriceRange("");
        setPhone("");
        setOpeningHour("");
        setMapLink("");
        setDirection("");
        setCategoryId("");
        setImages([]);
        setPreviewImages([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed due to network error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#8cc163] hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
        >
          Add place
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Grid of Places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {(locationData || []).map((spot) => (
          <Link key={spot.slug} href={`/PlaceDetails/${spot.slug}`}>
            <div className="group relative overflow-hidden rounded-xl aspect-[4/3] transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                {(spot.images || []).map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img.image || "https://via.placeholder.com/600x400"}
                      alt={spot.name}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-semibold text-white">{spot.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-white/80">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{spot.review?.[0]?.rating ?? 0}</span>
                  <MapPin className="w-4 h-4 text-emerald-400 ml-2" />
                  <span>{spot.address}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Place</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-red-500 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/** Input fields **/}
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Tags</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Price Range</label>
                <input
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Opening Hour</label>
                <input
                  type="text"
                  value={openingHour}
                  onChange={(e) => setOpeningHour(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Map Link</label>
                <input
                  type="url"
                  value={mapLink}
                  onChange={(e) => setMapLink(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Direction</label>
                <input
                  type="text"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select Category</option>
                  {(categories || []).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Add Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {previewImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold"
                  disabled={loader}
                >
                  {loader ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PlaceTabSec;
