import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AuthStore } from '../data/events';

export default function Register() {
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Delhi');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('Please fill out all required fields', 'warning');
      return;
    }

    const res = AuthStore.register({ name, email, password, city });
    if (!res.success) {
      showToast(res.error, 'error');
      return;
    }

    loginUser(res.user);
    showToast(`Account created! Welcome to EventEase, ${name}! 🎉`, 'success');
    navigate('/');
  };

  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '4rem', maxWidth: '480px' }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="brand-icon-box" style={{ width: 48, height: 48, fontSize: '1.4rem', margin: '0 auto 1rem auto' }}>
            <i className="fas fa-ticket-alt"></i>
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Join thousands of event lovers across India
          </p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div className="filter-group">
            <label className="filter-label">Full Name</label>
            <input
              type="text"
              className="filter-input"
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Email Address</label>
            <input
              type="email"
              className="filter-input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Password</label>
            <input
              type="password"
              className="filter-input"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Your City</label>
            <select
              className="filter-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}>
            Create Free Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
