'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link';

const Notification = () => {
  // Example data for notifications
  const notificationss = [
    { id: 1, type: 'like', message: 'Abir liked your post', time: '2 mins ago', read: false },
    { id: 2, type: 'comment', message: 'Tasfia commented on your photo', time: '1 hour ago', read: true },
    { id: 3, type: 'follow', message: 'Rajib started following you', time: '5 hours ago', read: false },
    { id: 4, type: 'like', message: 'Rakib liked your list', time: '1 day ago', read: true },
  ];

  // Initialize the state with notificationss (correct variable name)
  const [notifications, setNotifications] = useState(notificationss);

  const toggleReadStatus = (id) => {
    // Toggle read status for a notification
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="shadow-md w-full">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Notifications</h1>

        {/* Notification List */}
        <div className="space-y-6">
        {notifications.map((notification) => {
  const linkHref =
    notification.type === "follow" ? "/profile" : `/AllPost/${notification.id}`;

  return (
    <Link key={notification.id} href={linkHref} className="block">
      <div
        className={`p-6 bg-white rounded-xl shadow-lg flex items-center space-x-5 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
          notification.read ? "bg-gray-100" : "bg-gradient-to-r from-blue-200 to-blue-100"
        }`}
        onClick={() => toggleReadStatus(notification.id)} // Toggle read/unread
      >
        <div
          className={`w-14 h-14 flex justify-center items-center rounded-full ${
            notification.type === "like"
              ? "bg-yellow-400"
              : notification.type === "comment"
              ? "bg-green-400"
              : "bg-purple-400"
          }`}
        >
          {/* Display icon based on notification type */}
          {notification.type === "like" && <span className="text-white text-2xl">❤️</span>}
          {notification.type === "comment" && <span className="text-white text-2xl">💬</span>}
          {notification.type === "follow" && <span className="text-white text-2xl">👤</span>}
        </div>

        <div className="flex-1">
          <p className="text-gray-800 font-semibold">{notification.message}</p>
          <span className="text-sm text-gray-500">{notification.time}</span>
        </div>

        {/* Notification Status */}
        {!notification.read && (
          <div className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
            New
          </div>
        )}
      </div>
    </Link>
  );
})}

</div>
      </div>
    </div>
  )
}

export default Notification
