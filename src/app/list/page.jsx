'use client';
import React from 'react';
import Slider from 'react-slick';
import { MapPin, Star, User, Trees, Mountain, Sunrise } from 'lucide-react';
import Navbar from '../components/Navbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';

function App() {
  const [newComment, setNewComment] = React.useState("");
  const [comments, setComments] = React.useState([]);

  
  const sections = [
    {
      title: "Best Mountain Camping Spots",
      userName: "Raihan",
      userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb",
      description: "Discover the breathtaking beauty of Bangladesh's mountainous regions with these top camping spots. Nestled within the lush green hills of the Chittagong Hill Tracts, these campsites offer a perfect blend of adventure and tranquility. From the rolling hills of Bandarban to the serene peaks of Rangamati, each location promises stunning views, fresh mountain air, and the chance to immerse yourself in the rich cultural heritage of the indigenous communities. Wake up to misty mornings, trek through dense forests, and enjoy starlit nights by the campfire. Whether you're an avid trekker or simply seeking peace in nature, these mountain camping spots in Bangladesh will create unforgettable memories.",
      spots: [
        { id: 1, name: "Nilgiri Hills", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRltGRoSqSjk5aJz4fNvFp5l0MgYdLjoBsnfA&s", location: "Bandarban" },
        { id: 2, name: "Keokradong Peak", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80", location: "Bandarban" },
        { id: 3, name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s", location: "Rangamati" }
      ],
      comments: [
        { id: 1, user: "Ayesha", text: "This is my dream camping destination! Thank you for this lists." ,userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb"},
        { id: 2, user: "Rahim", text: "I've been to Sajek Valley, and it's magical!" ,userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",}
      ]
    },
    {
      title: "Beautiful Tourist Spots of Bangladesh",
      userName: "Salman",
      userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
      description: "Immerse yourself in the serene beauty of Bangladesh’s lakeside camping destinations. These peaceful retreats offer stunning views of crystal-clear waters, surrounded by lush greenery and vibrant wildlife. Perfect for nature lovers, you can spend your days kayaking, fishing, or simply soaking in the tranquility. As the sun sets, enjoy the soothing sounds of water lapping against the shore while sitting around a cozy campfire. Whether you're seeking adventure or relaxation, these lakeside spots provide an unforgettable escape into nature, with breathtaking sunrises and peaceful nights under the stars.",
      spots: [
        { id: 1, name: "Cox's Bazar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s", location: "Cox's Bazar" },
        { id: 2, name: "Sundarbans Mangrove Forest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jR47t5ZChiuOqnYRDbSwhxZCXy730nIACA&s", location: "Khulna" },
        { 
          id: 3, 
          name: "Ratargul Swamp Forest", 
          image: "https://www.travelmate.com.bd/wp-content/uploads/2019/07/Ratargul-2.jpg", 
          location: "Sylhet" 
        },
        { 
          id: 4, 
          name: "St. Martin's Island", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s", 
          location: "Teknaf" 
        }
      ],
      comments: [
        { id: 1, user: "Tanvir", text: "Sundarbans was a thrilling experience!" , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2", },
        { id: 2, user: "Lamia", text: "Cox's Bazar sunsets are unforgettable!" , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",}
      ]
    },
    {
      title: "Lakeside Camping Paradise",
      userName: "Miraj",
      userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
      description: "Discover the breathtaking beauty of Bangladesh through its diverse range of tourist destinations. From the serene beaches of Cox's Bazar to the lush green tea gardens of Sylhet, each location offers a unique blend of natural beauty, cultural heritage, and vibrant local life. Whether you're exploring the ancient ruins, cruising through the Sundarbans, or soaking in the tranquility of St. Martin's Island, these spots promise unforgettable experiences filled with adventure, history, and scenic charm.",
      spots: [
        { id: 1, name: "Kaptai Lake", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/77/22/14/amiakhum.jpg?w=900&h=500&s=1", location: "Rangamati" },
        { id: 2, name: "Foy's Lake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBcxMV7NTTXVwVyzmBkMAmjl98Af62bm7cg&s", location: "Chittagong" },

       { id: 3, 
        name: "Bichanakandi", 
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/a9/8b/44/sea-beach.jpg?w=900&h=-1&s=1",
        location: "Sylhet"
      },
      { 
        id: 4, 
        name: "Ratargul Swamp Forest", 
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&q=80",
        location: "Sylhet"
      }
      ],
      comments: [
        { id: 1, user: "Nasrin", text: "Kaptai Lake is a hidden gem!", userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2", },
        { id: 2, user: "Jahid", text: "Loved the peaceful vibes at Foy's Lake.", userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2", }
      ]
    }
  ];
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <div className="min-h-screen bg-white">
        <div className="shadow-lg w-full">
        <Navbar />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
    
      {sections.map((section, index) => (
          <section key={index} className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
              
              <Link href={`/list/${encodeURIComponent(section.title)}`}>
  <h2 className="text-xl lg:text-3xl font-bold text-gray-900">{section.title}</h2>
</Link>

              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">{section.userName}</span>
                <div className="w-10 h-10 rounded-full overflow-hidden ml-5 "> 
          <img 
            src={section.userAvatar} 
            alt={section.userName} 
            className="w-full h-full object-cover"
          />
        </div>
              </div>
            </div>
           
            <div className=""> {/* Add padding to the container for consistent edge spacing */}
  <Slider {...settings}>
    {section.spots.map((spot) => (
      <div 
        key={spot.id}
        className="group relative overflow-hidden rounded-xl aspect-[4/3] transform hover:scale-105 transition-all duration-300 shadow-lg " 
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <img 
          src={spot.image} 
          alt={spot.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-lg font-semibold text-white">{spot.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-white/80">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.8</span>
            <MapPin className="w-4 h-4 text-emerald-400 ml-2" />
            <span>{spot.location}</span>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>

          
<p className="text-gray-600 max-w-6xl">{section.description}</p>

{/* Comments Section */}
<div className="mt-6 max-w-6xl bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-3">Comments</h2>

    {section.comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-4 mb-5">
            <img 
                src={comment.userAvatar} 
                alt={comment.userName} 
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-800">{comment.userName}</p>
                    <p className="text-xs text-gray-400">{comment.timestamp}</p>
                </div>
                <p className="text-gray-800 mt-1">{comment.text}</p>
            </div>
        </div>
    ))}

    {/* Comment Box */}
    <div className="mt-4 flex items-start space-x-3 border-t pt-4">
        <img 
            src="https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb" 
            alt="Your Avatar" 
            className="w-10 h-10 rounded-full object-cover"
        />
        <textarea 
            className="w-full p-3 bg-gray-100 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
            placeholder="Add a comment..."
            rows="2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button 
            className={`bg-[#8cc163] text-white text-sm py-2 px-4 rounded-full hover:bg-green-700 transition ${
                newComment.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => {
                if (newComment.trim() !== '') {
                    setComments([
                        ...comments,
                        {
                            id: comments.length + 1,
                            userName: "Your Name",
                            userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb",
                            text: newComment,
                            timestamp: new Date().toLocaleString(),
                        },
                    ]);
                    setNewComment("");
                }
            }}
            disabled={newComment.trim() === ''}
        >
            Post
        </button>
    </div>
</div>







          </section>
        ))}
      
      </main>
    </div>
  );
}

export default App;