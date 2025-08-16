'use client'
import Navbar from "@/app/components/Navbar";
import React, { useState ,useEffect, use} from "react";
import { Dialog, DialogContent, DialogTitle ,IconButton,TextField ,Button , Avatar, DialogActions } from "@mui/material"; // Using Material UI for Modal
import { FaStar, FaRegStar,FaImage } from "react-icons/fa"; // Star rating icons
import DiscussTabSection from "@/app/components/DiscussionTabSection";
import EventTabSection from "@/app/components/EventTabSection";
import ReviewsTabSection from "@/app/components/ReviewsTabSection";
import Link from "next/link";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation"; // ✅ correct for App Router


// const places = [
//   { id: 1, title: "Jaflong", district: "Sylhet",  subDistict:"Moulobibazar",  description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-2-1024x585.jpg", eyeCount: "990k", dotCount: "194k", heartCount: "366k" },
//   { id: 2, title: "Saint Martin", district: "CoxsBazar", subDistict:"Teknaf", description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Best-Bangladeshi-landmarks-1024x585.jpg", eyeCount: "890k", dotCount: "134k", heartCount: "456k" },
//   { id: 3, title: "Inani", subDistict:"Ukhia", district: "Chittagong", description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Must-see-places-in-Bangladesh-1024x585.jpg", eyeCount: "750k", dotCount: "294k", heartCount: "266k" },
//   { id: 4, title: "Patuartek", subDistict:"Ukhia", district: "CoxsBazar",  description: "Nestled along the southeastern coastline of Bangladesh, Cox’s Bazar is a breathtaking paradise famous for its 120 km long unbroken golden sand beach, making it the longest natural sea beach in the world. Known for its serene ocean views, rolling waves, and mesmerizing sunsets, this coastal town attracts millions of tourists every year. Whether you are a nature lover, an adventure seeker, or someone looking for a peaceful retreat, Cox’s Bazar offers something for everyone.", image: "https://tripjive.com/wp-content/uploads/2024/09/Bangladesh-tourist-spots-1-1024x585.jpg", eyeCount: "620k", dotCount: "394k", heartCount: "166k" },
// ];

