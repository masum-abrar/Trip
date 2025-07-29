import React from 'react'
import { useState, useEffect } from 'react';
import { FaUserCircle, FaReply, FaStar,FaPaperPlane ,FaImage} from "react-icons/fa";
import { MapPin, Star, User, Trees, Mountain, Sunrise ,Plus} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const PlaceTabSec = ({PlaceData}) => {
    // const sections = [
    //     {
    //       district: "Chittagong",
    //       userName: "Raihan",
    //       userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb",
    //       description: "Discover the breathtaking beauty of Bangladesh's mountainous regions with these top camping spots. Nestled within the lush green hills of the Chittagong Hill Tracts, these campsites offer a perfect blend of adventure and tranquility. From the rolling hills of Bandarban to the serene peaks of Rangamati, each location promises stunning views, fresh mountain air, and the chance to immerse yourself in the rich cultural heritage of the indigenous communities. Wake up to misty mornings, trek through dense forests, and enjoy starlit nights by the campfire. Whether you're an avid trekker or simply seeking peace in nature, these mountain camping spots in Bangladesh will create unforgettable memories.",
    //       spots: [
    //         { id: 1, name: "Nilgiri Hills", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRltGRoSqSjk5aJz4fNvFp5l0MgYdLjoBsnfA&s", location: "Bandarban" },
    //         { id: 2, name: "Keokradong Peak", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80", location: "Bandarban" },
    //         { id: 3, name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s", location: "Rangamati" },
    //         { id: 4, name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s", location: "Rangamati" },
    //         { id: 5, name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s", location: "Rangamati" }
    //       ],
    //       comments: [
    //         { id: 1, user: "Ayesha", text: "This is my dream camping destination! Thank you for this lists." ,userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb"},
    //         { id: 2, user: "Rahim", text: "I've been to Sajek Valley, and it's magical!" ,userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",}
    //       ]
    //     },
    //     {
    //       district: "Dhaka",
    //       userName: "Salman",
    //       userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
    //       description: "Immerse yourself in the serene beauty of Bangladesh’s lakeside camping destinations. These peaceful retreats offer stunning views of crystal-clear waters, surrounded by lush greenery and vibrant wildlife. Perfect for nature lovers, you can spend your days kayaking, fishing, or simply soaking in the tranquility. As the sun sets, enjoy the soothing sounds of water lapping against the shore while sitting around a cozy campfire. Whether you're seeking adventure or relaxation, these lakeside spots provide an unforgettable escape into nature, with breathtaking sunrises and peaceful nights under the stars.",
    //       spots: [
    //         { id: 1, name: "Cox's Bazar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s", location: "Cox's Bazar" },
    //         { id: 2, name: "Sundarbans Mangrove Forest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jR47t5ZChiuOqnYRDbSwhxZCXy730nIACA&s", location: "Nawabganj" },
    //         { 
    //           id: 3, 
    //           name: "Ratargul Swamp Forest", 
    //           image: "https://www.travelmate.com.bd/wp-content/uploads/2019/07/Ratargul-2.jpg", 
    //           location: "Savar" 
    //         },
    //         { 
    //           id: 4, 
    //           name: "St. Martin's Island", 
    //           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s", 
    //           location: "Teknaf" 
    //         }
    //       ],
    //       comments: [
    //         { id: 1, user: "Tanvir", text: "Sundarbans was a thrilling experience!" , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/0/5/4/4/6/4/5/shard/avtr-0-32-0-32-crop.jpg?v=7a65c3aaf9", },
    //         { id: 2, user: "Lamia", text: "Cox's Bazar sunsets are unforgettable!" , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/2/8/1/8/8/8/4/shard/avtr-0-32-0-32-crop.jpg?v=ea8982a291",}
    //       ]
    //     },
    //     {
    //       district: "Sylhet",
    //       userName: "Miraj",
    //       userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
    //       description: "Discover the breathtaking beauty of Bangladesh through its diverse range of tourist destinations. From the serene beaches of Cox's Bazar to the lush green tea gardens of Sylhet, each location offers a unique blend of natural beauty, cultural heritage, and vibrant local life. Whether you're exploring the ancient ruins, cruising through the Sundarbans, or soaking in the tranquility of St. Martin's Island, these spots promise unforgettable experiences filled with adventure, history, and scenic charm.",
    //       spots: [
    //         { id: 1, name: "Kaptai Lake", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/77/22/14/amiakhum.jpg?w=900&h=500&s=1", location: "Rangamati" },
    //         { id: 2, name: "Foy's Lake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBcxMV7NTTXVwVyzmBkMAmjl98Af62bm7cg&s", location: "Chittagong" },
    
    //        { id: 3, 
    //         name: "Bichanakandi", 
    //         image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/a9/8b/44/sea-beach.jpg?w=900&h=-1&s=1",
    //         location: "Sylhet"
    //       },
    //       { 
    //         id: 4, 
    //         name: "Ratargul Swamp Forest", 
    //         image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&q=80",
    //         location: "Sylhet"
    //       }
    //       ],
    //       comments: [
    //         { id: 1, user: "Nasrin", text: "Kaptai Lake is a hidden gem!", userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2", },
    //         { id: 2, user: "Jahid", text: "Loved the peaceful vibes at Foy's Lake.", userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2", }
    //       ]
    //     }
    //   ];

const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationData, setLocationData] = useState(null);
  const districtId = PlaceData?.id; // State to hold the location data
  const divisionId = PlaceData?.division?.id; // State to hold the location data
  const [showModal, setShowModal] = useState(false);

  

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
const [categories, setCategories] = useState([]);

