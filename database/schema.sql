-- ============================================================
-- EventEase Database Schema
-- SDG 9 – Industry, Innovation and Infrastructure
-- ============================================================

CREATE DATABASE IF NOT EXISTS eventease_db;
USE eventease_db;

-- -----------------------------------------------
-- Table 1: users
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL,  -- BCrypt hashed
    phone       VARCHAR(20),
    role        ENUM('USER','ADMIN') DEFAULT 'USER',
    avatar_url  VARCHAR(500),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active   BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------
-- Table 2: categories
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(100) NOT NULL UNIQUE,
    icon  VARCHAR(100)
);

-- -----------------------------------------------
-- Table 3: events
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS events (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    title            VARCHAR(200)   NOT NULL,
    description      TEXT,
    category_id      INT,
    organizer        VARCHAR(150),
    venue            VARCHAR(300)   NOT NULL,
    city             VARCHAR(100),
    state            VARCHAR(100),
    event_date       DATETIME       NOT NULL,
    end_date         DATETIME,
    image_url        VARCHAR(500),
    total_seats      INT            NOT NULL DEFAULT 100,
    available_seats  INT            NOT NULL DEFAULT 100,
    status           ENUM('UPCOMING','ONGOING','COMPLETED','CANCELLED') DEFAULT 'UPCOMING',
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- -----------------------------------------------
-- Table 4: tickets  (ticket types per event)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS tickets (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id     BIGINT         NOT NULL,
    type_name    VARCHAR(100)   NOT NULL,  -- e.g. General, VIP, Student
    price        DECIMAL(10,2)  NOT NULL,
    quantity     INT            NOT NULL,
    sold         INT            DEFAULT 0,
    description  VARCHAR(300),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Table 5: bookings
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_ref     VARCHAR(20)    NOT NULL UNIQUE,  -- e.g. EVT-20240001
    user_id         BIGINT         NOT NULL,
    event_id        BIGINT         NOT NULL,
    ticket_id       BIGINT         NOT NULL,
    quantity        INT            NOT NULL DEFAULT 1,
    total_amount    DECIMAL(10,2)  NOT NULL,
    status          ENUM('CONFIRMED','CANCELLED','PENDING') DEFAULT 'PENDING',
    booked_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    cancelled_at    DATETIME,
    FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
    FOREIGN KEY (event_id)  REFERENCES events(id)  ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Table 6: payments
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id      BIGINT         NOT NULL UNIQUE,
    transaction_ref VARCHAR(50)    NOT NULL UNIQUE,
    amount          DECIMAL(10,2)  NOT NULL,
    method          ENUM('CARD','UPI','NETBANKING','WALLET') DEFAULT 'CARD',
    status          ENUM('SUCCESS','FAILED','REFUNDED') DEFAULT 'SUCCESS',
    paid_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX idx_events_date     ON events(event_date);
CREATE INDEX idx_events_city     ON events(city);
CREATE INDEX idx_events_status   ON events(status);
CREATE INDEX idx_bookings_user   ON bookings(user_id);
CREATE INDEX idx_bookings_event  ON bookings(event_id);
