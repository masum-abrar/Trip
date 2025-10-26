import { useState } from "react";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
  FaUserCircle,
  FaTrash,
  FaEllipsisH,
  FaPaperPlane,
  FaCalendarAlt,
} from "react-icons/fa";

// import ImageGallery from "./ImageGallery";
import { getUserId } from "../utils/utils";
import ImageGallery from "./ImageGallery";

const PostCard = ({
  post,
  onLike,
  onComment,
  onReply,
  onDeleteComment,
  onDeleteReply,
  onDeletePost,
  showDate = false,
  loading,
  deletingId,
  loadingPost,
  replyLoading,
}) => {
  const [comments, setComments] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const [showAllComments, setShowAllComments] = useState({});
  const [openOptions, setOpenOptions] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.like || []);

  const userId = getUserId();
  const isLiked = localLikes.some((like) => like.user?.id === userId);

  const handleCommentSubmit = async (postId) => {
    const success = await onComment(postId, comments[postId], post.user?.id);
    if (success) {
      setComments((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  const handleReplySubmit = async (commentId, parentUserId) => {
    const success = await onReply(
      post.id,
      commentId,
      parentUserId,
      replyTexts[commentId]
    );
    if (success) {
      setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
      setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4 relative">
      {/* Delete Loading Overlay */}
      {deletingId === post.id && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center rounded-xl z-10">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Deleting...</span>
          </div>
        </div>
      )}

      {/* User Info & Options */}
      <div className="flex items-center justify-between mb-2">
        <Link
          href={`/userprofile/${post.userId}`}
          className="flex items-center gap-2"
        >
          {post?.user?.image ? (
            <img
              src={post.user.image}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600" />
          )}
          <span className="font-semibold text-gray-800">
            {post?.user?.name}
          </span>
        </Link>

       {post.user?.id === userId && (
  <div className="relative">
    <button
      onClick={() => setOpenOptions(!openOptions)}
      className="p-2 rounded-full hover:bg-gray-100 transition"
    >
      <FaEllipsisH className="text-gray-600" />
    </button>

    {openOptions && (
      <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg z-20">
        <button
          onClick={() => onDeletePost(post.id)}
          disabled={deletingId === post.id}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 disabled:opacity-50 px-4 py-2 w-full"
        >
          {deletingId === post.id ? (
            <>
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Deleting...</span>
            </>
          ) : (
            <>
              <FaTrash /> <span>Delete</span>
            </>
          )}
        </button>
      </div>
    )}
  </div>
)}

      </div>

      {/* Images */}
      {post.images?.length > 0 && <ImageGallery images={post.images} />}

      {/* Post Content */}
       <Link key={post.id} href={`/PostDetails/${post.id}`}>
      <p className="mt-2 text-gray-800">{post.title}</p>
</Link>
      {/* Event Dates */}
      {showDate && post.eventStartDate && (
        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
            <FaCalendarAlt className="text-green-500" />
            <span>Start: {post.eventStartDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm">
            <FaCalendarAlt className="text-red-500" />
            <span>End: {post.evenetEndDate}</span>
          </div>
        </div>
      )}

      {/* Like Button */}
      <button
        onClick={() => onLike(post.id, localLikes, setLocalLikes)}
        className="flex items-center gap-1 text-black mt-2 hover:text-red-500 transition"
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        <span>{localLikes.length}</span>
      </button>

      {/* Comment Input */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={comments[post?.id] || ""}
          onChange={(e) =>
            setComments((prev) => ({ ...prev, [post?.id]: e.target.value }))
          }
          placeholder="Write a comment..."
          disabled={loadingPost[post?.id] }
          className="flex-1 p-2 border rounded-md text-black focus:ring-2 focus:ring-[#8cc163] bg-white disabled:opacity-50"
        />
        <button
          onClick={() => handleCommentSubmit(post?.id)}
          disabled={loadingPost[post.id]}
          className="bg-[#8cc163] text-white px-4 py-2 rounded-md hover:bg-[#79c340] transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
        >
          {loadingPost[post?.id] ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Comment"
          )}
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-4">
        {post.comment
          ?.slice(0, showAllComments[post?.id] ? post.comment.length : 2)
          .map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-1 mt-2 ml-4 bg-gray-100 p-3 rounded-md relative"
            >
              {/* Comment Delete Loading */}
              {deletingId === comment.id && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center rounded-md z-10">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Link
                  href={`/userprofile/${comment?.user?.id}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src={comment.user?.image || "/default-avatar.png"}
                    alt={comment.user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-800">
                    {comment.user?.name}
                  </span>
                </Link>

                {(comment.user.id === userId || post.userId === userId) && (
                  <button
                    onClick={() =>
                      onDeleteComment(comment.id, post.id, comment.user.id)
                    }
                    disabled={deletingId === comment.id}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                )}
              </div>

              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-700 ml-10">{comment.comment}</p>
                <button
                  onClick={() =>
                    setShowReplyInput((prev) => ({
                      ...prev,
                      [comment.id]: !prev[comment.id],
                    }))
                  }
                  className="text-blue-500 text-sm hover:text-blue-700"
                >
                  Reply
                </button>
              </div>

              {/* Replies */}
              {comment.reply?.length > 0 && (
                <div className="mt-2 ml-10 space-y-2">
                  {comment.reply.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex flex-col gap-1 bg-white p-2 rounded-md border-l-4 border-[#8cc163] relative"
                    >
                      {deletingId === reply.id && (
                        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-md z-10">
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <Link
                          href={`/userprofile/${reply.user.id}`}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={reply.user?.image || "/default-avatar.png"}
                            alt={reply.user?.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-800">
                            {reply.user?.name}
                          </span>
                        </Link>

                        {(reply.user.id === userId ||
                          post.userId === userId) && (
                          <button
                            onClick={() =>
                              onDeleteReply(
                                reply.id,
                                post.id,
                                comment.id,
                                reply.user.id
                              )
                            }
                            disabled={deletingId === reply.id}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 ml-8">
                        {reply.reply}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {showReplyInput[comment.id] && (
                <div className="flex items-center gap-2 mt-2 ml-10">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyTexts[comment.id] || ""}
                    onChange={(e) =>
                      setReplyTexts((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                    disabled={replyLoading[comment.id]}
                    className="border p-2 rounded-md flex-1 text-black disabled:opacity-50"
                  />

                  <button
                    onClick={() =>
                      handleReplySubmit(comment.id, comment.user.id)
                    }
                    disabled={replyLoading[comment.id]}
                    className="text-[#8cc163] hover:text-[#79c340] disabled:opacity-50"
                  >
                    {replyLoading[comment.id] ? (
                      <div className="w-4 h-4 border-2 border-[#8cc163] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FaPaperPlane />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}

        {post.comment?.length > 2 && (
          <button
            onClick={() =>
              setShowAllComments((prev) => ({
                ...prev,
                [post.id]: !prev[post.id],
              }))
            }
            className="ml-4 text-blue-600 text-sm mt-2 hover:text-blue-800"
          >
            {showAllComments[post.id] ? "Show Less" : "View All Comments"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
