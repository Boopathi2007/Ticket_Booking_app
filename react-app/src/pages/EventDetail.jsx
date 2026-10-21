import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, wishlist, toggleWishlist, openBookingModal } = useApp();

  const event = events.find(e => String(e.id) === String(id));

  if (!event) {
    return (
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <h2>Event Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem 0' }}>
          The event you are looking for does not exist or has been removed.
        </p>
        <Link to="/explore" className="btn-primary">
          Back to Explore
        </Link>
      </div>
    );
  }

  const isLiked = wishlist.includes(event.id);
  const isFree = event.price === 0;

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      {/* Breadcrumb / Back button */}
      <button
        onClick={() => navigate(-1)}
        className="btn-outline"
        style={{ marginBottom: '1.25rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>

      {/* Hero Banner */}
      <div className="detail-hero">
        <img
          src={event.image}
          alt={event.title}
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="detail-hero-overlay">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="category-tag-pill" style={{ fontSize: '0.85rem' }}>
              {event.category}
            </span>
            <button
              className={`wishlist-heart-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => toggleWishlist(event.id)}
              title={isLiked ? 'Remove from favorites' : 'Save to favorites'}
              style={{ width: '44px', height: '44px', fontSize: '1.15rem' }}
            >
              <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
            </button>
          </div>

          <h1 style={{ color: '#FFFFFF', fontSize: '2.4rem', lineHeight: '1.2', marginBottom: '0.5rem' }}>
            {event.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem' }}>
            <div>
              <i className="far fa-calendar-alt" style={{ marginRight: '0.4rem', color: 'var(--accent-yellow)' }}></i>
              {event.dateDisplay}
            </div>
            <div>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '0.4rem', color: 'var(--accent-pink)' }}></i>
              {event.venue} ({event.city})
            </div>
            <div>
              <i className="fas fa-star" style={{ marginRight: '0.4rem', color: '#F59E0B' }}></i>
              <strong>{event.rating}</strong> ({event.reviews} reviews)
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="detail-layout">
        {/* Left Column: Details, Map, Highlights */}
        <div>
          {/* Live Attendee Counter Badge */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="attendee-badge">
              <i className="fas fa-users"></i> {event.attendees ? event.attendees.toLocaleString('en-IN') : '500+'} people attending
            </span>
            <span style={{ marginLeft: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              🔥 Selling fast in {event.city}
            </span>
          </div>

          {/* About Event */}
          <div className="detail-card">
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.85rem' }}>About This Event</h2>
            <p style={{ lineHeight: '1.7', color: 'var(--text-body)', fontSize: '0.98rem' }}>
              {event.description}
            </p>

            <h3 style={{ fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Event Highlights
            </h3>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#10B981' }}></i> Verified Organizer
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#10B981' }}></i> Instant QR Ticket Delivery
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#10B981' }}></i> Safe & Contactless Entry
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#10B981' }}></i> 100% Refund on Event Cancellation
              </li>
            </ul>
          </div>

          {/* Interactive Venue Map Preview */}
          <div className="detail-card">
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Venue & Location</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <i className="fas fa-location-arrow" style={{ color: 'var(--primary)', marginRight: '0.35rem' }}></i>
              {event.venue}, {event.city}
            </p>

            <div className="map-preview-card">
              <div className="map-grid-pattern"></div>
              <div className="map-pin">
                <div className="map-pin-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div style={{
                  background: 'var(--bg-surface)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  boxShadow: 'var(--shadow-md)',
                  color: 'var(--text-heading)'
                }}>
                  {event.venue}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                GPS: {event.lat || '28.5867'}° N, {event.lng || '77.2330'}° E
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.venue + ' ' + event.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
              >
                <i className="fas fa-directions"></i> Open in Google Maps
              </a>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="detail-card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Organized by</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--accent-pink))',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700
              }}>
                EE
              </div>
              <div>
                <h4 style={{ fontSize: '1rem' }}>EventEase Live Experiences</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Official Partner & Ticketing Host · ⭐ 4.9 (1,200+ reviews)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Ticket Booking Box */}
        <div>
          <div className="detail-card" style={{ position: 'sticky', top: '90px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Tickets starting from
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--primary)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem'
            }}>
              {isFree ? 'Free' : `₹${event.price.toLocaleString('en-IN')}`}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
                Available Tiers
              </h4>
              {event.tiers && event.tiers.map((t, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ fontWeight: 600 }}>{t.name}</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    {t.price === 0 ? 'Free' : `₹${t.price.toLocaleString('en-IN')}`}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
              onClick={() => openBookingModal(event)}
            >
              <i className="fas fa-ticket-alt"></i> Book Tickets Now
            </button>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.75rem' }}>
              🔒 100% Safe & Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
