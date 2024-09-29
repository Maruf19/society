import React, { createContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from "firebase/auth";
import { app } from '../../Firebase/firebase.config';

export const AuthContext = createContext(null);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to create a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in with Google
  const googleSignIn = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Function to log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Function to update user profile information
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  // Function to send email verification
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Please check your email & verify.");
      });
  };

  // Function to handle forgotten password
  const handleForgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Provide all auth-related functions and states
  const authInfo = {
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUser,
    verifyEmail,
    handleForgetPassword,
    user,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
