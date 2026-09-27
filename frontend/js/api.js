/* ================================================================
   api.js – EventEase REST API Client
   All fetch calls to Spring Boot backend go through here.
   BASE_URL points to http://localhost:8080/api
   ================================================================ */

const BASE_URL = 'http://localhost:8080/api';

/** Retrieve JWT token stored after login */
function getToken() {
  return localStorage.getItem('eventease_token');
}

/** Build fetch options with optional auth header */
function buildOptions(method = 'GET', body = null, auth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  return opts;
}

/** Generic request wrapper with error handling */
async function request(endpoint, method = 'GET', body = null, auth = true) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, buildOptions(method, body, auth));
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message || `HTTP ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error [${method} ${endpoint}]:`, err.message);
    throw err;
  }
}

/* ---- Auth ---- */
const api = {
  auth: {
    register: (data)  => request('/auth/register', 'POST', data, false),
    login:    (data)  => request('/auth/login',    'POST', data, false),
  },

  events: {
    list:    (params) => {
      const qs = new URLSearchParams(
        Object.fromEntries(Object.entries(params).filter(([,v]) => v != null && v !== ''))
      ).toString();
      return request(`/events${qs ? '?' + qs : ''}`, 'GET', null, false);
    },
    get:     (id)     => request(`/events/${id}`, 'GET', null, false),
    tickets: (id)     => request(`/events/${id}/tickets`, 'GET', null, false),
  },

  bookings: {
    create: (data)    => request('/bookings', 'POST', data),
    my:     ()        => request('/bookings/my'),
    cancel: (id)      => request(`/bookings/${id}/cancel`, 'DELETE'),
  },

  admin: {
    stats:        ()        => request('/admin/stats'),
    users:        ()        => request('/admin/users'),
    allBookings:  ()        => request('/admin/bookings'),
    createEvent:  (data)    => request('/admin/events', 'POST', data),
    updateEvent:  (id, data)=> request(`/admin/events/${id}`, 'PUT', data),
    deleteEvent:  (id)      => request(`/admin/events/${id}`, 'DELETE'),
    toggleUser:   (id)      => request(`/admin/users/${id}/toggle`, 'PUT'),
  }
};
