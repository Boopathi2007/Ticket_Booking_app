import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MobileBottomNav() {
  const { user, wishlist, bookings } = useApp();

  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" end className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <i className="fas fa-home"></i>
        <span>Home</span>
      </NavLink>

      <NavLink to="/explore" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <i className="fas fa-compass"></i>
        <span>Explore</span>
      </NavLink>

      <NavLink to="/wishlist" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} style={{ position: 'relative' }}>
        <i className="fas fa-heart"></i>
        <span>Saved</span>
        {wishlist.length > 0 && (
          <span style={{
            position: 'absolute',
            top: 2,
            right: '25%',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent-pink)'
          }}></span>
        )}
      </NavLink>

      <NavLink to="/tickets" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} style={{ position: 'relative' }}>
        <i className="fas fa-ticket-alt"></i>
        <span>Tickets</span>
        {bookings.length > 0 && (
          <span style={{
            position: 'absolute',
            top: 2,
            right: '25%',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent-green)'
          }}></span>
        )}
      </NavLink>

      <NavLink to={user ? "/profile" : "/login"} className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <i className="fas fa-user-circle"></i>
        <span>{user ? "Profile" : "Sign In"}</span>
      </NavLink>
    </nav>
  );
}
