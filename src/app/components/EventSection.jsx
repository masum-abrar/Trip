import { useState } from "react";
import { FaImage, FaHeart, FaRegHeart, FaComment, FaUserCircle } from "react-icons/fa";

export default function EventSection() {
  const [newPost, setNewPost] = useState({ text: "", image: "", place: "", startDate: "", endDate: "" });
  const [events, setEvents] = useState([
    { id: 1, user: "John Doe", text: "Beach Cleanup Event", image: "https://via.placeholder.com/400", place: "Beach", startDate: "2025-03-01", endDate: "2025-03-02", likes: 5, liked: false, comments: [{ user: "Alice", text: "Excited for this!", replies: [{ user: "Jane Doe", text: "Me too!" }] }, { user: "Bob", text: "Great initiative!", replies: [] }] },
    { id: 2, user: "Alice Johnson", text: "Mountain Hiking", image: "https://via.placeholder.com/400", place: "Hill", startDate: "2025-04-10", endDate: "2025-04-11", likes: 8, liked: false, comments: [{ user: "Charlie", text: "Can't wait!", replies: [] }] }
  ]);

  const handlePost = () => {
    if (!newPost.text || !newPost.startDate || !newPost.endDate) return;
    setEvents([...events, { ...newPost, id: Date.now(), user: "New User", likes: 0, liked: false, comments: [] }]);
    setNewPost({ text: "", image: "", place: "", startDate: "", endDate: "" });
  };

  const toggleLike = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, liked: !event.liked, likes: event.liked ? event.likes - 1 : event.likes + 1 } : event));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto">
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What's on your mind?"
          value={newPost.text}
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
        ></textarea>
        <div className="flex flex-col gap-3 mt-4">
          <label className="text-gray-700 font-semibold">Start Date</label>
          <input
            type="date"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            value={newPost.startDate}
            onChange={(e) => setNewPost({ ...newPost, startDate: e.target.value })}
          />
          <label className="text-gray-700 font-semibold">End Date</label>
          <input
            type="date"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            value={newPost.endDate}
            onChange={(e) => setNewPost({ ...newPost, endDate: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <label className="cursor-pointer">
            <FaImage className="text-xl text-gray-600 hover:text-blue-500" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setNewPost({ ...newPost, image: URL.createObjectURL(e.target.files[0]) })}
            />
          </label>
          <select
            value={newPost.place}
            onChange={(e) => setNewPost({ ...newPost, place: e.target.value })}
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Place</option>
            <option value="Beach">Beach</option>
            <option value="Hill">Hill</option>
          </select>
          <button onClick={handlePost} className="bg-[#8cc163] text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Post
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-6 max-w-3xl mx-auto">
        {/* {events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaUserCircle className="text-gray-500 text-3xl" />
              <h3 className="font-semibold text-lg">{event.user}</h3>
            </div>
            {event.image && <img src={event.image} alt="Event" className="w-full h-48 object-cover rounded-lg" />}
            <h3 className="mt-3 font-semibold text-xl">{event.text}</h3>
            <p className="text-gray-600">Place: {event.place || "N/A"}</p>
            <p className="text-gray-600">Start: {event.startDate}</p>
            <p className="text-gray-600">End: {event.endDate}</p>
            <div className="flex items-center justify-between mt-4">
              <button onClick={() => toggleLike(event.id)} className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                {event.liked ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />} 
                <span>{event.likes}</span>
              </button>
            </div>
            <div className="mt-4">
              {event.comments.slice(0, 2).map((comment, index) => (
                <div key={index} className="flex items-start gap-2 mt-2">
                  <FaUserCircle className="text-gray-500 text-2xl" />
                  <div>
                    <p className="font-semibold">{comment.user}</p>
                    <p className="text-gray-600">{comment.text}</p>
                    {comment.replies.map((reply, rIndex) => (
                      <div key={rIndex} className="flex items-start gap-2 mt-2 ml-6">
                        <FaUserCircle className="text-gray-400 text-xl" />
                        <div>
                          <p className="font-semibold">{reply.user}</p>
                          <p className="text-gray-600">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {event.comments.length > 2 && <button className="text-blue-500 mt-2">See More</button>}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
