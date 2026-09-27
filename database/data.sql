-- ============================================================
-- EventEase Sample Data
-- Run AFTER schema.sql
-- ============================================================

USE eventease_db;

-- -----------------------------------------------
-- Categories
-- -----------------------------------------------
INSERT INTO categories (name, icon) VALUES
('Technology',    'fas fa-microchip'),
('Music',         'fas fa-music'),
('Sports',        'fas fa-futbol'),
('Cultural',      'fas fa-palette'),
('Conference',    'fas fa-users'),
('Workshop',      'fas fa-tools'),
('Business',      'fas fa-briefcase'),
('Health',        'fas fa-heartbeat');

-- -----------------------------------------------
-- Admin User (password: Admin@123 — BCrypt)
-- -----------------------------------------------
INSERT INTO users (name, email, password, phone, role) VALUES
('EventEase Admin', 'admin@eventease.com',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LoeVxEKMkIW.kqB.W',
 '9000000000', 'ADMIN');

-- -----------------------------------------------
-- Sample Users (password: User@123 — BCrypt)
-- -----------------------------------------------
INSERT INTO users (name, email, password, phone, role) VALUES
('Arjun Sharma',   'arjun@gmail.com',   '$2a$12$Kix3tHkL8wEzPrTXpqfGjO3dHsKlqN9ZmWvLrJmFuNp9GXAh2fZdC', '9876543210', 'USER'),
('Priya Nair',     'priya@gmail.com',   '$2a$12$Kix3tHkL8wEzPrTXpqfGjO3dHsKlqN9ZmWvLrJmFuNp9GXAh2fZdC', '9876543211', 'USER'),
('Rahul Verma',    'rahul@gmail.com',   '$2a$12$Kix3tHkL8wEzPrTXpqfGjO3dHsKlqN9ZmWvLrJmFuNp9GXAh2fZdC', '9876543212', 'USER'),
('Sneha Patel',    'sneha@gmail.com',   '$2a$12$Kix3tHkL8wEzPrTXpqfGjO3dHsKlqN9ZmWvLrJmFuNp9GXAh2fZdC', '9876543213', 'USER');

-- -----------------------------------------------
-- Events
-- -----------------------------------------------
INSERT INTO events (title, description, category_id, organizer, venue, city, state, event_date, end_date, image_url, total_seats, available_seats, status) VALUES

-- Technology
('TechFest 2026 – India''s Biggest Tech Conference',
 'Join 5000+ tech enthusiasts, startup founders, and industry leaders at TechFest 2026. Explore AI, ML, Web3, Cloud Computing, and Cybersecurity through keynotes, panels, workshops, and networking sessions. Featuring speakers from Google, Microsoft, ISRO, and top Indian unicorns.',
 1, 'TechFest India Pvt Ltd', 'BIEC – Bangalore International Exhibition Centre', 'Bengaluru', 'Karnataka',
 '2026-09-15 09:00:00', '2026-09-17 18:00:00',
 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 5000, 4820, 'UPCOMING'),

