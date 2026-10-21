/* ================================================================
   auth.js – Authentication and User State Manager
   ================================================================ */

const AUTH_STORAGE_KEY = 'eventease_current_user';

// ── One-time cleanup: remove stale mock/hardcoded data from old version ──
(function cleanStaleMockData() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const u = JSON.parse(raw);
      // If the stored user is the old hardcoded mock, clear it
      if (
        u &&
        (u.email === 'priya@example.com' ||
         u.name === 'Priya Sharma' ||
         u.initials === 'PS')
      ) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem('eventease_token');
      }
    }
  } catch (_) {}
})();

const Auth = {
  /** Get logged in user or null */
  getUser() {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!data) return null;
    try {
      const u = JSON.parse(data);
      if (u && u.isLoggedIn) return u;
      return null;
    } catch (e) {
      return null;
    }
  },

  /** Check if currently logged in */
  isLoggedIn() {
    const u = this.getUser();
    return !!(u && u.isLoggedIn);
  },

  /** Require login or redirect */
  requireAuth(redirectUrl = 'login.html') {
    if (!this.isLoggedIn()) {
      window.location.href = `${redirectUrl}?redirect=${encodeURIComponent(window.location.pathname.split('/').pop() + window.location.search)}`;
    }
  },

  /** Store authenticated user */
  setUser(user) {
    const defaultName = user.email ? (user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)) : 'User';
    const name = user.name || defaultName;
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'U';
    const firstName = name.split(' ')[0] || 'User';

    const userObj = {
      id: user.id || Date.now(),
      name: name,
      firstName: firstName,
      initials: initials,
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'USER',
      isLoggedIn: true
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userObj));
    return userObj;
  },

  /** Log out user, remove auth state, and update UI */
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('eventease_token');
    if (typeof showToast === 'function') {
      showToast('Logged out successfully', 'info');
    }
    // Redirect or reload
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 400);
  },

  /** Demo / Local Login Helper */
  loginAs(email, name = null, role = null) {
    let finalRole = role || (email.toLowerCase().includes('admin') ? 'ADMIN' : 'USER');
    let finalName = name;

    if (!finalName) {
      const registeredUsers = JSON.parse(localStorage.getItem('eventease_registered_users') || '[]');
      const found = registeredUsers.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
      if (found && found.name) {
        finalName = found.name;
        finalRole = found.role || finalRole;
      } else if (finalRole === 'ADMIN') {
        finalName = 'EventEase Admin';
      } else {
        const username = email.split('@')[0] || 'User';
        finalName = username.charAt(0).toUpperCase() + username.slice(1);
      }
    }

    this.setUser({
      id: finalRole === 'ADMIN' ? 1 : Date.now(),
      name: finalName,
      email: email,
      role: finalRole
    });
    if (typeof showToast === 'function') {
      showToast(`Welcome back, ${finalName}!`, 'success');
    }
    setTimeout(() => {
      const redirect = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
      window.location.href = redirect;
    }, 500);
  },

  /**
   * Render the top-right header area dynamically:
   * - If Logged In: Notification Bell with flyout + Avatar with Initials + Profile Dropdown
   * - If Logged Out: "Sign In" and "Get Started" buttons
   */
  renderHeaderNav(targetElId = 'nav-user-area') {
    const container = document.getElementById(targetElId);
    if (!container) return;

    const user = this.getUser();

    if (user && user.isLoggedIn) {
      // Logged in UI
      container.innerHTML = `
        <!-- Notification Bell & Flyout -->
        <div style="position: relative;">
          <button class="nav-icon-btn" id="nav-notif-btn" onclick="Auth.toggleNotifications(event)" title="Notifications">
            <i class="far fa-bell"></i>
            <span class="badge-dot" id="notif-badge"></span>
          </button>
          <div class="dropdown-menu notif-dropdown" id="notif-dropdown">
            <div class="dropdown-header" style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:0.9rem; color:var(--text-heading);">Notifications</span>
              <button onclick="Auth.clearNotifications(event)" style="background:none; border:none; color:var(--primary); font-size:0.75rem; font-weight:600; cursor:pointer;">Mark all read</button>
            </div>
            <div class="notif-item" onclick="window.location.href='events.html'">
              <div class="notif-icon-circle" style="background:#EFF6FF; color:#3B82F6;"><i class="fas fa-ticket-alt"></i></div>
              <div class="notif-content">
                <div class="notif-title">IPL Finals Watch Party</div>
                <div class="notif-time">🏏 Stadium passes filling fast in Mumbai!</div>
              </div>
            </div>
            <div class="notif-item" onclick="window.location.href='events.html'">
              <div class="notif-icon-circle" style="background:#FDF2F8; color:#EC4899;"><i class="fas fa-palette"></i></div>
              <div class="notif-content">
                <div class="notif-title">Mumbai Contemporary Art Show</div>
                <div class="notif-time">🎨 Exclusive gallery tour this weekend</div>
              </div>
            </div>
            <div class="notif-item" onclick="window.location.href='tickets.html'">
              <div class="notif-icon-circle" style="background:#F0FDF4; color:#10B981;"><i class="fas fa-check-circle"></i></div>
              <div class="notif-content">
                <div class="notif-title">Active Booking Confirmed</div>
                <div class="notif-time">Neon Nights Music Festival ticket ready</div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Avatar & Dropdown -->
        <div style="position: relative;">
          <button class="nav-user-avatar-btn" id="user-avatar-btn" onclick="Auth.toggleUserDropdown(event)" title="${user.name}">
            ${user.initials || 'U'}
          </button>
          <div class="dropdown-menu" id="user-dropdown">
            <div class="dropdown-header">
              <div class="user-name" id="dropdown-user-name">${user.name}</div>
              <div class="user-email" id="dropdown-user-email">${user.email}</div>
              <span style="display:inline-block; margin-top:4px; font-size:0.7rem; font-weight:700; padding:2px 8px; border-radius:10px; background:var(--primary-tint); color:var(--primary);">
                ${user.role || 'USER'}
              </span>
            </div>
            <a href="tickets.html" class="dropdown-item">
              <i class="fas fa-ticket-alt"></i> My Tickets & Passes
            </a>
            <a href="events.html" class="dropdown-item">
              <i class="fas fa-compass"></i> Explore Events
            </a>
            <a href="javascript:void(0)" onclick="Auth.logout()" class="dropdown-item" style="color: #EF4444;">
              <i class="fas fa-sign-out-alt"></i> Sign Out
            </a>
          </div>
        </div>
      `;
    } else {
      // Logged out / Guest UI (No PS avatar!)
      container.innerHTML = `
        <a href="login.html" class="nav-btn-signin" id="header-signin-btn">
          Sign In
        </a>
        <a href="register.html" class="nav-btn-signup" id="header-signup-btn">
          Get Started
        </a>
      `;
    }
  },

  toggleUserDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('user-dropdown');
    const notifDropdown = document.getElementById('notif-dropdown');
    if (notifDropdown) notifDropdown.classList.remove('show');
    if (dropdown) dropdown.classList.toggle('show');
  },

  toggleNotifications(e) {
    if (e) e.stopPropagation();
    const notifDropdown = document.getElementById('notif-dropdown');
    const userDropdown = document.getElementById('user-dropdown');
    if (userDropdown) userDropdown.classList.remove('show');
    if (notifDropdown) notifDropdown.classList.toggle('show');
    const badge = document.getElementById('notif-badge');
    if (badge) badge.style.display = 'none';
  },

  clearNotifications(e) {
    if (e) e.stopPropagation();
    const notifDropdown = document.getElementById('notif-dropdown');
    if (notifDropdown) notifDropdown.classList.remove('show');
    if (typeof showToast === 'function') {
      showToast('All notifications marked as read', 'info');
    }
  }
};

// Global click listener to close dropdowns when clicking outside
window.addEventListener('click', (e) => {
  const userDropdown = document.getElementById('user-dropdown');
  const userBtn = document.getElementById('user-avatar-btn');
  if (userDropdown && (!userBtn || !userBtn.contains(e.target)) && !userDropdown.contains(e.target)) {
    userDropdown.classList.remove('show');
  }

  const notifDropdown = document.getElementById('notif-dropdown');
  const notifBtn = document.getElementById('nav-notif-btn');
  if (notifDropdown && (!notifBtn || !notifBtn.contains(e.target)) && !notifDropdown.contains(e.target)) {
    notifDropdown.classList.remove('show');
  }
});

