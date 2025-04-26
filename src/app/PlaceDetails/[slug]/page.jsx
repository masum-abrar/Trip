'use client'
import Navbar from "@/app/components/Navbar";
import React, { useState ,useEffect} from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material"; // Using Material UI for Modal
import { FaStar, FaRegStar,FaImage } from "react-icons/fa"; // Star rating icons
import DiscussTabSection from "@/app/components/DiscussionTabSection";
import EventTabSection from "@/app/components/EventTabSection";
import ReviewsTabSection from "@/app/components/ReviewsTabSection";
import Link from "next/link";
import Cookies from "js-cookie";
// const places = [
//   { id: 1, title: "Jaflong", district: "Sylhet",  subDistict:"Moulobibazar",  description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg", eyeCount: "990k", dotCount: "194k", heartCount: "366k" },
//   { id: 2, title: "Saint Martin", district: "CoxsBazar", subDistict:"Teknaf", description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg", eyeCount: "890k", dotCount: "134k", heartCount: "456k" },
//   { id: 3, title: "Inani", subDistict:"Ukhia", district: "Chittagong", description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg", eyeCount: "750k", dotCount: "294k", heartCount: "266k" },
//   { id: 4, title: "Patuartek", subDistict:"Ukhia", district: "CoxsBazar",  description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg", eyeCount: "620k", dotCount: "394k", heartCount: "166k" },
// ];

