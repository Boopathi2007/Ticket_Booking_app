# 🎟️ EventEase – Ticket Booking App

A full-stack event discovery and ticket booking platform available in:
- **React Frontend (Vite + Modern React Hooks & Context)** ⚡
- **Vanilla Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Spring Boot (Java) + MySQL

---

## 🚀 Running the App

### 🌟 Option 1: Modern React App (Recommended)
Run the React app with one click using the batch file:
```
Double-click: start-react.bat
```
Or manually in terminal:
```bash
cd react-app
npm run dev
```
Then open: [http://localhost:5173](http://localhost:5173)

#### ✨ Extra Features in the React Version:
1. **🌙 Dark Mode / Light Mode Toggle**: One-click theme switcher with persistent preference.
2. **🔍 Advanced Filters**: Price range slider (₹0–₹5000), minimum ratings (4.5★+), sort options (price, rating, popularity), and "Free Only" toggle.
3. **📊 Dedicated Event Detail Page**: Real-time attendee counter, highlights, and interactive venue map.
4. **🎟️ Authentic QR Code Generator**: Each booking generates a unique gate-scannable QR code.
5. **❤️ Wishlist / Saved Events Page**: Dedicated page to manage your favorite concerts and events.
6. **🔔 Live Notification System**: Booking alerts, event reminders, and unread notification badge flyout.
7. **👤 My Profile & Custom Avatar**: Profile settings with preset avatar pickers, stats counters, and contact details.
8. **📱 Mobile Bottom Navigation Bar**: Clean sticky navigation bar tailored for mobile devices.


### Option 1: Frontend Only (Offline / Demo Mode)
Run the frontend server using the provided batch file:

```
Double-click: start-frontend.bat
```
Or manually:
```bash
python -m http.server 3000 --directory frontend
```
Then open: [http://localhost:3000](http://localhost:3000)

> ℹ️ In offline mode, registration & login work via **localStorage** (browser storage). No backend needed.

---

### Option 2: Full Stack (Frontend + Spring Boot Backend)

**Step 1: Start the Backend**
```
Double-click: start-backend.bat
```
Or manually:
```bash
cd backend
mvn spring-boot:run
```
Backend runs at: `http://localhost:8080/api`

**Step 2: Configure MySQL**
1. Create a MySQL database named `eventease_db`
2. Run `database/schema.sql` to create tables
3. Run `database/data.sql` to insert sample data
4. Update `backend/src/main/resources/application.properties`:
   ```
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

**Step 3: Start the Frontend**
```
Double-click: start-frontend.bat
```

---

## 👤 How to Use

### Register a New Account
1. Go to [http://localhost:3000/register.html](http://localhost:3000/register.html)
2. Enter your **Full Name**, Email, Phone, and Password
3. Click **Create free account**
4. You'll be logged in automatically with your name

### Sign In
1. Go to [http://localhost:3000/login.html](http://localhost:3000/login.html)
2. Enter the **same email & password** you used during registration
3. Your name from registration will appear in the header

> ⚠️ You **must register first** before you can log in. Login will show an error if no account exists for that email.

---

## 🔐 Developer / Admin Credentials

> These are for **development testing only**. Do not expose in production.

| Role  | Email                    | Password   |
|-------|--------------------------|------------|
| Admin | `admin@eventease.in`     | `Admin@123` |
| Admin | `admin@eventease.com`    | `Admin@123` |
| User  | `arjun@gmail.com`        | `User@123`  |
| User  | `priya@gmail.com`        | `User@123`  |
| User  | `rahul@gmail.com`        | `User@123`  |
| User  | `sneha@gmail.com`        | `User@123`  |

> 💡 Admin login in **offline mode**: type `admin@eventease.in` — the system detects "admin" in the email and grants ADMIN role automatically.

---

## 📁 Project Structure

```
Ticket_booking_app/
├── frontend/           # HTML/CSS/JS frontend
│   ├── index.html      # Home page
│   ├── events.html     # Events listing
│   ├── booking.html    # Booking flow
│   ├── tickets.html    # My tickets
│   ├── login.html      # Sign in
│   ├── register.html   # Sign up
│   ├── css/style.css   # Global styles
│   └── js/
│       ├── auth.js     # Auth & session management
│       ├── utils.js    # Utilities & local storage
│       └── api.js      # Backend API client
├── backend/            # Spring Boot backend
│   ├── src/
│   └── pom.xml
├── database/
│   ├── schema.sql      # DB table definitions
│   └── data.sql        # Sample seed data
├── start-frontend.bat  # Quick start: frontend server
└── start-backend.bat   # Quick start: backend server
```

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | HTML5, CSS3, JavaScript |
| Backend   | Spring Boot, Java 17    |
| Database  | MySQL 8+                |
| Auth      | JWT (JSON Web Tokens)   |
| Security  | BCrypt password hashing |
