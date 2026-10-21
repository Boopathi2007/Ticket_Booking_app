import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';

const CATEGORIES = ['All', 'Music', 'Tech', 'Art', 'Food', 'Sports', 'Comedy', 'Wellness', 'Workshop'];
const CITIES = ['All', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'];

export default function Explore() {
  const { events } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial states from URL params or defaults
  const initialQ = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialCity = searchParams.get('city') || 'All';

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [onlyFree, setOnlyFree] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter & Sort calculation
  const filteredEvents = useMemo(() => {
    return events
      .filter(e => {
        // Query search
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchTitle = e.title.toLowerCase().includes(q);
          const matchVenue = e.venue.toLowerCase().includes(q);
          const matchCat = e.category.toLowerCase().includes(q);
          if (!matchTitle && !matchVenue && !matchCat) return false;
        }

        // Category filter
        if (category !== 'All' && e.category.toLowerCase() !== category.toLowerCase()) {
          return false;
        }

        // City filter
        if (city !== 'All' && e.city.toLowerCase() !== city.toLowerCase()) {
          return false;
        }

        // Only free filter
        if (onlyFree && e.price > 0) {
          return false;
        }

        // Max price filter
        if (!onlyFree && e.price > maxPrice) {
          return false;
        }

        // Min rating filter
        if (e.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'attendees') return (b.attendees || 0) - (a.attendees || 0);
        return 0; // recommended / default
      });
  }, [events, query, category, city, maxPrice, minRating, onlyFree, sortBy]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setCity('All');
    setMaxPrice(5000);
    setMinRating(0);
    setOnlyFree(false);
    setSortBy('recommended');
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      {/* Page Title & Search Bar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>Explore Live Events</h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Filter by budget, venue, category, and real attendee ratings.
            </p>
          </div>

          <button
            className="btn-outline"
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <i className="fas fa-sliders-h"></i> {showFiltersMobile ? 'Hide Filters' : 'Filter Options'}
          </button>
        </div>

        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          background: 'var(--bg-card)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border-subtle)',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <i className="fas fa-search" style={{ color: 'var(--text-light)' }}></i>
          <input
            type="text"
            placeholder="Search by title, artist, venue, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--text-light)', cursor: 'pointer' }}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <div className="filter-panel" style={{ display: showFiltersMobile ? 'block' : 'block' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-filter" style={{ color: 'var(--primary)' }}></i> Advanced Filters
          </h3>
          <button
            onClick={resetFilters}
            style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            Reset All
          </button>
        </div>

        <div className="filter-grid">
          {/* City Filter */}
          <div className="filter-group">
            <label className="filter-label">City</label>
            <select
              className="filter-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="filter-label">
              <span>Max Price</span>
              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>
                {onlyFree ? 'Free Only' : `₹${maxPrice.toLocaleString('en-IN')}`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="250"
              value={maxPrice}
              disabled={onlyFree}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <label className="filter-label">Minimum Rating</label>
            <select
              className="filter-input"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value="0">All Ratings</option>
              <option value="4.5">★ 4.5 and above</option>
              <option value="4.7">★ 4.7 and above</option>
              <option value="4.8">★ 4.8 and above</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="attendees">Most Popular (Attendees)</option>
            </select>
          </div>
        </div>

        {/* Free Events Checkbox */}
        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <input
            type="checkbox"
            id="free-toggle"
            checked={onlyFree}
            onChange={(e) => setOnlyFree(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
          <label htmlFor="free-toggle" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)', cursor: 'pointer' }}>
            Show Free Events Only (₹0)
          </label>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="categories-pills-row" style={{ marginBottom: '1.75rem' }}>
        {CATEGORIES.map(cat => (
          <div
            key={cat}
            className={`category-pill-card ${category.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Showing <strong style={{ color: 'var(--text-heading)' }}>{filteredEvents.length}</strong> of {events.length} events
        </p>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
            No events match your criteria
          </h3>
          <p style={{ maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            Try clearing some filters or searching with different keywords.
          </p>
          <button className="btn-primary" onClick={resetFilters}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="events-grid-3">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
