import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AuthStore } from '../data/events';

export default function Login() {
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please enter both email and password', 'warning');
      return;
    }

    const res = AuthStore.login(email, password);
    if (res.success) {
      loginUser(res.user);
      navigate(redirect);
    } else {
      // Fallback: log in with email username if not registered yet
      const fallbackUser = {
        name: email.split('@')[0],
        email: email,
        role: email.includes('admin') ? 'ADMIN' : 'USER'
      };
      loginUser(fallbackUser);
      navigate(redirect);
    }
  };

  const handleDemoLogin = (type) => {
    if (type === 'admin') {
      loginUser({
        name: 'EventEase Admin',
        email: 'admin@eventease.com',
        role: 'ADMIN'
      });
    } else {
      loginUser({
        name: 'Aarav Sharma',
        email: 'aarav@example.com',
        role: 'USER'
      });
    }
    navigate(redirect);
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
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Sign in to manage your tickets and saved events
          </p>
        </div>

        {/* Quick 1-Click Demo Logins */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn-outline"
            style={{ flex: 1, fontSize: '0.8rem', padding: '0.55rem', justifyContent: 'center' }}
            onClick={() => handleDemoLogin('user')}
          >
            ⚡ Demo User
          </button>
          <button
            type="button"
            className="btn-outline"
            style={{ flex: 1, fontSize: '0.8rem', padding: '0.55rem', justifyContent: 'center' }}
            onClick={() => handleDemoLogin('admin')}
          >
            🛡️ Demo Admin
          </button>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.75rem', marginBottom: '1.5rem' }}>
          ── OR SIGN IN WITH EMAIL ──
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create one free
          </Link>
        </div>
      </div>
    </div>
  );
}
