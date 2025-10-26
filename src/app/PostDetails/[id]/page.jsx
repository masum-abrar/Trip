"use client";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaTrash, FaEllipsisH } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";
import Link from "next/link";
import Swal from "sweetalert2";
import Navbar from "@/app/components/Navbar";
import { use } from "react";
import { useRouter } from "next/navigation";
import { usePostActions } from "@/app/hooks/usePostActions";

// import ImageGallery from "@/components/ImageGallery";
import { getUserId, getUserName } from "@/app/utils/utils";
import ImageGallery from "@/app/components/ImageGallery";

const Page = ({ params }) => {
  const resolvedParams = use(params);
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [activeReplyInput, setActiveReplyInput] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [openOptionPostId, setOpenOptionPostId] = useState(null);
  const [localLikes, setLocalLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [deletingReplyId, setDeletingReplyId] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState({});

  const userId = getUserId();
  const userName = getUserName();
  const isLiked = localLikes.some((like) => like.user?.id === userId);

  // Fetch post details
  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${resolvedParams.id}`
      );
      const data = await res.json();
      setPost(data.data);
      setLocalLikes(data.data?.like || []);
    } catch (error) {
      console.error("Failed to fetch post:", error);
      toast.error("Failed to load post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resolvedParams.id) {
      fetchPost();
    }
  }, [resolvedParams.id]);

  // ✅ Use custom hook
  const { loading, handleComment, handleReply } = usePostActions(
    fetchPost,
    router
  );

  // Handle Like/Unlike
  const handleLike = async (postId, postOwnerUserId) => {
    if (!userId) {
      toast.error("Please login first!");
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    const alreadyLiked = localLikes.some((like) => like.user?.id === userId);

    // Optimistic UI update
    if (alreadyLiked) {
      setLocalLikes(localLikes.filter((like) => like.user?.id !== userId));
    } else {
      setLocalLikes([...localLikes, { user: { id: userId } }]);
    }

    try {
      if (alreadyLiked) {
        await fetch(
          "https://parjatak-backend.vercel.app/api/v1/customer/delete-post-like",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, userId }),
          }
        );
      } else {
        await fetch(
          "https://parjatak-backend.vercel.app/api/v1/customer/create-post-like",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, userId, parentUserId: null }),
          }
        );

        // Notifications
        if (postOwnerUserId !== userId) {
          await fetch(
            "https://parjatak-backend.vercel.app/api/v1/create-notification",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: postOwnerUserId,
                message: `${userName} liked your post.`,
                type: "notification",
                link: `/PostDetails/${postId}`,
              }),
            }
          );
        }
      }
    } catch (error) {
      console.error("Like toggle error:", error);
      setLocalLikes(post.like || []); // Revert on error
      toast.error("Failed to update like");
    }
  };

  // Handle Comment Submit
 const handleCommentSubmit = async (postId, postOwnerUserId) => {
  if (!comments[postId]?.trim()) {
    toast.error("Please write a comment!");
    return;
  }

  try {
    setCommentLoading(true);
    const success = await handleComment(postId, comments[postId], postOwnerUserId);

    if (success) {
      toast.success("Comment posted!");
      setComments((prev) => ({ ...prev, [postId]: "" }));
    } else {
      toast.error("Failed to post comment");
    }
  } catch (err) {
    toast.error("Error posting comment");
  } finally {
    setCommentLoading(false);
  }
};


  // Handle Reply Submit
 const handleReplySubmit = async (commentId, parentUserId) => {
  if (!replyTexts[commentId]?.trim()) {
    toast.error("Please write a reply!");
    return;
  }

  setReplyLoading((prev) => ({ ...prev, [commentId]: true }));

  try {
    const success = await handleReply(post.id, commentId, parentUserId, replyTexts[commentId]);

    if (success) {
      toast.success("Reply posted!");
      setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
      setActiveReplyInput(null);
    } else {
      toast.error("Failed to post reply");
    }
  } catch (err) {
    toast.error("Error posting reply");
  } finally {
    setReplyLoading((prev) => ({ ...prev, [commentId]: false }));
  }
};


  // Handle Delete Comment
  const handleDeleteComment = async (commentId, postId, parentUserId) => {
    if (!userId) {
      toast.error("Please login first!");
      return;
    }

    setDeletingCommentId(commentId);

    try {
      const res = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/delete-post-comment/${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, parentUserId, userId }),
        }
      );

      if (res.ok) {
        toast.success("Comment deleted!", { duration: 1500 });
        fetchPost();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment");
    } finally {
      setDeletingCommentId(null);
    }
  };

  // Handle Delete Reply
  const handleDeleteReply = async (
    replyId,
    postId,
    postCommentId,
    parentUserId
  ) => {
    if (!userId) {
      toast.error("Please login first!");
      return;
    }

    setDeletingReplyId(replyId);

    try {
      const res = await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/delete-post-comment-reply/${replyId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, postCommentId, parentUserId, userId }),
        }
      );

      if (res.ok) {
        toast.success("Reply deleted!", { duration: 1500 });
        fetchPost();
      } else {
        toast.error("Failed to delete reply");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Error deleting reply");
    } finally {
      setDeletingReplyId(null);
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8cc163",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
      customClass: {
        popup: "p-4 text-sm",
        title: "text-base",
        confirmButton: "py-1 px-3 text-sm",
        cancelButton: "py-1 px-3 text-sm",
        content: "text-sm",
      },
      width: "320px",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/posts/${postId}`,
          { method: "DELETE" }
        );

        if (res.ok) {
          toast.success("Post deleted!", { duration: 1500 });
          setTimeout(() => router.push("/"), 1500);
        } else {
          toast.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Error deleting post");
      }
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-white shadow-md rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-md mb-4"></div>
            <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
            <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Navbar />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Post not found</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 bg-[#8cc163] text-white rounded-md"
            >
              Go Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <div className="bg-white shadow-md">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Post Card */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          {/* User Info & Options */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Link href={`/userprofile/${post.user?.id}`}>
                <img
                  src={post.user?.image || "/default-avatar.png"}
                  alt="author"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
              <div>
                <Link
                  href={`/userprofile/${post.user?.id}`}
                  className="font-medium hover:underline"
                >
                  {post.user?.name || "Anonymous"}
                </Link>
              </div>
            </div>

            {post.user?.id === userId && (
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenOptionPostId(
                      openOptionPostId === post.id ? null : post.id
                    )
                  }
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FaEllipsisH className="text-gray-600" />
                </button>

                {openOptionPostId === post.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg z-20">
                    <button
                      onClick={() => {
                        handleDeletePost(post.id);
                        setOpenOptionPostId(null);
                      }}
                      className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 w-full text-sm"
                    >
                      <FaTrash />
                      <span>Delete Post</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Images */}
          {post.images?.length > 0 && <ImageGallery images={post.images} />}

          <h1 className="text-2xl font-bold mb-2 mt-4">
            {post.title || "Untitled"}
          </h1>

          {/* Like and Comment Count */}
          <div className="flex items-center gap-4 border-t border-b py-2 mb-4">
            <button
              onClick={() => handleLike(post.id, post.user?.id)}
              className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{localLikes.length}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{post.comment?.length || 0}</span>
            </div>
          </div>

          {/* Comment Input */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              value={comments[post.id] || ""}
              onChange={(e) =>
                setComments((prev) => ({ ...prev, [post.id]: e.target.value }))
              }
              placeholder="Write a comment..."
              disabled={loading}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-[#8cc163] bg-white disabled:opacity-50"
            />
            <button
  onClick={() => handleCommentSubmit(post.id, post.user?.id)}
  disabled={commentLoading}
  className="bg-[#8cc163] text-white px-6 py-2 rounded-md hover:bg-[#79c340] transition disabled:opacity-50 min-w-[100px]"
>
  {commentLoading ? (
    <div className="flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    "Comment"
  )}
</button>

          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            {post.comment
              ?.slice(0, showAllComments ? post.comment.length : 3)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-2 border-gray-200 pl-3 relative"
                >
                  {deletingCommentId === comment.id && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-md z-10">
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  <div className="flex gap-2 items-start">
                    <Link href={`/userprofile/${comment.user?.id}`}>
                      <img
                        src={comment.user?.image || "/default-avatar.png"}
                        alt={comment.user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="bg-gray-50 px-3 py-2 rounded-md">
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/userprofile/${comment.user?.id}`}
                            className="font-medium text-sm hover:underline"
                          >
                            {comment.user?.name || "Anonymous"}
                          </Link>
                          {(comment.user?.id === userId ||
                            post.user?.id === userId) && (
                            <button
                              onClick={() =>
                                handleDeleteComment(
                                  comment.id,
                                  post.id,
                                  comment.user?.id
                                )
                              }
                              disabled={deletingCommentId === comment.id}
                              className="text-red-500 text-sm hover:text-red-700 disabled:opacity-50"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">
                          {comment.comment}
                        </p>
                      </div>

                      <button
                        className="text-xs text-blue-600 mt-1 ml-2 hover:text-blue-800"
                        onClick={() =>
                          setActiveReplyInput(
                            activeReplyInput === comment.id ? null : comment.id
                          )
                        }
                      >
                        Reply
                      </button>

                      {/* Reply Input */}
                      {activeReplyInput === comment.id && (
                        <div className="flex items-center gap-2 mt-2 ml-2">
                          <input
                            type="text"
                            value={replyTexts[comment.id] || ""}
                            onChange={(e) =>
                              setReplyTexts((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                            placeholder="Write a reply..."
                            disabled={loading}
                            className="flex-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#8cc163] bg-white disabled:opacity-50"
                          />
                         <button
  onClick={() => handleReplySubmit(comment.id, comment.user?.id)}
  disabled={replyLoading[comment.id]}
  className="bg-[#8cc163] text-white px-4 py-2 rounded-md text-sm hover:bg-[#79c340] transition disabled:opacity-50 min-w-[80px]"
>
  {replyLoading[comment.id] ? (
    <div className="flex justify-center">
      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    "Reply"
  )}
</button>

                        </div>
                      )}

                      {/* Replies */}
                      {comment.reply?.map((reply) => (
                        <div
                          key={reply.id}
                          className="flex gap-2 items-start mt-3 ml-4 relative"
                        >
                          {deletingReplyId === reply.id && (
                            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-md z-10">
                              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}

                          <Link href={`/userprofile/${reply.user?.id}`}>
                            <img
                              src={reply.user?.image || "/default-avatar.png"}
                              alt={reply.user?.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          </Link>
                          <div className="flex-1">
                            <div className="bg-white border-l-2 border-[#8cc163] px-3 py-1 rounded-md">
                              <div className="flex justify-between items-center">
                                <Link
                                  href={`/userprofile/${reply.user?.id}`}
                                  className="text-xs font-medium hover:underline"
                                >
                                  {reply.user?.name || "Anonymous"}
                                </Link>
                                {(reply.user?.id === userId ||
                                  post.user?.id === userId) && (
                                  <button
                                    onClick={() =>
                                      handleDeleteReply(
                                        reply.id,
                                        post.id,
                                        comment.id,
                                        reply.user?.id
                                      )
                                    }
                                    disabled={deletingReplyId === reply.id}
                                    className="text-red-500 text-xs hover:text-red-700 disabled:opacity-50"
                                  >
                                    <FaTrash />
                                  </button>
                                )}
                              </div>
                              <p className="text-xs text-gray-700">
                                {reply.reply}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            {post.comment?.length > 3 && (
              <button
                onClick={() => setShowAllComments(!showAllComments)}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                {showAllComments
                  ? "Show fewer comments"
                  : `View all ${post.comment.length} comments`}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
