import { useState } from "react";
import { toast } from "sonner";
import { checkAuth, getUserId, getUserName } from "../utils/utils";

export const usePostActions = (fetchData, router) => {
  const [loadingPost, setLoadingPost] = useState({}); // 🔹 Track loading per post ID
  const [deletingId, setDeletingId] = useState(null);
const [replyLoading, setReplyLoading] = useState({});
  // ------------------- LIKE -------------------
  const handleLike = async (postId, currentLikes, setLocalLikes) => {
    const userId = getUserId();
    if (!checkAuth(router)) return;

    const alreadyLiked = currentLikes.some(like => like.user?.id === userId);

    // Optimistic UI update
    if (alreadyLiked) {
      setLocalLikes(currentLikes.filter(like => like.user?.id !== userId));
    } else {
      setLocalLikes([...currentLikes, { user: { id: userId } }]);
    }

    try {
      if (alreadyLiked) {
        await fetch("https://parjatak-backend.vercel.app/api/v1/customer/delete-post-like", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, userId }),
        });
      } else {
        await fetch("https://parjatak-backend.vercel.app/api/v1/customer/create-post-like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, userId, parentUserId: null }),
        });
      }
    } catch (error) {
      console.error("Like toggle error:", error);
      setLocalLikes(currentLikes); // revert on error
      toast.error("Failed to update like");
    }
  };

  // ------------------- COMMENT -------------------
  const handleComment = async (postId, comment, postOwnerUserId) => {
    const userId = getUserId();
    const userName = getUserName();

    if (!checkAuth(router)) return false;
    if (!comment?.trim()) {
      toast.warning("Please write a comment");
      return false;
    }

    // 🔹 Set loading for this specific post
    setLoadingPost(prev => ({ ...prev, [postId]: true }));

    try {
      const res = await fetch(
        "https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            parentUserId: null,
            userId,
            comment,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Comment posted!", { duration: 1500 });

        // Notification to post owner
        if (postOwnerUserId !== userId) {
          await fetch("https://parjatak-backend.vercel.app/api/v1/create-notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: postOwnerUserId,
              message: `${userName} commented on your post.`,
              type: "notification",
              link: `/PostDetails/${postId}`,
            }),
          });
        }

        fetchData();
        return true;
      } else {
        toast.error(data.message || "Failed to post comment");
        return false;
      }
    } catch (err) {
      console.error("Comment error:", err);
      toast.error("Error posting comment");
      return false;
    } finally {
      // 🔹 Stop loading for this post only
      setLoadingPost(prev => ({ ...prev, [postId]: false }));
    }
  };

  // ------------------- REPLY -------------------
const handleReply = async (postId, commentId, parentUserId, reply) => {
  const userId = getUserId();

  if (!checkAuth(router)) return false;
  if (!reply?.trim()) {
    toast.warning("Please write a reply");
    return false;
  }

  // Track reply loading per comment
  setReplyLoading(prev => ({ ...prev, [commentId]: true }));

  try {
    const res = await fetch(
      "https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment-reply",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          postCommentId: commentId,
          parentUserId,
          userId,
          reply,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Reply posted!", { duration: 1500 });
      fetchData();
      return true;
    } else {
      toast.error(data.message || "Failed to post reply");
      return false;
    }
  } catch (error) {
    console.error("Reply error:", error);
    toast.error("Error posting reply");
    return false;
  } finally {
    // stop loading for this specific comment
    setReplyLoading(prev => ({ ...prev, [commentId]: false }));
  }
};

  // ------------------- DELETE COMMENT -------------------
  const handleDeleteComment = async (commentId, postId, parentUserId) => {
    const userId = getUserId();
    if (!checkAuth(router)) return;

    setDeletingId(commentId);

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
        fetchData();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Delete comment error:", error);
      toast.error("Error deleting comment");
    } finally {
      setDeletingId(null);
    }
  };

  // ------------------- DELETE REPLY -------------------
  const handleDeleteReply = async (replyId, postId, postCommentId, parentUserId) => {
    const userId = getUserId();
    if (!checkAuth(router)) return;

    setDeletingId(replyId);

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
        fetchData();
      } else {
        toast.error("Failed to delete reply");
      }
    } catch (error) {
      console.error("Delete reply error:", error);
      toast.error("Error deleting reply");
    } finally {
      setDeletingId(null);
    }
  };

  // ------------------- RETURN -------------------
  return {
    loadingPost, // 🔹 Now holds per-post loading\
     replyLoading,
    deletingId,
    handleLike,
    handleComment,
    handleReply,
    handleDeleteComment,
    handleDeleteReply,
  };
};
