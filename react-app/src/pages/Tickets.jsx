import React from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../context/AppContext';

export default function Tickets() {
  const { bookings, cancelBooking, user } = useApp();

  const handlePrint = (bookingId) => {
    window.print();
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <i className="fas fa-ticket-alt" style={{ color: 'var(--primary)' }}></i> My Tickets & Passes
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          View, scan, and manage your event passes with authentic digital QR verification.
        </p>
      </div>

      {bookings.length === 0 ? (
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
            background: 'rgba(94, 23, 235, 0.12)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            margin: '0 auto 1.5rem auto'
          }}>
            <i className="fas fa-ticket-alt"></i>
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Active Bookings</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.75rem auto' }}>
            You haven't booked any event tickets yet. Explore trending concerts, tech summits, and games!
          </p>
          <Link to="/explore" className="btn-primary">
            <i className="fas fa-compass"></i> Discover Events
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Showing <strong style={{ color: 'var(--text-heading)' }}>{bookings.length}</strong> confirmed ticket{bookings.length > 1 ? 's' : ''}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {bookings.map(b => (
              <div key={b.bookingId} className="ticket-card">
                {/* Main Ticket Information */}
                <div className="ticket-main">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span className="category-tag-pill" style={{ background: 'var(--primary-tint)', color: 'var(--primary)' }}>
                      {b.category || 'Event'}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <i className="fas fa-check-circle"></i> {b.status || 'CONFIRMED'}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.45rem', marginBottom: '0.65rem', color: 'var(--text-heading)' }}>
                    {b.eventTitle}
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Date & Time</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginTop: '2px' }}>
                        <i className="far fa-calendar-alt" style={{ color: 'var(--primary)', marginRight: '4px' }}></i>
                        {b.dateDisplay}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Venue</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginTop: '2px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)', marginRight: '4px' }}></i>
                        {b.venue}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Tier & Quantity</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginTop: '2px' }}>
                        {b.tier} × {b.quantity}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Attendee</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginTop: '2px' }}>
                        {b.userName || (user && user.name) || 'Guest'}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
                    <button
                      className="btn-outline"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                      onClick={() => handlePrint(b.bookingId)}
                    >
                      <i className="fas fa-print"></i> Print / Download
                    </button>
                    <button
                      className="btn-outline"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 1rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this booking? A full refund will be processed.')) {
                          cancelBooking(b.bookingId);
                        }
                      }}
                    >
                      <i className="fas fa-ban"></i> Cancel Booking
                    </button>
                  </div>
                </div>

                {/* Perforation Line */}
                <div className="ticket-perforation"></div>

                {/* Ticket Stub with QR Code */}
                <div className="ticket-stub">
                  <div className="qr-code-box">
                    <QRCodeSVG
                      value={`EVENT_EASE_VERIFY:${b.bookingId}:${b.eventTitle}:${b.quantity}TICKETS`}
                      size={120}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Scan at entry gate
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--primary)', marginTop: '4px' }}>
                    #{b.bookingId}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '6px' }}>
                    {b.totalAmount === 0 ? 'Free' : `₹${b.totalAmount.toLocaleString('en-IN')}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
