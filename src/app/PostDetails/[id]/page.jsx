'use client';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Page = ({ params }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = Cookies.get('userId');
  const cookiesuserId = Cookies.get('userId');

 
  useEffect(() => {
    const fetchPostDetails = async () => {
      const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/posts-by-id/${params.id}`);
      const data = await res.json();
      setPost(data.data);
      setComments(data.data.comment || []);
    };
    fetchPostDetails();
  }, [params.id]);

 
  const handleCommentSubmit = async (postId, postOwnerUserId) => {
    const comment = comments[postId];
    if (!comment?.trim()) return;

    const userName = Cookies.get('userName');
    setLoading(true);
    try {
      const res = await fetch('https://parjatak-core.vercel.app/api/v1/customer/create-post-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postId,
          parentUserId: null,
          userId,
          comment,
        }),
      });

      const data = await res.json();
      toast.success('Comment posted successfully!');

      setComments((prev) => ({
        ...prev,
        [postId]: '',
      }));

      // Send notifications
      await fetch('https://parjatak-core.vercel.app/api/v1/create-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: cookiesuserId,
          message: `You commented on a post.`,
          type: 'activity',
          link: '',
        }),
      });

      await fetch('https://parjatak-core.vercel.app/api/v1/create-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: postOwnerUserId,
          message: `${userName} commented on your post.`,
          type: 'notification',
          link: '',
        }),
      });

      fetchCommunity();
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle reply submission
  const handleReply = async (postId, commentId, parentUserId) => {
    const reply = replyTexts[commentId];
    if (!reply?.trim()) return;

    try {
      const res = await fetch('https://parjatak-core.vercel.app/api/v1/customer/create-post-comment-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          postCommentId: commentId,
          parentUserId,
          userId,
          reply,
        }),
      });

      const data = await res.json();
      toast.success('Reply posted successfully!');

      setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
      setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
      fetchCommunity();
    } catch (error) {
      console.error('Reply failed:', error);
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId, postId, parentUserId) => {
    try {
      const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/delete-post-comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: postId,
          parentUserId: parentUserId,
          userId: cookiesuserId,
        }),
      });
      if (!res.ok) throw new Error('Failed to delete comment');

      toast.success('Comment deleted successfully!');
      fetchCommunity();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Handle delete reply
  const handleDeleteReply = async (replyId, postId, postCommentId, parentUserId) => {
    try {
      const res = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/delete-post-comment-reply/${replyId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: postId,
          postCommentId: postCommentId,
          parentUserId: parentUserId,
          userId: cookiesuserId,
        }),
      });
      if (!res.ok) throw new Error('Failed to delete reply');

      toast.success('Reply deleted successfully!');
      fetchCommunity();
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };


  const fetchCommunity = () => {
 
  };


  const commentList = Array.isArray(comments) ? comments : [];
  return (
    <div className="max-w-4xl mx-auto p-4">
    {/* Post Info */}
    <div className="mb-4">
      <h1 className="text-3xl font-bold">{post?.title || 'Untitled'}</h1>
      <p className="text-gray-600">{post?.description || 'No description available'}</p>
      <div className="flex items-center gap-2 mt-2">
        <img src={post?.user?.image || '/default-user.png'} alt="author" className="w-8 h-8 rounded-full" />
        <span className="text-sm text-gray-500">Posted by {post?.user?.name || 'Anonymous'}</span>
      </div>
    </div>

    {/* Post Image */}
    {post?.images?.[0]?.image && (
      <img
        src={post.images[0].image}
        alt={post.title || 'Post image'}
        className="w-full h-64 object-cover rounded mb-4"
      />
    )}

    {/* Comments Section */}
    <div>
      {Array.isArray(commentList) && commentList.map((comment) => (
        <div key={comment.id} className="border-t pt-4 mt-4">
          <div className="flex items-center gap-2">
            <img src={comment?.user?.image || '/default-user.png'} className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-medium">{comment?.user?.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-700">{comment?.comment || ''}</p>
            </div>
            {comment.user.id === cookiesuserId && (
              <button onClick={() => handleDeleteComment(comment.id, post.id, comment.user.id)} className="ml-auto text-red-500 text-sm">
                Delete
              </button>
            )}
          </div>

          {/* Replies */}
          {Array.isArray(comment?.replies) &&
            comment.replies.map((reply) => (
              <div key={reply.id} className="ml-10 mt-2 border-l pl-4">
                <div className="flex items-center gap-2">
                  <img src={reply?.user?.image || '/default-user.png'} className="w-6 h-6 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{reply?.user?.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-600">{reply?.reply}</p>
                  </div>
                  {reply.userId === cookiesuserId && (
                    <button onClick={() => handleDeleteReply(reply.id, post.id, comment.id, reply.userId)} className="ml-auto text-red-500 text-xs">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}

          {/* Reply Toggle and Input */}
          <div className="ml-10 mt-2">
            {showReplyInput?.[comment.id] ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={replyTexts?.[comment.id] || ''}
                  onChange={(e) =>
                    setReplyTexts((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                  placeholder="Write a reply..."
                  className="flex-1 p-2 border rounded-md text-black bg-white"
                />
                <button
                  onClick={() => handleReply(post.id, comment.id, comment.userId)}
                  className="bg-[#8cc163] text-white px-3 py-1 rounded-md"
                >
                  Reply
                </button>
                <button
                  onClick={() =>
                    setShowReplyInput((prev) => ({
                      ...prev,
                      [comment.id]: false,
                    }))
                  }
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  setShowReplyInput((prev) => ({
                    ...prev,
                    [comment.id]: true,
                  }))
                }
                className="text-blue-500 text-sm"
              >
                Reply
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* New Comment Input */}
    {post?.id && (
      <div className="flex items-center gap-2 mt-6 border-t pt-4">
        <input
          type="text"
          value={comments?.[post.id] || ''}
          onChange={(e) =>
            setComments((prev) => ({ ...prev, [post.id]: e.target.value }))
          }
          placeholder="Write a comment..."
          className="flex-1 p-2 border rounded-md text-black bg-white"
        />
        <button
          onClick={() => handleCommentSubmit(post.id, post.userId)}
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