('AI & Machine Learning Workshop',
 'A hands-on 2-day workshop designed for developers and data science enthusiasts. Learn to build real-world ML models using Python, TensorFlow, and PyTorch. Each participant gets a laptop station, dataset access, and a certificate of completion.',
 6, 'DataMinds Academy', 'IIT Madras Research Park', 'Chennai', 'Tamil Nadu',
 '2026-09-28 10:00:00', '2026-09-29 17:00:00',
 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800', 200, 143, 'UPCOMING'),

('Blockchain & Web3 Summit',
 'Explore the decentralised future with crypto leaders, NFT artists, DeFi protocol builders, and government policy makers. Panel discussions on India''s crypto regulation, practical DeFi tutorials, and hackathon with ₹10 Lakh prize pool.',
 1, 'Crypto India Foundation', 'The Lalit Hotel, Connaught Place', 'New Delhi', 'Delhi',
 '2026-10-05 09:30:00', '2026-10-06 20:00:00',
 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800', 800, 612, 'UPCOMING'),

-- Music
('Sunburn Arena ft. DJ Marshmello',
 'Experience the ultimate electronic music festival featuring DJ Marshmello LIVE, with supporting acts from India''s top DJs. 3 stages, LED light shows, food courts, art installations, and an electric crowd of 20,000+ music lovers.',
 2, 'Percept Live', 'MMRDA Grounds, BKC', 'Mumbai', 'Maharashtra',
 '2026-10-20 16:00:00', '2026-10-20 23:59:00',
 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', 20000, 17500, 'UPCOMING'),

('Classical Carnatic Music Evening',
 'An enchanting evening of Carnatic classical music featuring Padma Bhushan awardee Dr. Sanjay Subrahmanyam, accompanied by master percussionist Trichy Gurumurthy. Presented in the grandeur of Chowmahalla Palace.',
 2, 'Swaranjali Arts', 'Chowmahalla Palace', 'Hyderabad', 'Telangana',
 '2026-09-12 18:30:00', '2026-09-12 22:00:00',
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', 500, 320, 'UPCOMING'),

-- Sports
('IPL Fan Fest 2026 – Watch Party & Live Experience',
 'Watch the IPL Final LIVE on a massive 100-foot screen with 10,000 cricket fans. Activities include cricket nets, meet-and-greet with IPL legends, merchandise stalls, food zones, and entertainment for the whole family.',
 3, 'BCCI Fan Engagement', 'Jawaharlal Nehru Stadium', 'Kolkata', 'West Bengal',
 '2026-10-12 14:00:00', '2026-10-12 23:00:00',
 'https://images.unsplash.com/photo-1540747913346-19212a4b423e?w=800', 10000, 9200, 'UPCOMING'),

('Bengaluru Marathon 2026',
 'India''s premier running event returns! Open categories: 5K Fun Run, 10K, Half Marathon (21K), and Full Marathon (42K). AIMS-certified course, live tracking, hydration zones, and finisher medals for all participants. Raises funds for rural education.',
 3, 'Procam International', 'Kanteerava Stadium', 'Bengaluru', 'Karnataka',
 '2026-09-22 05:30:00', '2026-09-22 13:00:00',
 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800', 15000, 10500, 'UPCOMING'),

-- Cultural
('Navratri Mahotsav 2026',
 'Celebrate 9 nights of Navratri in the most spectacular fashion! Traditional Garba & Dandiya with live orchestra, celebrity performances, folk dance competitions, cultural exhibitions, and authentic Gujarati food. All age groups welcome.',
 4, 'Gujarati Samaj Chennai', 'MGR Janaki College Grounds', 'Chennai', 'Tamil Nadu',
 '2026-10-02 18:00:00', '2026-10-10 23:00:00',
 'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=800', 8000, 6400, 'UPCOMING'),

('India Art & Craft Fair',
 'A 5-day celebration of India''s rich artisanal heritage. 300+ artisans from 28 states showcase handloom textiles, pottery, woodcraft, tribal art, and jewelry. Live demonstrations, cultural performances, and workshops for kids and adults.',
 4, 'Crafts Council of India', 'Pragati Maidan', 'New Delhi', 'Delhi',
 '2026-10-15 10:00:00', '2026-10-19 20:00:00',
 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800', 50000, 42000, 'UPCOMING'),

-- Conference / Business
('HR & Future of Work Summit',
 'India''s leading HR conference brings together 200+ CHROs, HR directors, and talent leaders to discuss the future of work, AI in HR, employee experience, DEI, and global workforce trends. Certification credits available.',
 5, 'People Matters Media', 'The Leela Ambience, Gurugram', 'Gurugram', 'Haryana',
 '2026-09-30 09:00:00', '2026-09-30 18:30:00',
 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800', 600, 480, 'UPCOMING'),

-- Health
('Mindfulness & Wellness Retreat',
 'A weekend retreat to reset your mind and body. Programs include sunrise yoga, guided meditation, sound healing, Ayurvedic nutrition workshops, and individual counseling sessions. Limited to 80 participants for an intimate experience.',
 8, 'Inner Peace Foundation', 'Isha Yoga Center', 'Coimbatore', 'Tamil Nadu',
 '2026-10-08 06:00:00', '2026-10-10 18:00:00',
 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 80, 45, 'UPCOMING');

-- -----------------------------------------------
-- Ticket Types per Event
-- -----------------------------------------------
-- Event 1: TechFest 2026
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(1, 'Student Pass',   499.00,  1000, 'Access to all 3 days. Requires valid student ID.'),
(1, 'General Pass',  1499.00,  3000, 'Full 3-day access to all talks and expo halls.'),
(1, 'VIP Pass',      4999.00,  500,  'Front seating, speaker meet & greet, exclusive lounge, swag kit.');

-- Event 2: AI Workshop
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(2, 'Individual',    2999.00,  150, '2-day workshop + certificate + lunch.'),
(2, 'Group (5)',    12999.00,   50, 'Group booking for 5 people. Best value!');

-- Event 3: Blockchain Summit
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(3, 'General',      1999.00,  600, 'Full access to both days.'),
(3, 'VIP',          5999.00,  150, 'VIP networking dinner + exclusive sessions.'),
(3, 'Hackathon',     999.00,   50, 'Access to 24-hour hackathon only.');

-- Event 4: Sunburn Arena
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(4, 'General',      1999.00, 15000, 'Standing area access.'),
(4, 'VIP',          4999.00,  4000, 'VIP zone with dedicated bar and seating.'),
(4, 'Platinum',     9999.00,  1000, 'Front stage, backstage access, artist meet & greet.');

-- Event 5: Classical Music Evening
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(5, 'General',       299.00,  350, 'Open seating in general enclosure.'),
(5, 'Premium',       799.00,  100, 'Front rows, special souvenir program booklet.'),
(5, 'Patron',       1999.00,   50, 'First 5 rows + pre-concert dinner with artists.');

-- Event 6: IPL Fan Fest
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(6, 'General',       399.00,  8000, 'General viewing area.'),
(6, 'Premium',       999.00,  1500, 'Premium seating section + food voucher ₹200.'),
(6, 'Family Pack',  1499.00,   500, 'Entry for 4 persons (2 adults + 2 kids).');

-- Event 7: Bengaluru Marathon
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(7, '5K Fun Run',    499.00,  5000, 'T-shirt, finisher medal, water.'),
(7, '10K Run',       799.00,  5000, 'Timing chip, T-shirt, medal, energy drink.'),
(7, 'Half Marathon', 999.00,  3000, 'Certified timing, T-shirt, medal, banana, electrolytes.'),
(7, 'Full Marathon', 1499.00, 2000, 'AIMS certified, timing chip, T-shirt, finisher medal, post-race snack box.');

-- Event 8: Navratri
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(8, 'Single Night',   199.00,  5000, 'Entry for one evening (6 PM–12 AM).'),
(8, 'All 9 Nights',  1199.00, 3000, 'Full festival pass for all 9 nights.');

-- Event 9: India Art Fair
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(9, 'Day Pass',        99.00, 40000, 'Entry for one day.'),
(9, '5-Day Pass',     299.00, 10000, 'All 5 days unlimited entry.');

-- Event 10: HR Summit
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(10, 'Delegate',     4999.00,  500, 'Full day access, lunch, and networking.'),
(10, 'Corporate',    3499.00,  100, 'Group of 3 delegates. Includes digital proceedings.');

-- Event 11: Wellness Retreat
INSERT INTO tickets (event_id, type_name, price, quantity, description) VALUES
(11, 'Shared Dorm',  5999.00,  40, '2-night shared accommodation + all sessions + meals.'),
(11, 'Private Room', 9999.00,  40, '2-night private room + all sessions + meals + 1 individual session.');

-- -----------------------------------------------
-- Sample Bookings (for demo)
-- -----------------------------------------------
INSERT INTO bookings (booking_ref, user_id, event_id, ticket_id, quantity, total_amount, status) VALUES
('EVT-2026-0001', 2, 1, 2, 2, 2998.00, 'CONFIRMED'),
('EVT-2026-0002', 3, 4, 9, 1, 1999.00, 'CONFIRMED'),
('EVT-2026-0003', 4, 7, 18, 1,  799.00, 'CONFIRMED'),
('EVT-2026-0004', 2, 2, 4, 1, 2999.00, 'CONFIRMED'),
('EVT-2026-0005', 5, 8, 22, 4,  796.00, 'CANCELLED');

-- Sample Payments
INSERT INTO payments (booking_id, transaction_ref, amount, method, status) VALUES
(1, 'TXN-A1B2C3D4', 2998.00, 'UPI',  'SUCCESS'),
(2, 'TXN-E5F6G7H8', 1999.00, 'CARD', 'SUCCESS'),
(3, 'TXN-I9J0K1L2', 799.00,  'CARD', 'SUCCESS'),
(4, 'TXN-M3N4O5P6', 2999.00, 'NETBANKING', 'SUCCESS');