const [images, setImages] = useState([]);
const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://parjatak-backend.vercel.app/api/v1/place-categories");
        const data = await res.json();
        setCategories(data?.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
  
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/districts-places/${districtId}`);
        const data = await response.json();
        setLocationData(data.data);
      } catch (error) {
        console.error('Failed to fetch community:', error);
      }
    };
  
    if (districtId) {
      fetchCommunity();
    }
  }, [districtId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append("name", name);
    formData.append("divisionId", divisionId);
    formData.append("districtId", districtId);
    formData.append("categoryId", categoryId);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("priceRange", priceRange);
    formData.append("phone", phone);
    formData.append("openingHour", openingHour);
    formData.append("mapLink", mapLink);
    formData.append("direction", direction);
    formData.append("isActive",  "false");
  
    images.forEach((img, i) => {
      formData.append(`images`, img); 
    });
  
    try {
      const res = await fetch("https://parjatak-backend.vercel.app/api/v1/places", {
        method: "POST",
        body: formData,
      });
  
      if (res.ok) {
        toast.success("Place added successfully! Wait for admin approval.");
        setShowModal(false);
      } else {
        const err = await res.json();
        console.error("Failed to submit:", err);
        toast.error("Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };
  
     
  return (
    <div>

<main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      <section className="space-y-6">
        {/* Add Place Button */}
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
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {locationData?.map((spot) => (
  <Link key={spot.slug} href={`/PlaceDetails/${spot.slug}`}>
    <div className="group relative overflow-hidden rounded-xl aspect-[4/3] transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
      
      {/* Swiper for multiple images */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {spot.images.map((img, idx) => (
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

      {/* Info Overlay */}
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
      </section>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 ">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 mt-10 mb-6">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-semibold">Add New Place</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-600 hover:text-red-500 font-bold text-xl"
        >
          &times;
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Tags (Separate by comma)</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Price Range</label>
          <input
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Opening Hour</label>
          <input
            type="text"
            value={openingHour}
            onChange={(e) => setOpeningHour(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Map Link</label>
          <input
            type="url"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Direction</label>
          <input
            type="text"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* <div>
          <label className="block font-medium">Division</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={divisionId}
            onChange={(e) => setDivisionId(e.target.value)}
          >
            <option value="">Select Division</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div> */}

        {/* <div>
          <label className="block font-medium">District</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div> */}

<div>
  <label className="block font-medium">Category</label>
  <select
    className="w-full border rounded px-3 py-2"
    value={categoryId}
    onChange={(e) => setCategoryId(e.target.value)}
  >
    <option value="">Select Category</option>
    {categories.map((c) => (
      <option key={c.id} value={c.id}>{c.name}</option>
    ))}
  </select>
</div>



        {/* <div>
          <label className="block font-medium">Active?</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="isActive"
                value="true"
                checked={isActive === "true"}
                onChange={(e) => setIsActive(e.target.value)}
              />
              Yes
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="isActive"
                value="false"
                checked={isActive === "false"}
                onChange={(e) => setIsActive(e.target.value)}
              />
              No
            </label>
          </div>
        </div> */}

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
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </main>
    <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default PlaceTabSec