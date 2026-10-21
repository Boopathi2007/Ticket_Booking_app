import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EventCard({ event }) {
  const { wishlist, toggleWishlist, openBookingModal } = useApp();
  const navigate = useNavigate();

  const isLiked = wishlist.includes(event.id);
  const isFree = event.price === 0;
  const priceLabel = isFree ? 'Free' : `₹${event.price.toLocaleString('en-IN')}`;

  const handleCardClick = (e) => {
    // If clicking on wishlist heart or book button, handled separately
    if (e.target.closest('.wishlist-heart-btn') || e.target.closest('.card-quick-book-btn')) {
      return;
    }
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      {/* Image & Top Badges */}
      <div className="event-card-img-wrap">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';
          }}
        />

        <div className="event-card-top-badges">
          <span className="category-tag-pill">{event.category}</span>
          <button
            className={`wishlist-heart-btn ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(event.id);
            }}
            title={isLiked ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Wishlist toggle"
          >
            <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
          </button>
        </div>

        {event.isTrending && (
          <span className="trending-overlay-badge">
            <i className="fas fa-bolt"></i> Trending
          </span>
        )}
        {isFree && <span className="free-overlay-badge">FREE</span>}
      </div>

      {/* Card Content */}
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-info-row">
          <i className="far fa-calendar-alt"></i>
          <span>{event.dateDisplay}</span>
        </div>

        <div className="event-card-info-row">
          <i className="fas fa-map-marker-alt"></i>
          <span>{event.venue}</span>
        </div>

        {/* Card Footer */}
        <div className="event-card-footer">
          <div>
            <div className={`event-card-price ${isFree ? 'price-free' : ''}`}>
              {priceLabel} {!isFree && <span>onwards</span>}
            </div>
            <div className="event-card-rating">
              <i className="fas fa-star"></i>
              <span>{event.rating}</span>
              <span>({event.reviews})</span>
            </div>
          </div>

          <button
            className="btn-primary card-quick-book-btn"
            style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
            onClick={(e) => {
              e.stopPropagation();
              openBookingModal(event);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
