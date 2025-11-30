/**
 * FILE: LoginPage.jsx
 * 
 * Purpose:
 * Handles user authentication (Login and Signup).
 * Enforces domain restrictions to ensure only authorized students can access.
 * 
 * Key Features:
 * - Email/Password authentication via Firebase.
 * - Domain validation regex (vedam.org, etc.).
 * - Automatic account creation if user doesn't exist (Auto-Signup).
 * - Creates/Syncs Firestore user document upon successful login.
 * - 'ShaderBackground' for visual appeal.
 */

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { login, signUp } from '../firebase-utils';
import { createUserDocument } from '../utils/createUserDocument';
import { auth } from '../firebase-config';
import ShaderBackground from '../components/ui/shader-background';

const LoginPage = () => {
  const navigate = useNavigate();

  // Local state for form inputs and UI status
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Memoized validation logic to check email domain in real-time
  const isEmailValid = useMemo(() => {
    return /^[^@\s]+@(vedam\.org|vedamschool\.tech|vedamsot\.org)$/i.test(email.trim());
  }, [email]);

  // Disable submit if invalid
  const canSubmit = isEmailValid && password.trim().length > 0 && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      setError('Only Vedam students can register.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      // Attempt login
      await login(email, password);
      // Ensure Firestore document exists
      await createUserDocument(auth.currentUser);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err);

      // Auto-Signup Logic:
      // If user not found, try to create a new account with the same credentials
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          // Attempt to create a new account
          await signUp(email, password);
          await createUserDocument(auth.currentUser);
          navigate('/dashboard');
        } catch (signupErr) {
          console.error("Signup error:", signupErr);
          if (signupErr.code === 'auth/email-already-in-use') {
            setError('Incorrect password. Please try again.');
          } else {
            setError('Failed to create account. ' + signupErr.message);
          }
        }
      } else {
        setError('Failed to login. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background landing-bg text-foreground px-6">
      <ShaderBackground />
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="example@vedam.org"
              className={`w-full h-11 rounded-md bg-background/60 border px-3 outline-none focus:ring-2 focus:ring-primary/40 ${email && !isEmailValid ? 'border-red-500/50' : 'border-white/10'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                {error}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full h-11 rounded-md bg-background/60 border border-white/10 px-3 outline-none focus:ring-2 focus:ring-primary/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 select-none">
              <input type="checkbox" className="accent-indigo-500/80" />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-indigo-300 hover:text-indigo-200">Forgot password?</button>
          </div>

          <Button type="submit" variant="neon" className="w-full h-11" disabled={!canSubmit}>
            {isLoading ? 'Signing in...' : (canSubmit ? 'Sign In' : 'Enter valid email to continue')}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-indigo-300 hover:text-indigo-200">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
