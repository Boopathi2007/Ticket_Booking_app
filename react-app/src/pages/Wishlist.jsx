import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';

export default function Wishlist() {
  const { events, wishlist } = useApp();

  const savedEvents = events.filter(e => wishlist.includes(e.id));

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <i className="fas fa-heart" style={{ color: 'var(--accent-pink)' }}></i> Saved Events
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Keep track of concerts, conferences, and shows you want to attend.
        </p>
      </div>

      {savedEvents.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          padding: '4.5rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(236, 72, 153, 0.12)',
            color: 'var(--accent-pink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            margin: '0 auto 1.5rem auto'
          }}>
            <i className="far fa-heart"></i>
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Saved Events Yet</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.75rem auto' }}>
            Tap the heart icon on any event card while exploring to save it to your personal wishlist!
          </p>
          <Link to="/explore" className="btn-primary">
            <i className="fas fa-compass"></i> Explore Events Now
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            You have <strong style={{ color: 'var(--text-heading)' }}>{savedEvents.length}</strong> saved event{savedEvents.length > 1 ? 's' : ''}
          </div>
          <div className="events-grid-3">
            {savedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
