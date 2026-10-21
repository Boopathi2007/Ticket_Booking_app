// EventEase — Event Dataset & LocalStorage Store

export const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Neon Nights Music Festival',
    category: 'Music',
    categoryIcon: '🎵',
    dateDisplay: 'Sat, Sep 14, 2026 · 6:00 PM',
    dateISO: '2026-09-14',
    venue: 'JLN Stadium, Delhi',
    city: 'Delhi',
    price: 999,
    priceDisplay: '₹999',
    rating: 4.8,
    reviews: 342,
    attendees: 1240,
    isTrending: true,
    isUpcoming: false,
    isFree: false,
    lat: 28.5867, lng: 77.2330,
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
    dateISO: '2026-09-27',
    venue: 'NGMA, Mumbai',
    city: 'Mumbai',
    price: 350,
    priceDisplay: '₹350',
    rating: 4.7,
    reviews: 156,
    attendees: 520,
    isTrending: true,
    isUpcoming: false,
    isFree: false,
    lat: 18.9322, lng: 72.8264,
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
    dateISO: '2026-10-12',
    venue: 'Phoenix Palladium, Mumbai',
    city: 'Mumbai',
    price: 499,
    priceDisplay: '₹499',
    rating: 4.9,
    reviews: 512,
    attendees: 2100,
    isTrending: true,
    isUpcoming: false,
    isFree: false,
    lat: 19.0863, lng: 72.8817,
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
    dateISO: '2026-09-19',
    venue: 'HICC, Hyderabad',
    city: 'Hyderabad',
    price: 2500,
    priceDisplay: '₹2,500',
    rating: 4.6,
    reviews: 218,
    attendees: 870,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    lat: 17.4399, lng: 78.4983,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: "India's premier technology leadership summit discussing Generative AI, Cloud Scalability, Robotics, and Founder ecosystems.",
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
    dateISO: '2026-10-05',
    venue: 'Palace Grounds, Bangalore',
    city: 'Bangalore',
    price: 0,
    priceDisplay: 'Free',
    rating: 4.5,
    reviews: 89,
    attendees: 3400,
    isTrending: false,
    isUpcoming: true,
    isFree: true,
    lat: 13.0012, lng: 77.5797,
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
    dateISO: '2026-10-03',
    venue: 'Canvas Laugh Club, Pune',
    city: 'Pune',
    price: 699,
    priceDisplay: '₹699',
    rating: 4.7,
    reviews: 274,
    attendees: 390,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    lat: 18.5204, lng: 73.8567,
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
    dateISO: '2026-10-18',
    venue: 'Lodhi Gardens, Delhi',
    city: 'Delhi',
    price: 499,
    priceDisplay: '₹499',
    rating: 4.9,
    reviews: 132,
    attendees: 210,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    lat: 28.5930, lng: 77.2197,
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
    dateISO: '2026-11-07',
    venue: 'Film City, Mumbai',
    city: 'Mumbai',
    price: 1499,
    priceDisplay: '₹1,499',
    rating: 4.8,
    reviews: 95,
    attendees: 120,
    isTrending: false,
    isUpcoming: true,
    isFree: false,
    lat: 19.1714, lng: 72.8464,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    description: 'Hands-on practical lighting masterclass for filmmakers, content creators, and indie directors using cinema-grade rigs.',
    tiers: [
      { name: 'Workshop Participant', price: 1499, desc: 'Access to lighting studio + hands-on camera rigs + certificate' }
    ]
  }
];

const EVENTS_VERSION = 'v6_react';
const EVENTS_KEY = 'eventease_events_data';
const WISHLIST_KEY = 'eventease_wishlist';
const BOOKINGS_KEY = 'eventease_my_bookings';
const AUTH_KEY = 'eventease_current_user';

export const EventStore = {
  getEvents() {
    const v = localStorage.getItem('eventease_events_version');
    if (v !== EVENTS_VERSION) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
      localStorage.setItem('eventease_events_version', EVENTS_VERSION);
      return INITIAL_EVENTS;
    }
    const data = localStorage.getItem(EVENTS_KEY);
    return data ? JSON.parse(data) : INITIAL_EVENTS;
  },
  getEventById(id) {
    return this.getEvents().find(e => String(e.id) === String(id)) || null;
  },
  getWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  },
  isWishlisted(id) {
    return this.getWishlist().includes(id);
  },
  toggleWishlist(id) {
    let list = this.getWishlist();
    const idx = list.indexOf(id);
    if (idx > -1) { list.splice(idx, 1); return false; }
    else { list.push(id); localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); return true; }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  },
  getAllBookings() {
    try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]'); } catch { return []; }
  },
  getBookings(email) {
    const e = (email || '').toLowerCase();
    return this.getAllBookings().filter(b => b && b.userEmail && b.userEmail.toLowerCase() === e);
  },
  addBooking(booking) {
    const all = this.getAllBookings();
    all.unshift(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
    return booking;
  },
  cancelBooking(bookingId) {
    const all = this.getAllBookings().filter(b => b.bookingId !== bookingId);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
  }
};

export const AuthStore = {
  getUser() {
    try {
      const u = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
      return u && u.isLoggedIn ? u : null;
    } catch { return null; }
  },
  setUser(user) {
    const name = user.name || user.email?.split('@')[0] || 'User';
    const firstName = name.split(' ')[0];
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
    const obj = { id: user.id || Date.now(), name, firstName, initials, email: user.email || '', phone: user.phone || '', role: user.role || 'USER', avatar: user.avatar || null, isLoggedIn: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(obj));
    return obj;
  },
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
  isLoggedIn() {
    return !!this.getUser();
  },
  register(data) {
    const users = JSON.parse(localStorage.getItem('eventease_registered_users') || '[]');
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) return { success: false, error: 'Email already registered' };
    const newUser = { ...data, id: Date.now(), role: 'USER' };
    users.push(newUser);
    localStorage.setItem('eventease_registered_users', JSON.stringify(users));
    return { success: true, user: newUser };
  },
  login(email, password) {
    const users = JSON.parse(localStorage.getItem('eventease_registered_users') || '[]');
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    return { success: true, user: found };
  }
};
