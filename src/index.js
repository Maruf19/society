import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Firbase/authFunctions'; // Ensure this path is correct

// Create a root for your app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app within the AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
