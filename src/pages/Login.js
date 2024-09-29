import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthProvider";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/home";

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      setAlertMessage("Successfully logged in!");
      navigate(from, { replace: true });
      window.location.reload(); // Refresh the home page after login
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleCloseModal = () => {
    setShowForgotPassword(false);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const email = event.target.resetEmail.value;
    // Implement reset password logic here
    setShowForgotPassword(false);
    alert("Reset link sent to " + email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Alert Message */}
      {alertMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg">
          {alertMessage}
        </div>
      )}

      {!showForgotPassword ? (
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md border border-teal-500">
          <h2 className="text-3xl font-semibold text-center text-black mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            {/* Email Input */}
            <div className="relative">
              <input 
                type="email" 
                {...register("email", { required: true })}
                placeholder="Email ID" 
                className="w-full px-4 py-2 text-black placeholder-gray-500 bg-transparent border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required 
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                {...register("password", { required: true })}
                placeholder="Password" 
                className="w-full px-4 py-2 text-black placeholder-gray-500 bg-transparent border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-black text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-400" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="hover:underline" onClick={handleForgotPassword}>Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button type="submit" className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Register Link */}
            <p className="text-center text-black text-sm">
              Don't have an account? <Link to="/SignUp" className="underline">Sign Up</Link>
            </p>
          </form>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center" onClick={handleCloseModal}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-teal-500" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Forgot Password</h3>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="reset-email" 
                  name="reset-email"
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
      )}
    </div>
  );
};

export default Login;
