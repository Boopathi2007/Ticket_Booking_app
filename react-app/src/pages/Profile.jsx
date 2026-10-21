import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
];

export default function Profile() {
  const { user, updateProfile, bookings, wishlist } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'Delhi');
  const [avatar, setAvatar] = useState(user?.avatar || AVATAR_PRESETS[0]);

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <h2>Sign In to View Profile</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem 0' }}>
          Please log in to manage your account details, preferences, and tickets.
        </p>
        <Link to="/login" className="btn-primary">
          Sign In Now
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      city,
      avatar
    });
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', maxWidth: '780px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <i className="fas fa-user-circle" style={{ color: 'var(--primary)' }}></i> My Profile
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Manage your account profile, avatar, contact details, and preferences.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(94, 23, 235, 0.12)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            <i className="fas fa-ticket-alt"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {bookings.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bookings Made</div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(236, 72, 153, 0.12)',
            color: 'var(--accent-pink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            <i className="fas fa-heart"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {wishlist.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Saved Events</div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            <i className="fas fa-shield-alt"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981' }}>
              {user.role || 'VERIFIED'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Account Status</div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <form onSubmit={handleSubmit}>
          {/* Avatar Selection */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              margin: '0 auto 1rem auto',
              overflow: 'hidden',
              border: '3px solid var(--primary)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img src={avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
              Choose an Avatar Preset
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              {AVATAR_PRESETS.map((p, idx) => (
                <img
                  key={idx}
                  src={p}
                  alt={`preset-${idx}`}
                  onClick={() => setAvatar(p)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: avatar === p ? '3px solid var(--primary)' : '2px solid transparent',
                    transition: 'transform 0.15s ease'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="filter-group">
              <label className="filter-label">Full Name</label>
              <input
                type="text"
                className="filter-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Email Address</label>
              <input
                type="email"
                className="filter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Phone Number</label>
              <input
                type="tel"
                className="filter-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Default City</label>
              <select
                className="filter-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => navigate('/tickets')}
            >
              View My Tickets
            </button>
            <button type="submit" className="btn-primary">
              <i className="fas fa-save"></i> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
