// authFunctions.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from "../Firbase/firebase.config"; // Ensure the correct path to firebase.config.js

// Register a new user with email and password
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object on successful registration
  } catch (error) {
    console.error("Registration error:", error.message);
    throw new Error(error.message); // Pass error message for further handling
  }
};

// Login an existing user with email and password
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object on successful login
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message); // Pass error message for further handling
  }
};

// Function to log out a user using Firebase Authentication
export const logoutUser = async () => {
  try {
    await signOut(auth); // Use the 'auth' instance directly for signOut
  } catch (error) {
    console.error("Logout error:", error.message);
    throw new Error(error.message); // Pass error message for further handling
  }
};

// Reset password for the user associated with the given email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email); // Send password reset email
  } catch (error) {
    console.error("Password reset error:", error.message);
    throw new Error(error.message); // Pass error message for further handling
  }
};

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide auth context to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state whenever authentication state changes
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
