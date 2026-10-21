import React from 'react';
import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-bell'
  };

  return (
    <div id="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast-msg ${t.type || 'info'}`}>
          <i className={`fas ${icons[t.type] || 'fa-info-circle'}`}></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
