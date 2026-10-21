import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import BookingModal from './components/BookingModal';
import ToastContainer from './components/ToastContainer';

import Home from './pages/Home';
import Explore from './pages/Explore';
import EventDetail from './pages/EventDetail';
import Wishlist from './pages/Wishlist';
import Tickets from './pages/Tickets';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <MobileBottomNav />
          <BookingModal />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
