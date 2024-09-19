import React, { useState } from 'react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md border border-teal-500">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">Login</h2>
        <form className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email ID" 
              className="w-full px-4 py-2 text-black placeholder-gray-500 bg-transparent border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Email ID"
            />
          </div>

          {/* Password Input with Improved Eye Icon */}
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              className="w-full px-4 py-2 text-black placeholder-gray-500 bg-transparent border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Password"
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-black text-sm">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-indigo-400" 
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-black text-sm">
            Don't have an account? <a href="#" className="underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
