// src/components/ResetPassword.js

import React, { useState } from "react";

const ResetPassword = ({ onClose }) => {
  const [resetEmail, setResetEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Implement reset password functionality here
    // After sending reset link, you can set a success message or close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-teal-500">
        <h3 className="text-lg font-semibold mb-4">Forgot Password</h3>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
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
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default ResetPassword;