const PlaceDetails = ({ params }) => {
  const slug = params.slug;
 
  const cookiesuserId = Cookies.get("userId");

  // State for Modal & Rating
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBucketModalOpen, setBucketModalOpen] = useState(false);
  const [isListModalOpen, setListModalOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState(null);
 
  const [place, setPlace] = useState(null);
  const [community, setCommunity] = useState(null);

  // State for Active Tab
  const [activeTab, setActiveTab] = useState('Reviews');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  

  // if (!place) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <h1 className="text-2xl font-bold text-red-500">Place not found!</h1>
  //     </div>
  //   );
  // }


  // const params = useParams();


 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/places/${slug}`);
       
        const data = await response.json();
        setPlace(data.data);
      } catch (err) {
        console.error('Failed to fetch place:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPlace();
    }
  }, [slug]);
  const districtName = place?.district?.slug;
    useEffect(() => {
      const fetchCommunity = async () => {
        // Get the district name from the place object
        if (!districtName) return; // Exit if district name is not available
        try {
          const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/districts/${districtName}`);
          const data = await response.json();
          setCommunity(data.data); 
        } catch (error) {
          console.error('Failed to fetch community:', error);
        }
      };
  
      if (districtName) {
        fetchCommunity();
      }
    }, [districtName]);

    const handleSave = async () => {
      const payload = {
        userId: cookiesuserId,
        placeId :place?.id,
        title,
        description,
        targetDate: date,
        isActive: privacy === "Public" ? "true" : "false",
      };
  
      try {
        const res = await fetch("https://parjatak-core.vercel.app/api/v1/diaries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
        console.log("Diary Saved:", data);
        
        setModalOpen(false); // Close modal after saving
      } catch (error) {
        console.error("Failed to save diary:", error);
      }
    };

    const handleSaveBucketList = async () => {
      const payload = {
        userId: cookiesuserId,
        placeId :place?.id,
        title,
        description,
        targetDate: date,
        isActive: privacy === "Public" ? "true" : "false",
       
      };
    
      try {
        const res = await fetch("https://parjatak-core.vercel.app/api/v1/bucketLists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        const data = await res.json();
        console.log("Bucket added:", data);
        if (res.ok) {
          toast.success("Added to Bucket List!");
          setBucketModalOpen(false);
        } else {
          toast.error(data.message || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        toast.error("Network error!");
      }
    };
    
  return (
    <div className="bg-white">
      {/* Navbar */}
      <div className="shadow-lg w-full">
        <Navbar />
      </div>

      {/* Place Details Section */}
      <div className=" flex flex-col items-center justify-center pt-12 p-6">
      {/* <h1 className="hidden">{place.title}</h1>  */}
      <div className="relative w-full max-w-6xl mx-auto group">
  {/* Background Image with Overlay */}
  <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
    <img
      src={place?.images[0]?.image || place?.image}
      alt={place?.title}
      className="w-full h-full object-cover"
    />
    {/* Gradient Overlay (Hidden on Hover) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 opacity-100 group-hover:opacity-0"></div>

    {/* Place Name & Stats Overlay */}
    <div className="absolute bottom-6 left-6 text-white transition-opacity duration-300 ">
      <h1 className="text-3xl md:text-4xl font-extrabold">{place?.name}</h1>
      {place && place.district ? (
  <h1 className="text-base font-normal mt-2">{place.district.name}</h1>
) : (
  <h1 className="text-base font-normal mt-2 text-gray-400">Loading district...</h1>
)}
      <div className="flex space-x-4 mt-2 text-lg font-medium">
        <span className="flex items-center space-x-1">
          👁 <span>{place?.viewCount}</span>
        </span>
        <span className="flex items-center space-x-1">
          💬 <span>{place?.dotCount}</span>
        </span>
        <span className="flex items-center space-x-1">
          ❤️ <span>{place?.heartCount}</span>
        </span>
      </div>
    </div>
  </div>
</div>


        {/* Buttons Section */}
        <div className="flex flex-wrap gap-3 mt-6">
  {[
    { icon: "📖", text: "Add to Diary", onClick: () => setModalOpen(true) },
    { icon: "📌", text: "Add to Bucket List",  onClick: () => setBucketModalOpen(true) },
    { icon: "📂", text: "Add to List", onClick : () => setListModalOpen(true) },
    { icon: "⭐", text: "Add to Favorite Place" },
    { icon: "🚶", text: "12k Visitor" },
    { icon: "✅", text: "Visited" },
  ].map((button, index) => (
    <button
      key={index}
      onClick={button.onClick} // Add the onClick handler here
      className="relative px-6 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-800 shadow-lg transition-all duration-300 overflow-hidden group"
    >
      {/* Default Text */}
      <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
        {button.icon} {button.text}
      </span>

      {/* Gradient Hover Background Effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 left-0 w-full h-full scale-0 origin-center transition-transform duration-300 ease-in-out group-hover:scale-100"></span>
    </button>
  ))}
  
</div>


{/* Description */}
<div 
  className="mt-4 p-5 max-w-4xl mx-auto bg-white text-black text-base leading-relaxed rounded-xl shadow-lg border  
             backdrop-blur-lg bg-opacity-30 hover:shadow-blue-500/50 transition-all"
>
  <p className={expanded ? "line-clamp-none" : "line-clamp-3"}>
    {place?.description}
  </p>

  {/* Read More / Less Button */}
  <button 
    onClick={() => setExpanded(!expanded)} 
    className="mt-3 text-sm font-semibold text-black hover:text-gray-400 transition"
  >
    {expanded ? "Read Less ▲" : "Read More ▼"}
  </button>
</div>

<div className= "mt-8 group flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-blue-500/50  backdrop-blur-lg bg-opacity-30">
 <Link href={`/district/${place?.district?.name.toLowerCase()}`}>
 {place && place.district ? (
  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-[#8cc163]">
    {place.district.name} <span className="text-[#8cc163]">Community</span>
  </h1>
) : (
  <h1 className="text-2xl lg:text-3xl font-bold text-gray-400">Loading Community...</h1>
)}
 </Link>
  <button className="bg-[#8cc163] text-white px-12 lg:px-10  py-2  lg:ml-4 rounded-xl shadow-md text-lg lg:text-2xl font-bold transition-all duration-300 transform hover:scale-110 hover:bg-[#6fb936] hover:shadow-lg">
    Join
  </button>
</div>

    {/* <DescriptionBox description={place.description} /> */}


      </div>

      {/* Modal for Adding to Diary */}
      <Dialog className="max-w-[500px] mx-auto p-6" open={isModalOpen} onClose={() => setModalOpen(false)}>
  <DialogTitle className="text-center font-bold text-gray-900">📖 Add to Diary</DialogTitle>
  <DialogContent className="lg:w-[350px]">

    {/* Form Start */}
    <form
      onSubmit={(e) => {
        e.preventDefault(); // prevent page reload
        handleSave();
      }}
    >
      {/* Title Input */}
      <div className="mt-3">
        <label className="font-semibold text-gray-800">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
          placeholder="Enter diary title..."
          required
        />
      </div>

      {/* Description Input */}
      <div className="mt-3">
        <label className="font-semibold text-gray-800">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
          placeholder="Write your description..."
          required
        />
      </div>

      {/* Date Picker */}
      <div className="mt-3">
        <label className="font-semibold text-gray-800">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
          required
        />
      </div>

      {/* Privacy Options */}
      <div className="mt-3">
        <label className="font-semibold text-gray-800">Privacy:</label>
        <select
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-gray-800"
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          required
        >
          <option value="Public">🌍 Public</option>
          <option value="Private">🔒 Private</option>
        </select>
      </div>

      {/* Save & Cancel Buttons */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 ml-2 bg-[#8cc163] text-white rounded-md hover:bg-[#79c340]"
        >
          Save
        </button>
      </div>
    </form>
    {/* Form End */}

  </DialogContent>
</Dialog>

  {/* Modal for Adding to BucketList */}

{isBucketModalOpen && (
  <Dialog
    className="max-w-[500px] mx-auto p-6"
    open={isBucketModalOpen}
    onClose={() => setBucketModalOpen(false)}
  >
    <DialogTitle className="text-center font-bold text-gray-900">📌 Add to Bucket List</DialogTitle>
  <DialogContent className="lg:w-[350px]">

    {/* Title */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Enter title..."
      />
    </div>

    {/* Description */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Write description..."
      />
    </div>

    {/* Date */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Target Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>

    {/* Privacy */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Privacy:</label>
      <select
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value="Public">🌍 Public</option>
        <option value="Private">🔒 Private</option>
      </select>
    </div>

   

    {/* Save & Cancel */}
    <div className="flex justify-end mt-4">
      <button onClick={() => setBucketModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
        Cancel
      </button>
      <button onClick={handleSaveBucketList} className="px-4 py-2 ml-2 bg-[#8cc163] text-white rounded-md hover:bg-[#79c340]">
        Save
      </button>
    </div>
  </DialogContent>
  </Dialog>
)}


{isListModalOpen && (
  <Dialog
    className="max-w-[500px] mx-auto p-6"
    open={isListModalOpen}
    onClose={() => setListModalOpen(false)}
  >
    <DialogTitle className="text-center font-bold text-gray-900">📌 Add to Bucket List</DialogTitle>
  <DialogContent className="lg:w-[350px]">

    {/* Title */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Enter title..."
      />
    </div>

    {/* Description */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Write description..."
      />
    </div>

    {/* Date */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Target Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>

    {/* Privacy */}
    <div className="mt-3">
      <label className="font-semibold text-gray-800">Privacy:</label>
      <select
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value="Public">🌍 Public</option>
        <option value="Private">🔒 Private</option>
      </select>
    </div>

   

    {/* Save & Cancel */}
    <div className="flex justify-end mt-4">
      <button onClick={() => setBucketModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
        Cancel
      </button>
      <button onClick={handleSaveBucketList} className="px-4 py-2 ml-2 bg-[#8cc163] text-white rounded-md hover:bg-[#79c340]">
        Save
      </button>
    </div>
  </DialogContent>
  </Dialog>
)}
      <div className="flex justify-center mt-10">
        {[ 'Reviews', 'Events', 'Discussion' ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-[#8cc163] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Events' && (
         <div className="max-w-3xl mx-auto mt-6">
        <EventTabSection hidePlaceSelection={true} />
          </div>
        )}
         {activeTab === 'Discussion' && (
         <div className="max-w-3xl mx-auto mt-6">
        <DiscussTabSection hidePlaceSelection={true} locationData={community} />
          </div>
        )}
         {activeTab === 'Reviews' && (
         <div className="max-w-3xl mx-auto mt-6">
       <ReviewsTabSection  locationData={place}/>
          </div>
        )}
    </div>
  );
};

export default PlaceDetails;
