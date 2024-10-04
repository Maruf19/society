import { useState, useEffect, createContext, useContext } from 'react';
import { auth, firestore } from '../Firbase/firebase.config'; // Ensure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { loginUser, registerUser, resetPassword } from './authFunctions'; // Ensure the correct path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Add userRole state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Update the user state whenever authentication state changes

        // Fetch user role from Firestore or your database if needed
        const userDoc = await fetchUserRole(currentUser.uid);
        setUserRole(userDoc?.role); // Set user role (ensure this fetches correctly)
      } else {
        setUser(null); // Set user to null if not logged in
        setUserRole(null); // Also clear user role
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const fetchUserRole = async (uid) => {
    // Implement the logic to fetch the user role from Firestore or your database
    try {
      const userDoc = await firestore.collection('users').doc(uid).get(); // Adjust the Firestore reference
      return userDoc.exists ? userDoc.data() : null; // Return user data if exists
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null; // Handle error
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth); // Use Firebase signOut
      setUser(null); // Set user to null upon successful logout
      setUserRole(null); // Clear user role upon logout
    } catch (error) {
      console.error("Logout error:", error); // Handle logout error
      throw error; // Rethrow for handling in the component
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loginUser, logoutUser, registerUser, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
