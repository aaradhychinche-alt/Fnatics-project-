/**
 * FILE: ProtectedRoute.jsx
 * 
 * Purpose:
 * A wrapper component that restricts access to authenticated users only.
 * 
 * Logic:
 * - Checks the current authentication state using 'listenAuthState'.
 * - If loading, displays a loading spinner.
 * - If not authenticated, redirects to the login page.
 * - If authenticated, renders the child components (the protected page).
 */

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { listenAuthState } from '../firebase-utils';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = listenAuthState((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        // Loading state UI
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Redirect to login if no user is found
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render children if authenticated
    return children;
};

export default ProtectedRoute;
