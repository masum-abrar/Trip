{locationData?.map((post) => (
    <div key={post.id} className="bg-white shadow-md rounded-xl p-4">
      <Link href={`/userprofile/${post.userId}`} className="flex items-center space-x-2 mb-2">
     <div className="flex items-center gap-2">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="font-semibold text-gray-800">{post?.user?.name}</span>
      </div>
     </Link>

    
    {/* Display Multiple Images */}
    {post.images && post.images.length >= 0 && (
<div className={`mt-2 ${post.images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2"} gap-2 relative`}>
  {post.images.slice(0, 4).map((imgObj, index) => (
    <div key={index} className="relative">
      <img 
        src={imgObj.image} 
        alt="Post" 
        className={`w-full ${post.images.length === 1 ? "h-56" : "h-40"} object-cover rounded-md cursor-pointer`}
        onClick={() => setSelectedImage(imgObj.image)} // Click to preview
      />

      {/* Overlay if there are more than 4 images */}
      {index === 3 && post.images.length > 4 && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md cursor-pointer"
          onClick={() => setShowAllImages(post.id)}
        >
          <span className="text-white text-lg font-semibold">+{post.images.length - 4}</span>
        </div>
      )}
    </div>
  ))}
</div>
)}

{/* Single Image Preview Modal */}
{selectedImage && (
<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
  <div className="relative bg-white p-4 rounded-lg max-w-2xl w-full">
    <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white text-2xl">❌</button>
    <img src={selectedImage} alt="Preview" className="w-full max-h-[80vh] object-contain rounded-md" />
  </div>
</div>
)}

{/* Show All Images Modal */}
{showAllImages === post.id && (
<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
  <div className="bg-white p-4 rounded-lg max-w-4xl w-full relative">
    <button onClick={() => setShowAllImages(null)} className="absolute top-4 right-4 text-black text-4xl">❌</button>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {post.images.map((imgObj, index) => (
        <img 
          key={index} 
          src={imgObj.image} 
          alt="Post" 
          className="w-full h-40 object-cover rounded-md cursor-pointer"
          onClick={() => setSelectedImage(imgObj.image)} // Click to preview any image
        />
      ))}
    </div>
  </div>
</div>
)}
    
    
            <p className="mt-2 text-gray-800">{post.title}</p>

            <div className="flex justify-between items-center text-gray-700 mt-4 mb-4">
{/* Start Date */}
<div className="flex items-center gap-1 sm:gap-2 bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">
  <FaCalendarAlt className="text-green-500 text-sm sm:text-base" />
  <span className="font-medium">Start: {post.eventStartDate}</span>
</div>

{/* End Date - Pushed to Extreme Right */}
<div className="flex items-center gap-1 sm:gap-2 bg-red-100 text-red-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ml-auto">
  <FaCalendarAlt className="text-red-500 text-sm sm:text-base" />
  <span className="font-medium">End: {post.evenetEndDate}</span>
</div>
</div>



            {/* Like Button */}
            <button className="flex items-center gap-1 text-black mt-2">
{post.like.some(like => like.user?.id === cookiesuserId) ? (
  <FaHeart 
    className="text-red-500 cursor-pointer"
    onClick={() => handleUnlike(post.id, post.user?.id)}
  />
) : (
  <FaRegHeart 
    className="cursor-pointer"
    onClick={() => handleLike(post.id)}
  />
)}

{post.like.length}
</button>



    
           
    
            {/* Add Comment Input */}
            <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={comments[post.id] || ""}
            onChange={(e) => handleCommentChange(post.id, e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 w-36 p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={() => handleCommentSubmit(post.id)}
            disabled={loading || !userId}
            className="bg-[#8cc163] text-white px-4 py-1 rounded-md"
          >
            {loading ? "Posting..." : "Comment"}
          </button>
        </div>
        {/* Display Comments */}
      
   <div>
    {(post.comment.slice(0, showAllCommentsForPost[post.id] ? post.comment.length : 2)).map((comment) => (
      <div key={comment.id} className="flex flex-col gap-1 mt-2 ml-4 bg-gray-100 p-2 rounded-md">
        
        <div className="flex justify-between items-center mb-2">
          <Link href={`/userprofile/${comment.user.id}`} className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-xl text-gray-600" />
              <span className="font-semibold text-gray-800">{comment.user.name}</span>
            </div>
          </Link>
  
          {/* Comment Delete Icon */}
          {comment.user.id === cookiesuserId && (
            <FaTrash
              className="text-red-500 cursor-pointer text-sm"
              onClick={() => handleDeleteComment(comment.id, post.id, comment.user.id)}
            />
          )}
        </div>
  
        <div className="flex justify-between items-center">
          <p className="text-gray-700 ml-7">{comment.comment}</p>
  
          {/* Reply Button */}
          <button
            onClick={() => handleReplyToggle(comment.id)}
            className="text-blue-500 text-sm mr-3"
          >
            Reply
          </button>
        </div>
  
        {/* Replies Section */}
        {comment.reply?.length > 0 && (
          <div className="mt-2">
            {comment.reply.map((reply) => (
              <div key={reply.id} className="flex flex-col gap-1 mt-1 bg-white p-2 rounded-md border-l-4 border-[#8cc163] w-full">
                <div className="flex justify-between items-center">
                  <Link href={`/userprofile/${reply.user.id}`} className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={reply.user?.image || "https://cdn-icons-png.flaticon.com/512/9368/9368192.png"}
                        alt={reply.user?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-800">{reply.user?.name}</span>
                    </div>
                  </Link>
  
                  {/* Reply Delete Icon */}
                  {reply.user.id === cookiesuserId && (
                    <FaTrash
                      className="text-red-500 cursor-pointer text-sm mr-2"
                      onClick={() => handleDeleteReply(reply.id, post.id, comment.id, reply.user.id)}
                    />
                  )}
                </div>
  
                <p className="ml-7 text-sm text-gray-700">{reply.reply}</p>
              </div>
            ))}
          </div>
        )}
  
        {/* Reply Input Box */}
        {showReplyInput[comment.id] && (
          <div className="flex items-center gap-2 mt-1 ml-7">
            <input
              type="text"
              placeholder="Write a reply..."
              className="border p-1 rounded-md flex-1 text-black"
              value={replyTexts[comment.id] || ''}
              onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
            />
            <FaPaperPlane
              className="text-[#8cc163] cursor-pointer"
              onClick={() => handleReply(post.id, comment.id, comment.user.id)}
            />
          </div>
        )}
  
      </div>
    ))}
  
    {/* Only show the button if there are more than 2 comments */}
    {post.comment.length > 2 && (
      <button
        onClick={() => handleToggleAllComments(post.id)}
        className="ml-4 text-blue-600 text-sm mt-1"
      >
        {showAllCommentsForPost[post.id] ? "Show Less" : "View All Comments"}
      </button>
    )}
  </div>


          </div>
        ))}s