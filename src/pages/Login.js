import React, { useState } from 'react';
import { auth } from '../Firbase/firebase.config'; // Ensure this path is correct
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; // Import back icon from react-icons
import img from '../components/Assets/33.avif';

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if the email is verified
    if (!user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }

    console.log("User logged in:", user);
    return user; // Return user info if needed
  } catch (error) {
    throw new Error(error.message); // Rethrow the error for handling in the component
  }
};

const Login = ({ onLogin = () => {} }) => { // Default prop value
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize the navigate function

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleCloseModal = () => {
    setShowForgotPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Start loading

    try {
      await loginUser(email, password); // Use the loginUser function
      console.log("Login successful!");
      onLogin(); // Call the onLogin prop to update authentication state
      navigate('/home'); // Navigate to the home page
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.message || "Login failed!"); // Set the error message to display
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      console.log('Password reset link sent to:', resetEmail);
      handleCloseModal(); // Close the modal after sending the link
    } catch (err) {
      console.error('Error sending password reset email:', err);
      setError(err.message || "Failed to send reset email."); // Set the error message to display
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center ">
          <img src={img} alt='background img' className='h-full w-full object-cover' />
        </div>
      {/* Warning Message Container */}
      <div className="absolute top-4 w-full flex justify-center animate-fade-in">
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white text-center p-4 rounded-lg shadow-lg max-w-3xl">
          <p className="font-semibold">
          This website features sections exclusively crafted for members of the Computer Science and Engineering (CSE) Society, a departmental club. If you are not part of the CSE Society, you will not have access to certain pages (such as the Programme Schedule) that are intended specifically for CSE students to provide important resources and updates.
          </p>
        </div>
      </div>

      {/* Back Icon */}
      <div className="absolute top-4 left-4">
        <MdArrowBack 
          className="cursor-pointer text-2xl text-white hover:text-indigo-600"
          onClick={() => navigate('/home')} 
        />
      </div>

      {!showForgotPassword ? (
        <div className="bg-white mt-20 bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md border border-teal-500">
          <h2 className="text-3xl font-semibold text-center text-black mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email ID" 
                className="w-full px-4 py-2 text-black placeholder-gray-500 bg-transparent border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                className="w-full px-4 py-2 text-black placeholder-gray-500 bg-transparent border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer transition-transform transform hover:scale-110"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.95 12c0-2.214-1.79-4-4-4s-4 1.786-4 4c0 2.214 1.79 4 4 4s4-1.786 4-4zm4.403-1.577C18.95 5.114 14.738 3 12 3c-2.737 0-6.95 2.114-8.354 7.423a9.982 9.982 0 000 3.154C5.05 18.886 9.262 21 12 21c2.737 0 6.95-2.114 8.354-7.423a9.982 9.982 0 000-3.154z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5c5.25 0 9.5 4.75 9.5 7.5S17.25 19.5 12 19.5 2.5 14.75 2.5 12 6.75 4.5 12 4.5zM12 9a3 3 0 110 6 3 3 0 010-6zM4.72 4.72a.75.75 0 011.06-1.06l13.5 13.5a.75.75 0 11-1.06 1.06l-13.5-13.5z" />
                  </svg>
                )}
              </span>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-black text-sm">
              <label className="flex items-center">
                {/* <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-indigo-400" 
                /> */}
                {/* <span className="ml-2">Remember me</span> */}
              </label>
              <a href="#" className="hover:underline" onClick={handleForgotPassword}>Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loading} 
              className={`w-full ${loading ? 'bg-gray-500' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Register Link */}
            <p className="text-center text-black text-sm">
              Don't have an account? <a href="/SignUp" className="underline">SignUp</a>
            </p>
          </form>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-teal-500">
            <h3 className="text-lg font-semibold mb-4">Forgot Password</h3>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="reset-email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className={`w-full ${loading ? 'bg-gray-500' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="mt-2 text-indigo-600 hover:underline"
              >
                Cancel
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
