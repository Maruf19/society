import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../Firbase/firebase.config'; // Ensure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { loginUser, registerUser, resetPassword } from './authFunctions'; // Ensure the correct path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state whenever authentication state changes
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const logoutUser = async () => {
    try {
      await signOut(auth); // Use Firebase signOut
      setUser(null); // Set user to null upon successful logout
    } catch (error) {
      console.error("Logout error:", error); // Handle logout error
      throw error; // Rethrow for handling in the component
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
