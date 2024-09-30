// Logout.js
import React from "react";
import { useHistory } from "react-router-dom"; // Import useHistory for redirection
import { logoutUser } from "../Firbase/authFunctions";

const Logout = () => {
  const history = useHistory(); // Initialize history for navigation

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      try {
        await logoutUser();
        // Redirect to the login page or home page after logout
        history.push("/login"); // Adjust the path as necessary
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