const PlaceDetails = ({ params }) => {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug;
 
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
  const [spotModalOpen, setSpotModalOpen] = useState(false);
   const [selectedList, setSelectedList] = useState("");
     const [lists, setLists] = useState([]);

     const [events, setEvents] = useState([]);
  

//new code for review 

 const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    privacy: "Public",
    date: "",
    images: [],
    replies: [],
    likes: 0,
    user: ["User"],
  });

  const handleReviewSubmit = async () => {
  try {
    const userId = Cookies.get("userId");

    // Login check
    if (!userId) {
      toast.error("You need to log in first to add a diary.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      return;
    }

    // Validation: check required fields
    if (!newReview.comment?.trim()) {
      toast.error("Please write a comment for your diary.");
      return;
    }
    if (!newReview.rating || newReview.rating < 1) {
      toast.error("Please select a rating.");
      return;
    }
    if (!newReview.date) {
      toast.error("Please select a date.");
      return;
    }

    const formData = new FormData();
    formData.append("placeId", place?.id);
    formData.append("userId", userId);
    formData.append("rating", newReview.rating);
    formData.append("comment", newReview.comment);
    formData.append("date", newReview.date);

    if (newReview.images?.length > 0) {
      newReview.images.forEach((file) => formData.append("images", file));
    }

    const res = await fetch(
      "https://parjatak-backend.vercel.app/api/v1/customer/create-place-review",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Failed to submit review");

    toast.success("✅ Diary has been created!");
    setModalOpen(false);
    setNewReview({ rating: 0, comment: "", date: "", images: [] }); // Reset form
  } catch (error) {
    console.error(error);
    toast.error("Failed to submit review");
  }
};

      const handleDeleteReview = async (reviewId) => {
        const userId = Cookies.get("userId"); // Current user's ID
        const accessToken = Cookies.get("token"); // JWT Token
    
        if (!userId || !accessToken) {
          toast.error("User not authenticated!");
          return;
        }
    
        try {
          const response = await fetch(
            `https://parjatak-backend.vercel.app/api/v1/customer/delete-place-review/${reviewId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
    
          const data = await response.json();
    
          if (data.success) {
            toast.success("Review deleted successfully!");
            // Optionally, update the state to reflect the deletion (e.g., remove the review from the list)
            // For example: setLocationData(prevData => ({ ...prevData, review: prevData.review.filter(r => r.id !== reviewId) }));
          } else {
            toast.error(data.message || "Failed to delete review");
          }
        } catch (error) {
          console.error("Error deleting review:", error);
          toast.error("An error occurred while deleting the review.");
        }
      };


 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/places/${slug}`);
       
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

   const [mounted, setMounted] = useState(false);

  // ensure client-only rendering
  useEffect(() => setMounted(true), []);


  //   const fetchPlace = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://parjatak-backend.vercel.app/api/v1/customer/places/${slug}`
  //     );
  //     const data = await response.json();
  //     setPlace(data.data);
  //   } catch (err) {
  //     console.error("Failed to fetch place:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (slug) {
  //     fetchPlace();
  //   }
  // }, [slug]);


  // fetch place details
const fetchPlace = async () => {
  try {
    const response = await fetch(
      `https://parjatak-backend.vercel.app/api/v1/customer/places/${slug}`
    );
    const data = await response.json();
    setPlace(data.data);

    // 🔹 fetch only events
    setEvents(data?.data?.post?.filter((p) => p?.type === "event") || []);
  } catch (err) {
    console.error("Failed to fetch place or events:", err);
  } finally {
    setLoading(false);
  }
};

// fetch when slug
useEffect(() => {
  if (slug) {
    fetchPlace();
  }
}, [slug]);

// if (!mounted || loading) return <p>Loading...</p>;
// if (!place) return <p>No place data found</p>;



// // fetch place details
//   const fetchPlace = async () => {
//     try {
//       const response = await fetch(
//         `https://parjatak-backend.vercel.app/api/v1/customer/places/${slug}`
//       );
//       const data = await response.json();
//       setPlace(data.data);

//       // 🔹 fetch only events for this place
//       const placeEvents = data.data.post?.filter((p) => p.type === "event") || [];
//       setEvents(placeEvents);
//     } catch (err) {
//       console.error("Failed to fetch place or events:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // fetch when slug changes
//   useEffect(() => {
//     if (slug) {
//       fetchPlace();
//     }
//   }, [slug]);

//   if (!mounted || loading) return <p>Loading...</p>;
//   if (!place) return <p>No place data found</p>;

  const districtName = place?.district?.slug;
    useEffect(() => {
      const fetchCommunity = async () => {
        // Get the district name from the place object
        if (!districtName) return; // Exit if district name is not available
        try {
          const response = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/districts/${districtName}`);
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
      if (!cookiesuserId) {
        toast.error("You need to log in first to add a diary.");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        return;
      }
      const payload = {
        userId: cookiesuserId,
        placeId :place?.id,
        title,
        description,
        targetDate: date,
        isActive: privacy === "Public" ? "true" : "false",
      };
  
      try {
        const res = await fetch("https://parjatak-backend.vercel.app/api/v1/diaries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
       toast.success("Diary added successfully!");
        
        setModalOpen(false); // Close modal after saving
      } catch (error) {
        console.error("Failed to save diary:", error);
      }
    };

    const handleSaveBucketList = async () => {
      if (!cookiesuserId) {
        toast.error("You need to log in first to add to bucket list.");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        return;
      }
      const payload = {
        userId: cookiesuserId,
        placeId :place?.id,
        title,
        description,
        targetDate: date,
        isActive: privacy === "Public" ? "true" : "false",
       
      };
    
      try {
        const res = await fetch("https://parjatak-backend.vercel.app/api/v1/bucketLists", {
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
    

     // Fetch lists function
      const fetchLists = async () => {
        try {
          const response = await fetch("https://parjatak-backend.vercel.app/api/v1/customer/lists");
          const data = await response.json();
          const userLists = data.data.filter((list) => list.user.id === cookiesuserId);
          setLists(userLists);
        } catch (error) {
          console.error("Error fetching lists:", error);
        }
      };
    
      // Fetch on modal open
      useEffect(() => {
        if (spotModalOpen) {
        
          fetchLists();
        }
      }, [spotModalOpen]);


      const handleSpotSubmit = async () => {
       
        if (!cookiesuserId) {
          toast.error("You need to log first in to add a spot.");
          
          setTimeout(() => {
            router.push("/login");
          }, 3000); 
        
          return;
        }
        
        const payload = {
          userId : cookiesuserId,
          listId: selectedList,
          placeId: place?.id,
          isActive: true,
        };
    
        try {
          const response = await fetch("https://parjatak-backend.vercel.app/api/v1/add-lists-places", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
           toast.success("Spot added to list!");
            setSpotModalOpen(false);
            
            setSelectedList("");
          } else {
            alert("Failed to add spot!");
          }
        } catch (error) {
          console.error("Error posting spot:", error);
          alert("Something went wrong!");
        }
      };

      const [visited, setVisited] = useState(false);
      const placeId = place?.id;
      const userId = Cookies.get("userId");
      const hasVisited = place?.visitor?.some(v => v.userId === userId);


 const router = useRouter(); // Add this at top of component

 const handleVisitToggle = async () => {
  if (!cookiesuserId) {
    toast.error("You need to log in first to mark as visited.");
    
    setTimeout(() => {
      router.push("/login");
    }, 3000); 
  
    return;
  }
  if (!placeId || !userId) return;
  setLoading(true);
  

  const payload = { placeId, userId };

  try {
    const hasVisited = place.visitor.some(v => v.userId === userId);

    if (!hasVisited) {
      await fetch("https://parjatak-backend.vercel.app/api/v1/customer/create-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    
      place.visitor.push({ userId }); // ✅ manually add visitor
      setVisited(true);
    } else {
      await fetch("https://parjatak-backend.vercel.app/api/v1/customer/delete-visitor", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    
      place.visitor = place.visitor.filter(v => v.userId !== userId); // ✅ manually remove visitor
      setVisited(false);
    }
    

    // Soft reload to reflect updated visitor data
    router.refresh();

  } catch (err) {
    console.error("Visitor toggle failed", err);
  }

  setLoading(false);
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
    { icon: "📌", text: "Add to Bucket List", onClick: () => setBucketModalOpen(true) },
    { icon: "📂", text: "Add to List", onClick: () => setSpotModalOpen(true) },
    { icon: "🚶", text: place?.visitor ? `${place.visitor.length}` : "Loading..." },


    {
      icon: hasVisited ? "✅" : "☑️",
      text: hasVisited ? "Visited" : "Mark as Visited",
      onClick: handleVisitToggle,
    },
  ].map((button, index) => (
    <button
      key={index}
      onClick={button.onClick}
      disabled={loading && button.text.includes("Visit")}
      className={`relative px-6 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-800 shadow-lg transition-all duration-300 overflow-hidden group ${
        button.text === "Visited" ? "bg-green-600 text-white" : "bg-white text-gray-800"
      } ${button.text === "Mark as Visited" ? "bg-white text-gray-800" : ""
      }`}
    >
      <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
        {button.icon} {button.text}
      </span>
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
 <DialogTitle className="text-center">Add Your Diary</DialogTitle>
        <DialogContent>
          {/* Star Rating */}
          <div className="flex space-x-1">
            {[...Array(10)].map((_, index) => (
              <IconButton
                key={index}
                onClick={() =>
                  setNewReview({ ...newReview, rating: index + 1 })
                }
              >
                {index < newReview.rating ? (
                  <FaStar className="text-yellow-500 text-xl" />
                ) : (
                  <FaRegStar className="text-gray-300 text-sm" />
                )}
              </IconButton>
            ))}
          </div>

          {/* Review Input */}
          <TextField
            multiline
            rows={3}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Write your review..."
            className="bg-white"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />
          {/* Date */}
          <div className="mt-3">
            <label className="font-semibold text-gray-800">Date:</label>
            <input
              type="date"
              value={newReview.date}
              onChange={(e) =>
                setNewReview({ ...newReview, date: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mt-3">
            <Button
              sx={{
                backgroundColor: "#8cc163",
                color: "white",
                "&:hover": {
                  backgroundColor: "#7aad58",
                },
              }}
              component="label"
              startIcon={<FaImage />}
            >
              Upload Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    images: [...e.target.files].slice(0, 7),
                  })
                }
              />
            </Button>

            <p className="text-xs text-gray-500 mt-1">Max 7 images</p>

            {/* Preview Selected Images */}
            {newReview.images?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {newReview.images.map((file, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 border rounded overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <button
            onClick={handleReviewSubmit}
            className="bg-[#8cc163] px-4 py-2 text-white rounded-md"
          >
            ✅ Submit
          </button>
        </DialogActions>
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



  {spotModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div 
            className="bg-white p-6 rounded-lg w-11/12 md:w-1/3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
           
            <h2 className="text-xl font-bold mb-4 text-black">Add Spot to List</h2>
            <p className="text-red-600 text-sm mb-4">
    If you haven't created any list yet, please go to your profile and create one first.
  </p>
            {/* <div className="mb-4">
              <label className="block mb-1">Select Place</label>
              <select
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select a Place</option>
                {places.map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="mb-4">
              <label className="block mb-1 text-black">Select List</label>
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                className="w-full border p-2 rounded bg-white text-black"
              >
                <option value="">Select a List</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSpotModalOpen(false)}
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSpotSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </div>
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

      {/* {activeTab === 'Events' && (
         <div className="max-w-3xl mx-auto mt-6">
        <EventTabSection hidePlaceSelection={true} />
          </div>
        )} */}


           {activeTab === 'Events' && (
            <div className="max-w-3xl mx-auto mt-6">
          <EventTabSection
            hidePlaceSelection={true}
            PostData={place}
            events={events}   // 🔹 pass events state
            setEvents={setEvents} // 🔹 optional, if EventTabSection can update
            fetchPlace={fetchPlace} // 🔹 pass fetchPlace if you want refresh
          />

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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
         />
    </div>
  );
};

export default PlaceDetails;
