import React from 'react';
import { MapPin, Star, User, Trees, Mountain, Sunrise } from 'lucide-react';
import Navbar from '../components/Navbar';

function App() {
  const sections = [
    {
      title: "Best Mountain Camping Spots",
      icon: Mountain,
      userName: "Alex Mountaineer",
      description: "Discover breathtaking mountain camping locations where the air is crisp and the views are endless. Perfect for adventurers seeking elevation and solitude.",
      spots: [
        { id: 1, name: "Alpine Ridge", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80" },
        { id: 2, name: "Eagle Peak", image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&q=80" },
        { id: 3, name: "Crystal Summit", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80" },
        { id: 4, name: "Granite Point", image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&q=80" },
        { id: 5, name: "Granite Point", image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&q=80" }
      ]
    },
    {
      title: "Serene Forest Campsites",
      icon: Trees,
      userName: "Sarah Wilderness",
      description: "Immerse yourself in the tranquility of forest camping. These spots offer the perfect blend of shade, wildlife encounters, and peaceful woodland atmosphere.",
      spots: [
        { id: 1, name: "Redwood Haven", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80" ,location : 'chittagong' },
        { id: 2, name: "Pine Valley", image: "https://images.unsplash.com/photo-1600081728723-c8aa2ee3236a?auto=format&fit=crop&q=80" ,location: 'Dhaka' },
        { id: 3, name: "Mossy Grove", image: "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?auto=format&fit=crop&q=80" , location: 'chittagong'},
        { id: 4, name: "Fern Canyon", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?auto=format&fit=crop&q=80" ,location: 'borisal' }
      ]
    },
    {
      title: "Lakeside Camping Paradise",
      icon: Sunrise,
      userName: "Mike Waters",
      description: "Experience the magic of waterfront camping. Wake up to misty mornings and spend your days by crystal-clear waters perfect for swimming and fishing.",
      spots: [
        { id: 1, name: "Mirror Lake", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80" },
        { id: 2, name: "Blue Lagoon", image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?auto=format&fit=crop&q=80" },
        { id: 3, name: "Crystal Bay", image: "https://images.unsplash.com/photo-1510277861473-14b57fd7c7b8?auto=format&fit=crop&q=80" },
        { id: 4, name: "Emerald Shore", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&q=80" }
      ]
    }
  ];

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
                <section.icon className="w-8 h-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">{section.userName}</span>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {section.spots.map((spot) => (
                <div 
                  key={spot.id}
                  className="group relative overflow-hidden rounded-xl aspect-[4/3] transform hover:scale-105 transition-all duration-300 shadow-lg"
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
            </div>

            <p className="text-gray-600 max-w-3xl">{section.description}</p>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;