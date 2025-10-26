'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const currentUserId = Cookies.get('userId');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUserId) return;

      try {
        const response = await fetch(
          `https://parjatak-backend.vercel.app/api/v1/customer/activities/${currentUserId}`
        );
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const result = await response.json();

        // Filter only notifications and sort by date
        const notificationsOnly = result.data
          .filter((item) => item.type === 'notification')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setNotifications(notificationsOnly);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentUserId]);

  // Group notifications by date
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = new Date(notification.createdAt).toISOString().split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(notification);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedNotifications).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // Mark notification as read (frontend + backend)
  const handleMarkAsRead = async (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );

    try {
      await fetch(
        `https://parjatak-backend.vercel.app/api/v1/customer/mark-notification-read`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUserId, notificationId }),
        }
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  // Handle notification click (mark as read + navigate)
  const handleNotificationClick = async (notification) => {
    await handleMarkAsRead(notification.data?.id);

    const href = notification?.link?.includes('post/')
      ? `/PostDetails/${notification?.link?.split('/')[2]}`
      : notification?.link;

    router.push(href);
  };

  // Format notification message (replace own name with "You")
  const formatMessage = (notification) => {
    if (!notification.userName) return notification.message;

    return notification.user?.id === currentUserId
      ? notification.message.replace(notification.userName, 'You')
      : notification.message;
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="shadow-md w-full">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto p-6 flex-1">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Notifications
        </h1>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <span className="ml-4 text-gray-700 font-semibold">
              Fetching notifications...
            </span>
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <p className="text-gray-500 text-center py-20">
            No notifications found.
          </p>
        )}

        {!loading && notifications.length > 0 && (
          <div className="space-y-6 flex flex-col">
            {sortedDates.map((date) => (
              <div key={date} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg w-max">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h2>

                <div className="space-y-4 flex flex-col">
                  {groupedNotifications[date].map((notification) => {
                    const time = new Date(
                      notification.createdAt
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-6 rounded-xl shadow-lg flex items-start justify-start space-x-5 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                          notification.read
                            ? 'bg-gray-100'
                            : 'bg-gradient-to-r from-blue-200 to-blue-100'
                        }`}
                      >
                        <div className="w-14 h-14 flex justify-center items-center rounded-full bg-blue-400 flex-shrink-0">
                          <span className="text-white text-2xl">🔔</span>
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-800 font-semibold">
                            {formatMessage(notification)}
                          </p>
                          <div className="mt-2 text-xs text-gray-500">
                            {time}
                          </div>
                        </div>

                        {/* {!notification.read && (
                          <div className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full flex-shrink-0">
                            New
                          </div>
                        )} */}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Notification;
