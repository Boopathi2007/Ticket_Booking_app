import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventStore, AuthStore } from '../data/events';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eventease_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eventease_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Auth state
  const [user, setUser] = useState(() => AuthStore.getUser());

  const loginUser = (userData) => {
    const saved = AuthStore.setUser(userData);
    setUser(saved);
    showToast(`Welcome back, ${saved.firstName}! 👋`, 'success');
  };

  const logoutUser = () => {
    AuthStore.logout();
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  const updateProfile = (data) => {
    if (!user) return;
    const updated = { ...user, ...data };
    const saved = AuthStore.setUser(updated);
    setUser(saved);
    showToast('Profile updated successfully! ✨', 'success');
  };

  // Events state
  const [events] = useState(() => EventStore.getEvents());

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => EventStore.getWishlist());

  const toggleWishlist = (eventId) => {
    const isNowLiked = EventStore.toggleWishlist(eventId);
    setWishlist(EventStore.getWishlist());
    if (isNowLiked) {
      showToast('Saved to your favorites! ❤️', 'success');
    } else {
      showToast('Removed from favorites', 'info');
    }
    return isNowLiked;
  };

  // Bookings state
  const [bookings, setBookings] = useState(() => EventStore.getAllBookings());

  const addBooking = (newBooking) => {
    const saved = EventStore.addBooking(newBooking);
    setBookings(EventStore.getAllBookings());
    addNotification({
      title: 'Booking Confirmed! 🎉',
      desc: `Your ticket for ${newBooking.eventTitle} is ready.`,
      icon: 'fa-ticket-alt',
      color: '#10B981',
      link: '/tickets'
    });
    showToast(`🎉 Booking confirmed! ID: ${newBooking.bookingId}`, 'success');
    return saved;
  };

  const cancelBooking = (bookingId) => {
    EventStore.cancelBooking(bookingId);
    setBookings(EventStore.getAllBookings());
    showToast('Ticket cancelled and refunded.', 'info');
  };

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'IPL Finals Watch Party',
      desc: '🏏 Stadium passes filling fast in Mumbai!',
      icon: 'fa-bolt',
      color: '#F59E0B',
      time: '10 mins ago',
      read: false,
      link: '/explore'
    },
    {
      id: 2,
      title: 'Mumbai Art Show',
      desc: '🎨 Exclusive curator walkthrough this Saturday',
      icon: 'fa-palette',
      color: '#EC4899',
      time: '1 hour ago',
      read: false,
      link: '/explore'
    },
    {
      id: 3,
      title: 'Welcome to EventEase React',
      desc: 'Explore, filter & book live events with instant QR codes!',
      icon: 'fa-star',
      color: '#5E17EB',
      time: 'Just now',
      read: false,
      link: '/explore'
    }
  ]);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const addNotification = (notif) => {
    const newN = {
      id: Date.now(),
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newN, ...prev]);
  };

  // Booking Modal Global State
  const [bookingModalEvent, setBookingModalEvent] = useState(null);

  const openBookingModal = (event) => {
    setBookingModalEvent(event);
  };

  const closeBookingModal = () => {
    setBookingModalEvent(null);
  };

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        loginUser,
        logoutUser,
        updateProfile,
        events,
        wishlist,
        toggleWishlist,
        bookings,
        addBooking,
        cancelBooking,
        notifications,
        unreadNotifCount,
        markAllNotificationsRead,
        addNotification,
        bookingModalEvent,
        openBookingModal,
        closeBookingModal,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
