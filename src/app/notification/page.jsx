'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleReadStatus = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = Cookies.get('userId');
      if (!userId) {
        console.error('User ID not found in cookies');
        return;
      }

      try {
        const response = await fetch(`https://parjatak-core.vercel.app/api/v1/customer/activities/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const result = await response.json();
        
        // Filter only type === "notification"
        const notificationsOnly = result.data.filter(item => item.type === "notification");

        setNotifications(notificationsOnly.reverse()); // Newest first
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="shadow-md w-full">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Notifications</h1>

        {/* Notification List */}
        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          <div className="space-y-6">
            {notifications.map((notification) => {
              const linkHref = notification.link ? notification.link : '/'; // If backend gives link

              return (
                <Link key={notification.id} href={linkHref} className="block">
                  <div
                    className={`p-6 bg-white rounded-xl shadow-lg flex items-center space-x-5 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                      notification.read ? "bg-gray-100" : "bg-gradient-to-r from-blue-200 to-blue-100"
                    }`}
                    onClick={() => toggleReadStatus(notification.id)}
                  >
                    <div className="w-14 h-14 flex justify-center items-center rounded-full bg-blue-400">
                      <span className="text-white text-2xl">🔔</span>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold">{notification.message}</p>
                      <span className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</span>
                    </div>

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
        )}
      </div>
    </div>
  )
}

export default Notification;
