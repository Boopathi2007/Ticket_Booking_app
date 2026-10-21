/* ================================================================
   utils.js – EventEase Dataset & Utility Helpers
   ================================================================ */

// Initial Seed Events matching high quality pictures & responsive metadata
const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Neon Nights Music Festival',
    category: 'Music',
    categoryIcon: '🎵',
    dateDisplay: 'Sat, Sep 14, 2026 · 6:00 PM',
    venue: 'JLN Stadium, Delhi',
    city: 'Delhi',
    price: 999,
    priceDisplay: '₹999',
    rating: 4.8,
    reviews: 342,
    isTrending: true,
    isUpcoming: false,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience an electrifying night of live EDM, rock, and indie artists with immersive laser shows, world-class sound design, and curated food stalls.',
    tiers: [
      { name: 'General Admission', price: 999, desc: 'Entry to festival grounds + regular standing zone' },
      { name: 'VIP Pass', price: 2499, desc: 'Front-row stage access, express queue + 2 complimentary drinks' },
      { name: 'Fan Pit Pass', price: 3999, desc: 'Ultra-exclusive fan zone right near the stage + official merch kit' }
    ]
  },
  {
    id: 2,
    title: 'Mumbai Contemporary Art Show',
    category: 'Art',
    categoryIcon: '🎨',
    dateDisplay: 'Fri, Sep 27, 2026 · 11:00 AM',
    venue: 'NGMA, Mumbai',
    city: 'Mumbai',
    price: 350,
    priceDisplay: '₹350',
    rating: 4.7,
    reviews: 156,
    isTrending: true,
    isUpcoming: false,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore over 200 breathtaking installations, contemporary paintings, and sculptures by emerging and celebrated Indian modern artists.',
    tiers: [
      { name: 'Standard Entry', price: 350, desc: 'Full gallery access + exhibition guide booklet' },
      { name: 'Curator Guided Tour', price: 850, desc: 'Private guided walkthrough with art historians + catalog' }
    ]
  },
  {
    id: 3,
    title: 'IPL Finals Watch Party',
    category: 'Sports',
    categoryIcon: '🏅',
    dateDisplay: 'Sun, Oct 12, 2026 · 7:00 PM',
    venue: 'Phoenix Palladium, Mumbai',
    city: 'Mumbai',
    price: 499,
    priceDisplay: '₹499',
    rating: 4.9,
    reviews: 512,
    isTrending: true,
    isUpcoming: false,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    description: 'Cheer for your favorite teams on a massive 40-foot 4K LED screen with stadium-like surround sound, DJ beats, live food trucks, and electric IPL fan vibes.',
    tiers: [
      { name: 'Fan Zone Entry', price: 499, desc: 'Open seating arena + free face painting' },
      { name: 'Lounge Seating', price: 1299, desc: 'Comfortable sofa seating + unlimited popcorn and mocktails' }
    ]
  },
  {
    id: 4,
    title: 'TechSummit India 2026',
    category: 'Tech',
    categoryIcon: '💻',
    dateDisplay: 'Thu, Sep 19, 2026 · 9:00 AM',
    venue: 'HICC, Hyderabad',
    city: 'Hyderabad',
    price: 2500,
    priceDisplay: '₹2,500',
    rating: 4.6,
    reviews: 218,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: 'India’s premier technology leadership summit discussing Generative AI, Cloud Scalability, Robotics, and Founder ecosystems.',
    tiers: [
      { name: 'Conference Pass', price: 2500, desc: 'Access to all keynote stages, expo arena + lunch' },
      { name: 'VIP Networking Pass', price: 6500, desc: 'Private lounge access, speaker mixer + investor pitch tracks' }
    ]
  },
  {
    id: 5,
    title: 'Street Food Carnival',
    category: 'Food',
    categoryIcon: '🍲',
    dateDisplay: 'Sun, Oct 5, 2026 · 12:00 PM',
    venue: 'Palace Grounds, Bangalore',
    city: 'Bangalore',
    price: 0,
    priceDisplay: 'Free',
    rating: 4.5,
    reviews: 89,
    isTrending: false,
    isUpcoming: true,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    description: 'Celebrate culinary delights from all corners of India! Over 100 artisanal street food stalls, live acoustic music, and dessert trucks.',
    tiers: [
      { name: 'Free Entry Registration', price: 0, desc: 'General entry pass (Food/drinks purchased directly at stalls)' },
      { name: 'Foodie Tasting Passport', price: 499, desc: 'Includes entry + 5 pre-paid signature tasting vouchers' }
    ]
  },
  {
    id: 6,
    title: 'Stand-Up Night: Laugh Riot',
    category: 'Comedy',
    categoryIcon: '😂',
    dateDisplay: 'Fri, Oct 3, 2026 · 8:00 PM',
    venue: 'Canvas Laugh Club, Pune',
    city: 'Pune',
    price: 699,
    priceDisplay: '₹699',
    rating: 4.7,
    reviews: 274,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
    description: 'Get ready for 90 minutes of non-stop laughs with top touring stand-up comedians delivering brand-new punchlines and crowd work.',
    tiers: [
      { name: 'Standard Seat', price: 699, desc: 'Standard comedy club auditorium seat' },
      { name: 'Front Row Seating', price: 1199, desc: 'Front row seats (Warning: high chance of crowd work interaction!)' }
    ]
  },
  {
    id: 7,
    title: 'Zenith Yoga & Mindfulness Retreat',
    category: 'Wellness',
    categoryIcon: '🧘',
    dateDisplay: 'Sun, Oct 18, 2026 · 7:00 AM',
    venue: 'Lodhi Gardens, Delhi',
    city: 'Delhi',
    price: 499,
    priceDisplay: '₹499',
    rating: 4.9,
    reviews: 132,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    description: 'A calming morning session of Vinyasa flow, breathwork (Pranayama), and guided sound bath meditation amidst lush greenery.',
    tiers: [
      { name: 'General Yogi Pass', price: 499, desc: 'Includes yoga mat rental + organic herbal tea' }
    ]
  },
  {
    id: 8,
    title: 'Cinematography & Lighting Workshop',
    category: 'Workshop',
    categoryIcon: '📷',
    dateDisplay: 'Sat, Nov 7, 2026 · 10:00 AM',
    venue: 'Film City, Mumbai',
    city: 'Mumbai',
    price: 1499,
    priceDisplay: '₹1,499',
    rating: 4.8,
    reviews: 95,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    description: 'Hands-on practical lighting masterclass for filmmakers, content creators, and indie directors using cinema-grade rigs.',
    tiers: [
      { name: 'Workshop Participant', price: 1499, desc: 'Access to lighting studio + hands-on camera rigs + certificate' }
    ]
  }
];

