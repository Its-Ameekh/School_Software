// src/components/auth/ChangePasswordOverlay.js
'use client';

import { useState } from 'react';
import { apiClient } from '../../shared/api/client';

const PASSWORD_POLICY = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export function ChangePasswordOverlay({ onComplete }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!PASSWORD_POLICY.test(newPassword)) {
      setError(
        'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.'
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      // Single call — backend verifies the flag is set, validates the
      // policy again server-side, and uses the Admin API to change the
      // password AND clear must_change_password atomically. Frontend
      // never touches Supabase admin operations.
      await apiClient.post('/auth/change-temporary-password', {
        newPassword,
      });

      onComplete();
    } catch (err) {
      setError(err?.friendlyMessage || err?.message || 'Could not update password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-heading"
    >
      <div className="overlay-panel">
        <h2 id="change-password-heading">Set a new password</h2>
        <p>Your account has a temporary password. Choose a new one to continue.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="new-password">New password</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <p className="field-hint">
              8+ characters, with an uppercase letter, a lowercase letter, and a number.
            </p>
          </div>

          <div className="field">
            <label htmlFor="confirm-password">Confirm new password</label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-500" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}