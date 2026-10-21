import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function BookingModal() {
  const { bookingModalEvent, closeBookingModal, user, addBooking, showToast } = useApp();
  const navigate = useNavigate();

  const [tierIndex, setTierIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  if (!bookingModalEvent) return null;

  const event = bookingModalEvent;
  const tiers = event.tiers || [{ name: 'General Admission', price: event.price, desc: 'Standard entry' }];
  const currentTier = tiers[tierIndex] || tiers[0];

  const basePrice = currentTier.price * qty;
  const discountAmount = promoApplied ? Math.round(basePrice * promoDiscount) : 0;
  const discountedBase = Math.max(0, basePrice - discountAmount);
  const tax = currentTier.price === 0 ? 0 : Math.round(discountedBase * 0.05);
  const total = discountedBase + tax;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'EVENT20') {
      setPromoDiscount(0.20);
      setPromoApplied(true);
      showToast('🎉 Promo code EVENT20 applied! 20% OFF', 'success');
    } else if (code === 'FESTIVAL50') {
      setPromoDiscount(0.10);
      setPromoApplied(true);
      showToast('🎉 Promo code FESTIVAL50 applied! 10% OFF', 'success');
    } else {
      showToast('Invalid promo code. Try "EVENT20"', 'warning');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      showToast('Please sign in or create an account to book tickets', 'warning');
      closeBookingModal();
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    const newBooking = {
      bookingId: 'EVT-' + Math.floor(10000 + Math.random() * 90000),
      eventId: event.id,
      eventTitle: event.title,
      category: event.category,
      dateDisplay: event.dateDisplay,
      venue: event.venue,
      tier: currentTier.name,
      quantity: qty,
      basePrice: basePrice,
      discount: discountAmount,
      tax: tax,
      totalAmount: total,
      status: 'CONFIRMED',
      bookedOn: new Date().toISOString().split('T')[0],
      userName: user.name || 'Guest User',
      userEmail: (user.email || '').toLowerCase()
    };

    addBooking(newBooking);
    closeBookingModal();
    navigate('/tickets');
  };

  return (
    <div className="modal-backdrop" onClick={closeBookingModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close-btn" onClick={closeBookingModal} aria-label="Close modal">
          <i className="fas fa-times"></i>
        </button>

        {/* Header */}
        <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <span className="category-tag-pill" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
            {event.category}
          </span>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>{event.title}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i>
            {event.venue} · {event.dateDisplay}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          {/* 1. Ticket Tiers */}
          <h4 style={{ fontSize: '0.92rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
            1. Select Ticket Tier
          </h4>
          <div>
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className={`ticket-tier-option ${idx === tierIndex ? 'selected' : ''}`}
                onClick={() => setTierIndex(idx)}
              >
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--text-heading)' }}>{t.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
                  {t.price === 0 ? 'Free' : `₹${t.price.toLocaleString('en-IN')}`}
                </div>
              </div>
            ))}
          </div>

          {/* 2. Quantity Control */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div>
              <h4 style={{ fontSize: '0.92rem', color: 'var(--text-heading)' }}>2. Number of Tickets</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Max 6 tickets per transaction</p>
            </div>
            <div className="qty-control">
              <button
                className="qty-btn"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center', color: 'var(--text-heading)' }}>
                {qty}
              </span>
              <button
                className="qty-btn"
                onClick={() => setQty(Math.min(6, qty + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Promo Code section */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.88rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
              Have a Promo Code?
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Try 'EVENT20'"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase'
                }}
              />
              <button
                type="button"
                className="btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={handleApplyPromo}
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p style={{ fontSize: '0.78rem', color: '#10B981', marginTop: '4px', fontWeight: 600 }}>
                ✓ Promo code applied! ({Math.round(promoDiscount * 100)}% discount)
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginTop: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Ticket Price ({currentTier.name} × {qty})</span>
              <span>{basePrice === 0 ? 'Free' : `₹${basePrice.toLocaleString('en-IN')}`}</span>
            </div>
            {promoApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: 600 }}>
                <span>Discount</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>GST & Convenience Fee (5%)</span>
              <span>{tax === 0 ? '₹0' : `₹${tax.toLocaleString('en-IN')}`}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'var(--text-heading)',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.5rem',
              marginTop: '0.2rem'
            }}>
              <span>Total Payable</span>
              <span style={{ color: 'var(--primary)' }}>
                {total === 0 ? 'Free' : `₹${total.toLocaleString('en-IN')}`}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Amount</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
              {total === 0 ? 'Free' : `₹${total.toLocaleString('en-IN')}`}
            </div>
          </div>
          <button className="btn-primary" onClick={handleCheckout}>
            Proceed to Pay <i className="fas fa-arrow-right" style={{ marginLeft: '4px' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
