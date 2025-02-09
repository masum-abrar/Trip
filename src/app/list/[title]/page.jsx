'use client'
import React from 'react';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';

const Page = ({ params }) => {
    const decodedTitle = decodeURIComponent(params.title);
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
          { id: 2, user: "Rahim", text: "I've been to Sajek Valley, and it's magical!" ,userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",},
          { id: 3, user: "Lina", text: "Wow, the views are breathtaking! Adding this to my bucket list." , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/2/9/9/5/3/6/6/shard/avtr-0-48-0-48-crop.jpg?v=c801011e1b" },  
{ id: 4, user: "Kamal", text: "Great recommendation! I’d love to go camping there someday." , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/4/1/2/4/7/6/2/shard/avtr-0-48-0-48-crop.jpg?v=5213b50264" }  

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
          { id: 2, user: "Lamia", text: "Cox's Bazar sunsets are unforgettable!" , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2",},
          { id: 3, user: "Lina", text: "Wow, the views are breathtaking! Adding this to my bucket list." , userAvatar: "https://a.ltrbxd.com/resized/avatar/twitter/2/3/7/6/6/9/shard/http___pbs.twimg.com_profile_images_1164765400623538176_BSfKiCy6-0-48-0-48-crop.jpg?v=46dcb79593" },  
{ id: 4, user: "Kamal", text: "Great recommendation! I’d love to go camping there someday." , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/4/6/7/2/3/9/9/shard/avtr-0-48-0-48-crop.jpg?v=c892092259" }  

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
          { id: 2, user: "Jahid", text: "Loved the peaceful vibes at Foy's Lake.", userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/9/4/1/6/5/6/2/shard/avtr-0-48-0-48-crop.jpg?v=0c98965dc2", },
          { id: 3, user: "Lina", text: "Wow, the views are breathtaking! Adding this to my bucket list." , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/2/8/1/8/8/8/4/shard/avtr-0-32-0-32-crop.jpg?v=ea8982a291" },  
{ id: 4, user: "Kamal", text: "Great recommendation! I’d love to go camping there someday." , userAvatar: "https://a.ltrbxd.com/resized/avatar/upload/1/0/5/4/4/6/4/5/shard/avtr-0-32-0-32-crop.jpg?v=7a65c3aaf9" }  

        ]
      }
    ];

    const section = sections.find(section => section.title === decodedTitle);

    if (!section) {
        return <div>Section not found!</div>;
    }

    // Get unique locations
    const uniqueLocations = [...new Set(section.spots.map(spot => spot.location))];

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
        objectPosition="center"  // Focus on the top part of the image
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
                    {section.spots.map(spot => (
                        <div key={spot.id} className=" rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform duration-300">
                            <Image 
                                src={spot.image} 
                                alt={spot.name} 
                                width={400} 
                                height={300} 
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4 text-black bg-white bg-opacity-10">
                                <h3 className="font-semibold text-xl">{spot.name}</h3>
                                {/* <p className="text-sm text-gray-300">{spot.location}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Comments */}
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
            </div>
            
        </div>
    );
};

export default Page;
