/**
 * FILE: main.jsx
 * 
 * Purpose:
 * This is the entry point of the React application.
 * It mounts the root 'App' component into the DOM.
 * 
 * Key Features:
 * - Imports global styles (index.css).
 * - Wraps the app in React.StrictMode for development checks.
 * - Initializes the root element.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Create the root of the React application and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
