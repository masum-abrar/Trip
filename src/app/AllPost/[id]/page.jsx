'use client'
import Navbar from "@/app/components/Navbar";
import { useState } from "react";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const addComment = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      id: comments.length + 1,
      user: "You",
      text: newComment,
      replies: [],
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
  <div>
    <div className="shadow-md w-full bg-white">
        <Navbar />
      </div>
   <div className="p-3 bg-white">
   <div className="max-w-2xl mx-auto p-6 m-4 bg-white rounded-lg shadow-lg mt-4">
       
       {/* Post Header */}
       <div className="flex items-center space-x-3 mb-4">
         <span className="text-xl font-bold text-gray-800">{post.user}</span>
       </div>
 
       {/* Event Details */}
       <div className="text-sm text-gray-600 mb-3">
         📍 <strong>Place:</strong> {post.place}, {post.subdistrict} <br />
         📅 <strong>Date:</strong> {post.startDate} - {post.endDate}
       </div>
 
       {/* Post Content */}
       <p className="text-gray-700 mb-4">{post.text}</p>
 
       {/* Post Image */}
       {post.images.length > 0 && (
         <img
           src={post.images[0]}
           alt="Event"
           className="w-full h-64 object-cover rounded-lg shadow-md"
         />
       )}
 
       {/* Like & Comment Buttons */}
       <div className="flex items-center justify-between space-x-4 mt-4">
         <button
           onClick={toggleLike}
           className={`px-4 py-2 rounded-lg text-white ${
             liked ? "bg-red-500" : "bg-gray-400"
           }`}
         >
           ❤️ {likes}
         </button>
         <button
           onClick={() => setShowAllComments(!showAllComments)}
           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
         >
           💬 {comments.length} Comments
         </button>
       </div>
 
       {/* Comments Section */}
       {showAllComments && (
         <div className="mt-4">
           {comments.map((comment) => (
             <div key={comment.id} className="mb-2 p-3 bg-gray-100 rounded-lg">
               <p className="text-gray-700">
                 <strong>{comment.user}: </strong>
                 {comment.text}
               </p>
             </div>
           ))}
         </div>
       )}
 
       {/* Add Comment */}
       <div className="mt-4 flex">
         <input
           type="text"
           placeholder="Write a comment..."
           className="flex-1 p-2 border rounded-l-lg bg-white"
           value={newComment}
           onChange={(e) => setNewComment(e.target.value)}
         />
         <button
           onClick={addComment}
           className="px-4 bg-[#8cc163]  text-white rounded-r-lg"
         >
           Post
         </button>
       </div>
     </div>
   </div>
  </div>
  );
};

export default function PostPage() {
  const post = {
    id: 1,
    user: "Rakib Hasan",
    text: "Sunset Music Festival is happening this weekend! Don’t miss out!",
    replies: [],
    images: [
      "https://media.istockphoto.com/id/497039777/photo/wedding-setting.jpg?s=612x612&w=0&k=20&c=uHwz_57iBRVXrUPacCiLTuTPYyZS1az9GA0sCDeMP5U=",
    ],
    startDate: "2025-03-01",
    endDate: "2025-03-02",
    place: "Beach",
    subdistrict: "North",
    likes: 2,
    liked: false,
    comments: [
      { id: 1, user: "Raihan", text: "Looking forward to this event! What’s the schedule?", replies: [] },
      { id: 2, user: "Sakib", text: "Can anyone join, or do I need to register first?", replies: [] },
      { id: 3, user: "Rihan", text: "This is going to be so much fun! Who else is coming?", replies: [] },
      { id: 4, user: "Saad", text: "Will there be any guest speakers or special activities?", replies: [] },
    ],
  };

  return <Post post={post} />;
}
