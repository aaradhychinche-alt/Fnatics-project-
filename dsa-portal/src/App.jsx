/**
 * FILE: App.jsx
 * 
 * Purpose:
 * This is the main application component that sets up the routing structure.
 * It handles:
 * - React Router setup (BrowserRouter)
 * - Global Context Providers (MockDataProvider)
 * - Route definitions (Public vs Protected)
 * - Layout wrapping (DashboardLayout)
 * 
 * Key Features:
 * - Uses 'react-router-dom' for client-side navigation.
 * - Implements a 'ProtectedRoute' wrapper to secure dashboard routes.
 * - Provides a fallback route (*) to redirect unknown paths to the landing page.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import DSAQuestionsPage from './pages/DSAQuestionsPage';
import LeetCodePracticePage from './pages/LeetCodePracticePage';
import LoginPage from './pages/LoginPage';
import RewardsPage from './pages/RewardsPage';

// Contexts
import { MockDataProvider } from './context/MockDataContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Seeding Script (Temporary)
import { addPerformanceHistory } from './seed/addPerformanceHistory';

function App() {
  return (
    // Router wraps the entire application to enable navigation
    <Router>
      {/* MockDataProvider provides global state/mock data to children */}
      <MockDataProvider>

        {/* TEMPORARY: Button to seed performance history data */}
        <button
          onClick={addPerformanceHistory}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: 9999,
            padding: '10px 20px',
            backgroundColor: '#f00',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Upload Performance Data
        </button>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes: Only accessible if authenticated */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dsa-questions" element={<DSAQuestionsPage />} />
            <Route path="/leetcode-practice" element={<LeetCodePracticePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback Route: Redirects any unknown URL to the home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MockDataProvider>
    </Router>
  );
}

export default App;
