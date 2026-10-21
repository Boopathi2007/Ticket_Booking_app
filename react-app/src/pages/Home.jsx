import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';

const CATEGORIES = [
  { label: 'All', icon: '✨' },
  { label: 'Music', icon: '🎵' },
  { label: 'Tech', icon: '💻' },
  { label: 'Art', icon: '🎨' },
  { label: 'Food', icon: '🍲' },
  { label: 'Sports', icon: '🏅' },
  { label: 'Comedy', icon: '😂' },
  { label: 'Wellness', icon: '🧘' },
  { label: 'Workshop', icon: '📷' }
];

export default function Home() {
  const { user, events } = useApp();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedCity)}&category=${encodeURIComponent(activeCategory)}`);
  };

  // Filter events based on category selection
  const filteredEvents = events.filter(e => {
    const matchCat = activeCategory === 'All' || e.category.toLowerCase() === activeCategory.toLowerCase();
    const matchCity = selectedCity === 'All' || e.city.toLowerCase() === selectedCity.toLowerCase();
    return matchCat && matchCity;
  });

  const trendingEvents = filteredEvents.filter(e => e.isTrending);
  const upcomingEvents = filteredEvents.filter(e => e.isUpcoming || !e.isTrending);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-dashboard">
        <div className="container">
          <div className="hero-greeting">
            {user ? `Welcome back, ${user.firstName} 👋` : 'Welcome to EventEase 👋'}
          </div>
          <h1 className="hero-dashboard-title">
            Find Your Next <span className="highlight-yellow">Favourite Event</span>
          </h1>
          <p className="hero-dashboard-sub">
            Discover thousands of concerts, tech conferences, workshops, and games happening near you.
          </p>
        </div>
      </section>

      {/* Floating Search Capsule */}
      <div className="search-capsule-wrap">
        <form className="search-capsule" onSubmit={handleSearchSubmit}>
          <div className="search-capsule-input-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search events, artists, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="search-city-select-box">
            <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)' }}></i>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter by City"
            >
              <option value="All">All Cities</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            Search
          </button>
        </form>
      </div>

      <div className="container">
        {/* Categories Pills */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div className="section-head-row">
            <h2 className="section-title">Browse by Category</h2>
            <Link to="/explore" className="section-view-all">
              View all <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
            </Link>
          </div>

          <div className="categories-pills-row">
            {CATEGORIES.map(cat => (
              <div
                key={cat.label}
                className={`category-pill-card ${activeCategory === cat.label ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.label)}
              >
                <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                <span>{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Events */}
        {trendingEvents.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <div className="section-head-row">
              <h2 className="section-title">
                <span style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>
                  <i className="fas fa-chart-line"></i>
                </span>{' '}
                Trending Now
              </h2>
              <Link to="/explore?sort=trending" className="section-view-all">
                See all <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </Link>
            </div>

            <div className="events-grid-3">
              {trendingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="section-head-row">
            <h2 className="section-title">
              <span style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>
                <i className="far fa-calendar-alt"></i>
              </span>{' '}
              Upcoming Events
            </h2>
            <Link to="/explore" className="section-view-all">
              See all <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
            </Link>
          </div>

          <div className="events-grid-3">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Why EventEase Features Section */}
        <section style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          border: '1px solid var(--border-subtle)',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Why EventEase?</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Everything you need for seamless live experiences, instant booking, and guaranteed authenticity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(94, 23, 235, 0.12)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                margin: '0 auto 1rem auto'
              }}>
                <i className="fas fa-search"></i>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.45rem' }}>Discover Events</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Explore thousands of curated events filtered by category, city, date, and price range.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(236, 72, 153, 0.12)',
                color: 'var(--accent-pink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                margin: '0 auto 1rem auto'
              }}>
                <i className="fas fa-ticket-alt"></i>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.45rem' }}>Instant QR Tickets</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Receive digital tickets with authentic QR codes ready for gate scanning and apple wallet.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                margin: '0 auto 1rem auto'
              }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.45rem' }}>100% Verified</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Direct partnerships with verified venue organizers and instant 1-click refund protection.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary), #400AAB)',
          borderRadius: 'var(--radius-xl)',
          color: '#FFFFFF',
          padding: '2.5rem 2rem',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>10,000+</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Live Events Listed</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>5 Lakh+</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Happy Attendees</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>50+</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>Cities Across India</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>4.8 ★</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>App Store Rating</div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 0',
        marginTop: '3rem'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          <div className="brand-logo" style={{ fontSize: '1.25rem' }}>
            <div className="brand-icon-box" style={{ width: 34, height: 34, fontSize: '0.95rem' }}>
              <i className="fas fa-ticket-alt"></i>
            </div>
            <span>Event<span>Ease</span></span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Built with modern React, Hooks & Context API.
          </p>
          <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
            © 2026 EventEase Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
