import React, { useState } from "react";
import { registerUser } from "../Firbase/authFunctions";
import PasswordReset from '../pages/PasswordReset';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      // Redirect or perform actions after registration
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!showForgotPassword ? (
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md border border-teal-500">
          <h2 className="text-3xl font-semibold text-center text-black mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
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

            {/* Password Input with Eye Icon */}
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
                {/* <span className="ml-2">Remember me</span> */}
              </label>
              <button 
                type="button" 
                className="hover:underline text-blue-600"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            {/* Register Button */}
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              Login
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-black text-sm">
              Don't have an account? <a href="/SignUp" className="underline">SignUp</a>
            </p>
          </form>
        </div>
      ) : (
        <PasswordReset />
      )}
    </div>
  );
};

export default Login;
