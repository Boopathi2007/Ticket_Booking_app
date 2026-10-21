import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    user,
    logoutUser,
    wishlist,
    notifications,
    unreadNotifCount,
    markAllNotificationsRead
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon-box">
            <i className="fas fa-ticket-alt"></i>
          </div>
          <span>Event<span>Ease</span></span>
        </Link>

        {/* Center Nav Menu */}
        <nav className="nav-center-menu">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="fas fa-home"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="fas fa-compass"></i> Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="fas fa-heart"></i> Saved
                {wishlist.length > 0 && (
                  <span style={{
                    fontSize: '0.72rem',
                    background: 'var(--accent-pink)',
                    color: '#FFF',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontWeight: 700
                  }}>
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tickets" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="fas fa-ticket-alt"></i> My Tickets
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Dark / Light Mode Toggle */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun" style={{ color: '#FFE600' }}></i>}
          </button>

          {/* Notifications Flyout */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              className="icon-btn"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setUserMenuOpen(false);
              }}
              title="Notifications"
            >
              <i className="far fa-bell"></i>
              {unreadNotifCount > 0 && <span className="notif-badge-dot"></span>}
            </button>

            {notifOpen && (
              <div className="dropdown-menu notif-dropdown">
                <div className="dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)' }}>
                    Notifications {unreadNotifCount > 0 && `(${unreadNotifCount})`}
                  </span>
                  {unreadNotifCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <p style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.85rem' }}>
                    No notifications
                  </p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className="notif-item"
                      onClick={() => {
                        setNotifOpen(false);
                        if (n.link) navigate(n.link);
                      }}
                    >
                      <div className="notif-icon-circle" style={{ background: `${n.color}20`, color: n.color }}>
                        <i className={`fas ${n.icon}`}></i>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="notif-title">{n.title}</div>
                        <div className="notif-desc">{n.desc}</div>
                        <div className="notif-time">{n.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Profile / Auth Area */}
          {user ? (
            <div style={{ position: 'relative' }} ref={userMenuRef}>
              <div
                className="avatar-pill"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setNotifOpen(false);
                }}
                title={user.name}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  user.initials || 'U'
                )}
              </div>

              {userMenuOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-user-name">{user.name}</div>
                    <div className="dropdown-user-email">{user.email}</div>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: 'var(--primary-tint)',
                      color: 'var(--primary)'
                    }}>
                      {user.role || 'MEMBER'}
                    </span>
                  </div>

                  <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-user-circle"></i> My Profile
                  </Link>
                  <Link to="/tickets" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-ticket-alt"></i> My Tickets & Passes
                  </Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-heart"></i> Saved Events
                  </Link>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0.4rem 0' }}></div>

                  <button
                    className="dropdown-item danger"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logoutUser();
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn-outline">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
