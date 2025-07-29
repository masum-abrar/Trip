'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Page = ({ params }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState({});
  const userId = Cookies.get('userId');
  const userName = Cookies.get('userName');

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${params.id}`);
      const data = await res.json();
      setPost(data.data);
    };
    fetchPost();
  }, [params.id]);

  const handleCommentChange = (postId, value) => {
    setComments((prev) => ({ ...prev, [postId]: value }));
  };

  const handleReplyChange = (commentId, value) => {
    setReplyTexts((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleCommentSubmit = async (postId, postOwnerId) => {
    const comment = comments[postId];
    if (!comment?.trim()) return;

    setLoading(true);
    try {
      await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userId, parentUserId: null, comment }),
      });
      toast.success('Comment posted!');
      setComments((prev) => ({ ...prev, [postId]: '' }));

      // Notifications
      await fetch(`https://parjatak-backend.vercel.app/api/v1/create-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          message: `You commented on a post.`,
          type: 'activity',
          link: '',
        }),
      });

      await fetch(`https://parjatak-backend.vercel.app/api/v1/create-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: postOwnerId,
          message: `${userName} commented on your post.`,
          type: 'notification',
          link: '',
        }),
      });

      // Refetch post
      const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${params.id}`);
      const data = await res.json();
      setPost(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (postId, commentId, parentUserId) => {
    const reply = replyTexts[commentId];
    if (!reply?.trim()) return;

    setLoading(true);
    try {
      await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/create-post-comment-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, postCommentId: commentId, parentUserId, userId, reply }),
      });
      toast.success('Reply posted!');
      setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
      setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));

      const res = await fetch(`https://parjatak-backend.vercel.app/api/v1/customer/posts-by-id/${params.id}`);
      const data = await res.json();
      setPost(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Post Info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{post?.title || 'Untitled'}</h1>
        <p className="text-gray-600 mt-2">{post?.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <img
            src={post?.user?.image || '/default-user.png'}
            alt="author"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-500">By {post?.user?.name || 'Anonymous'}</span>
        </div>
        {post?.images?.[0]?.image && (
          <img
            src={post.images[0].image}
            alt="post"
            className="w-full h-64 object-cover rounded-lg mt-4"
          />
        )}
      </div>

      {/* Comments & Replies */}
      <div className="space-y-6">
        {post?.comment?.map((comment, index) => (
          <div key={comment.id}>
            <div className="flex gap-2 items-start">
              <img
                src={comment?.user?.image || '/default-user.png'}
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-gray-50 px-4 py-2 rounded-md w-full">
                <p className="font-medium">{comment?.user?.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-700">{comment.comment}</p>
                <button
                  className="text-xs text-blue-600 mt-1"
                  onClick={() =>
                    setShowReplyInput((prev) => ({
                      ...prev,
                      [comment.id]: !prev[comment.id],
                    }))
                  }
                >
                  Reply
                </button>

                {/* Reply Input */}
                {showReplyInput[comment.id] && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={replyTexts[comment.id] || ''}
                      onChange={(e) =>
                        handleReplyChange(comment.id, e.target.value)
                      }
                      placeholder="Write a reply..."
                      className="flex-1 w-36 p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                    <button
                      onClick={() =>
                        handleReplySubmit(post.id, comment.id, comment.user?.id)
                      }
                      className="bg-[#8cc163] text-white px-3 py-1 rounded-md text-sm"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Show reply if exists and assume order */}
            {post?.postCommentReply?.length > 0 && (
  <div className="ml-12 mt-2 space-y-2">
    {post.postCommentReply.map((reply, i) => (
      <div key={i} className="flex gap-2 items-start">
        <img
          src={reply?.user?.image || '/default-user.png'}
          className="w-6 h-6 rounded-full"
        />
        <div className="bg-white border px-3 py-1 rounded-md w-full">
          <p className="text-sm font-medium">{reply?.user?.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-700">{reply?.reply}</p>
        </div>
      </div>
    ))}
  </div>
)}

          </div>
        ))}
      </div>

      {/* New Comment Input */}
      {post?.id && (
        <div
          className="flex items-center gap-2 mt-6"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={comments[post.id] || ''}
            onChange={(e) =>
              handleCommentChange(post.id, e.target.value)
            }
            placeholder="Write a comment..."
            className="flex-1 w-36 p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={() =>
              handleCommentSubmit(post.id, post.user?.id)
            }
            disabled={loading || !userId}
            className="bg-[#8cc163] text-white px-4 py-1 rounded-md"
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