const EVENTS_VERSION = 'v5_updated_images';
const EVENTS_STORAGE_KEY = 'eventease_events_data';

// LocalStorage helpers for persistent data
const EventStore = {
  getEvents() {
    const versionStored = localStorage.getItem('eventease_events_version');
    if (versionStored !== EVENTS_VERSION) {
      // Overwrite/update with fresh imagery and metadata
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      localStorage.setItem('eventease_events_version', EVENTS_VERSION);
      return INITIAL_EVENTS;
    }

    const data = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      localStorage.setItem('eventease_events_version', EVENTS_VERSION);
      return INITIAL_EVENTS;
    }
    return JSON.parse(data);
  },

  getEventById(id) {
    const events = this.getEvents();
    return events.find(e => String(e.id) === String(id));
  },

  getWishlist() {
    const data = localStorage.getItem('eventease_wishlist');
    return data ? JSON.parse(data) : [];
  },

  toggleWishlist(eventId) {
    let list = this.getWishlist();
    const idx = list.indexOf(eventId);
    let isLiked = false;
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(eventId);
      isLiked = true;
    }
    localStorage.setItem('eventease_wishlist', JSON.stringify(list));
    return isLiked;
  },

  isWishlisted(eventId) {
    const list = this.getWishlist();
    return list.includes(eventId);
  },

  getAllBookings() {
    const data = localStorage.getItem('eventease_my_bookings');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (_) {
      return [];
    }
  },

  /** Get bookings strictly for the logged-in user or specified email */
  getBookings(filterEmail = null) {
    const currentUser = (typeof Auth !== 'undefined' && Auth.getUser) ? Auth.getUser() : null;
    const targetEmail = (filterEmail || (currentUser ? currentUser.email : '') || '').trim().toLowerCase();
    if (!targetEmail) return [];

    const all = this.getAllBookings();
    return all.filter(b => b && b.userEmail && b.userEmail.trim().toLowerCase() === targetEmail);
  },

  getBookingById(bookingId) {
    const all = this.getAllBookings();
    return all.find(b => b && b.bookingId === bookingId) || null;
  },

  addBooking(booking) {
    const currentUser = (typeof Auth !== 'undefined' && Auth.getUser) ? Auth.getUser() : null;
    if (!booking.userEmail && currentUser && currentUser.email) {
      booking.userEmail = currentUser.email;
      booking.userName = currentUser.name || booking.userName;
    }
    if (booking.userEmail) {
      booking.userEmail = booking.userEmail.trim().toLowerCase();
    }
    const all = this.getAllBookings();
    all.unshift(booking);
    localStorage.setItem('eventease_my_bookings', JSON.stringify(all));
    return booking;
  },

  cancelBooking(bookingId) {
    let all = this.getAllBookings();
    all = all.filter(b => b && b.bookingId !== bookingId);
    localStorage.setItem('eventease_my_bookings', JSON.stringify(all));
  }
};

