import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth, logoutUser } from '../Firbase/authFunctions'; // Import useAuth from Firebase Auth Context
import img from '../components/Assets//logo.jpg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSideScreenOpen, setIsSideScreenOpen] = useState(false);
  const { user, logout } = useAuth(); // Access user and logout function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSideScreen = () => {
    setIsSideScreenOpen(!isSideScreenOpen);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      try {
        await logoutUser(); // Call the logout function
        navigate('/home'); // Redirect to home page after logout
      } catch (error) {
        console.error("Logout failed:", error); // Handle error
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 py-1 px-4 z-50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
  <img
    src={img}
    alt="MU CSE Society Logo"
    className="h-6 w-6 mr-2"
    width="45"
    height="45"
  />
  <span className="font-semibold text-xl tracking-tight">MU CSE Society</span>
</div>

            {/* <span className="font-semibold text-xl tracking-tight">MU CSE Society</span> */}
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-2 py-1 border rounded text-white border-white hover:bg-blue-500 hover:border-blue-500 transition duration-300 ease-in-out"
            >
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center w-full">
              <Link to="/home" className="block mt-2 lg:mt-0 text-white hover:bg-blue-500 px-2 py-1 rounded transition duration-300 ease-in-out mx-1">
                Home
              </Link>
              <Link to="/about" className="block mt-2 lg:mt-0 text-white hover:bg-blue-500 px-2 py-1 rounded transition duration-300 ease-in-out mx-1">
                About us
              </Link>
              <Link to="/schedule" className="block mt-2 lg:mt-0 text-white hover:bg-blue-500 px-2 py-1 rounded transition duration-300 ease-in-out mx-1">
                Schedule
              </Link>
              <Link to="/Achievement" className="block mt-2 lg:mt-0 text-white hover:bg-blue-500 px-2 py-1 rounded transition duration-300 ease-in-out mx-1">
                Feature
              </Link>
              <Link to="/activities" className="block mt-2 lg:mt-0 text-white hover:bg-blue-500 px-2 py-1 rounded transition duration-300 ease-in-out mx-1">
                NewsLetter
              </Link>
              <Link to="/contact" className="block mt-2 lg:mt-0 text-white hover:bg-blue-500 px-2 py-1 rounded transition duration-300 ease-in-out mx-1">
                Contact us
              </Link>
            </div>
            <div className="flex justify-center lg:justify-end mt-2 lg:mt-0 space-x-3">
              {!user ? (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center text-sm px-4 py-1 leading-none border rounded-lg text-white bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout} // Handling logout with confirmation
                  className="inline-flex items-center justify-center text-sm px-4 py-1 leading-none border rounded-lg text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              )}
              <button
                onClick={toggleSideScreen}
                className="inline-flex items-center justify-center text-xs px-4 py-1 leading-none border rounded-lg text-white bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Dev Speech
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Screen */}
      <div className={`fixed top-0 right-0 w-80 bg-gray-800 text-white h-full shadow-lg transition-transform duration-300 ${isSideScreenOpen ? 'transform translate-x-0' : 'transform translate-x-full'} z-50`}>
        <button
          onClick={toggleSideScreen}
          className="absolute top-4 left-4 text-white text-xl">
          &times;
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Developer Speech</h2>
          <p>
            Welcome to the Developer Speech section! Here, you'll find content and discussions related to development, technology, and innovation. Stay tuned for insightful talks and updates.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">About the Speaker</h3>
          <p>
            This section provides information about the speaker, including their background and contributions to the tech community.
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
