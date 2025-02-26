import React from 'react'

import { FaUserCircle, FaReply, FaStar,FaPaperPlane ,FaImage} from "react-icons/fa";
import { MapPin, Star, User, Trees, Mountain, Sunrise } from 'lucide-react';
import Link from 'next/link';


const PlaceTabSec = () => {
    const sections = [
        {
          district: "Chittagong",
          userName: "Raihan",
          userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb",
          description: "Discover the breathtaking beauty of Bangladesh's mountainous regions with these top camping spots. Nestled within the lush green hills of the Chittagong Hill Tracts, these campsites offer a perfect blend of adventure and tranquility. From the rolling hills of Bandarban to the serene peaks of Rangamati, each location promises stunning views, fresh mountain air, and the chance to immerse yourself in the rich cultural heritage of the indigenous communities. Wake up to misty mornings, trek through dense forests, and enjoy starlit nights by the campfire. Whether you're an avid trekker or simply seeking peace in nature, these mountain camping spots in Bangladesh will create unforgettable memories.",
          spots: [
            { id: 1, name: "Nilgiri Hills", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRltGRoSqSjk5aJz4fNvFp5l0MgYdLjoBsnfA&s", location: "Bandarban" },
            { id: 2, name: "Keokradong Peak", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80", location: "Bandarban" },
            { id: 3, name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s", location: "Rangamati" },
            { id: 4, name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s", location: "Rangamati" },
            { id: 5, name: "Sajek Valley", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMYfRyMfHfqDgZKMaN9Cpj_Oh-7p943OXnQ&s", location: "Rangamati" }
          ],
          comments: [
            { id: 1, user: "Ayesha", text: "This is my dream camping destination! Thank you for this lists." ,userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/6/4/9/8/2/8/0/shard/avtr-0-48-0-48-crop.jpg?v=f09b89dacb"},
            { id: 2, user: "Rahim", text: "I've been to Sajek Valley, and it's magical!" ,userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",}
          ]
        },
        {
          district: "Dhaka",
          userName: "Salman",
          userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",
          description: "Immerse yourself in the serene beauty of Bangladesh’s lakeside camping destinations. These peaceful retreats offer stunning views of crystal-clear waters, surrounded by lush greenery and vibrant wildlife. Perfect for nature lovers, you can spend your days kayaking, fishing, or simply soaking in the tranquility. As the sun sets, enjoy the soothing sounds of water lapping against the shore while sitting around a cozy campfire. Whether you're seeking adventure or relaxation, these lakeside spots provide an unforgettable escape into nature, with breathtaking sunrises and peaceful nights under the stars.",
          spots: [
            { id: 1, name: "Cox's Bazar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s", location: "Cox's Bazar" },
            { id: 2, name: "Sundarbans Mangrove Forest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jR47t5ZChiuOqnYRDbSwhxZCXy730nIACA&s", location: "Nawabganj" },
            { 
              id: 3, 
              name: "Ratargul Swamp Forest", 
              image: "https://www.travelmate.com.bd/wp-content/uploads/2019/07/Ratargul-2.jpg", 
              location: "Savar" 
            },
            { 
              id: 4, 
              name: "St. Martin's Island", 
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdc6c_s_wrlJABb7pNAIjWYPR8YYNtJbuog&s", 
              location: "Teknaf" 
            }
          ],
          comments: [
            { id: 1, user: "Tanvir", text: "Sundarbans was a thrilling experience!" , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/0/5/4/4/6/4/5/shard/avtr-0-32-0-32-crop.jpg?v=7a65c3aaf9", },
            { id: 2, user: "Lamia", text: "Cox's Bazar sunsets are unforgettable!" , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/2/8/1/8/8/8/4/shard/avtr-0-32-0-32-crop.jpg?v=ea8982a291",}
          ]
        },
        {
          district: "Sylhet",
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



     
  return (
    <div>

<main className="max-w-7xl mx-auto px-4 py-8 space-y-16 ">
    
{sections.map((section, index) => (
  <section key={index} className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {section.spots.map((spot) => (
        <Link key={spot.id} href={`/PlaceDetails/${spot.id}`} passHref>
          <div 
            className="group relative overflow-hidden rounded-xl aspect-[4/3] transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
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
        </Link>
      ))}
    </div>
  </section>
))}


    
    </main>
    </div>
  )
}

export default PlaceTabSec