/** Image fallback handler */
function handleImageError(imgEl, category = 'Event') {
  if (imgEl.dataset.hasFailed) return;
  imgEl.dataset.hasFailed = 'true';
  const categoryFallbacks = {
    Music: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    Art: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    Sports: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    Tech: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    Food: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    Comedy: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80'
  };
  imgEl.src = categoryFallbacks[category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';
}

/** Show beautiful toast notification */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    info: 'fa-bell',
    warning: 'fa-exclamation-triangle'
  };

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/** Render standard Event Card HTML */
function renderEventCard(evt) {
  const isLiked = EventStore.isWishlisted(evt.id);
  const priceLabel = evt.price === 0 ? 'Free' : `₹${evt.price.toLocaleString('en-IN')}`;
  const priceClass = evt.price === 0 ? 'price-free' : '';
  const onwardsText = evt.price === 0 ? '' : '<span>onwards</span>';

  return `
    <div class="event-card" onclick="openBookingModal(${evt.id})">
      <div class="event-card-img-wrap">
        <img src="${evt.image}" alt="${evt.title}" loading="lazy" onerror="handleImageError(this, '${evt.category}')" />
        <div class="event-card-top-badges">
          <span class="category-tag-pill">${evt.category}</span>
          <button class="wishlist-heart-btn ${isLiked ? 'liked' : ''}" 
                  onclick="handleWishlistClick(event, ${evt.id})" 
                  title="Save to favorites">
            <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        ${evt.isTrending ? '<span class="trending-overlay-badge"><i class="fas fa-bolt"></i> Trending</span>' : ''}
        ${evt.isFree ? '<span class="free-overlay-badge">FREE</span>' : ''}
      </div>
      <div class="event-card-body">
        <h3 class="event-card-title">${evt.title}</h3>
        <div class="event-card-info-row">
          <i class="far fa-calendar-alt"></i>
          <span>${evt.dateDisplay}</span>
        </div>
        <div class="event-card-info-row">
          <i class="fas fa-map-marker-alt"></i>
          <span>${evt.venue}</span>
        </div>
        <div class="event-card-footer">
          <div class="event-card-price ${priceClass}">
            ${priceLabel} ${onwardsText}
          </div>
          <div class="event-card-rating">
            <i class="fas fa-star"></i>
            <span>${evt.rating}</span>
            <span>(${evt.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleWishlistClick(e, eventId) {
  e.stopPropagation();
  const isLiked = EventStore.toggleWishlist(eventId);
  const btn = e.currentTarget;
  if (isLiked) {
    btn.classList.add('liked');
    btn.innerHTML = '<i class="fas fa-heart"></i>';
    showToast('Saved to your favorites! ❤️', 'success');
  } else {
    btn.classList.remove('liked');
    btn.innerHTML = '<i class="far fa-heart"></i>';
    showToast('Removed from favorites', 'info');
  }
}

