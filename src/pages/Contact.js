import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const colors = {
  primaryBlue: '#407df4',
  white: '#fefefe',
  gold: '#eab123',
  teal: '#40a8c4',
  darkTeal: '#357f8e'
};

const Contact = () => {
  useEffect(() => {
    // Smooth scroll to the top of the page when the component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []); // Empty dependency array ensures this runs once on mount

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Navbar />
      <motion.section
        className="py-12 lg:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `linear-gradient(to right, ${colors.teal} 0%, ${colors.white} 50%, ${colors.teal} 100%)`
        }}
      >
        {/* Conditionally render the headline */}
        {!isSubmitted && (
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-teal-500 pb-2 inline-block">
              Contact
            </h1>
          </div>
        )}

        {/* Conditionally show thank you message or form */}
        {isSubmitted ? (
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              className="p-6 lg:p-8 rounded-lg shadow-lg"
              style={{
                backgroundColor: colors.white, // White card background
                borderColor: colors.primaryBlue, // Add border
                borderWidth: '2px',
                color: 'black', // Black text
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.strong
                className="text-2xl lg:text-3xl font-bold"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Thank You!
              </motion.strong>
              <motion.p
                className="mt-4 text-base lg:text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                We appreciate your message. We'll get back to you shortly.
              </motion.p>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between px-4 lg:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Contact Form */}
            <motion.div
              className="w-full lg:w-2/3 bg-white p-6 lg:p-8 rounded-lg shadow-lg"
              style={{ borderColor: colors.primaryBlue, borderWidth: 2 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-black">Get in Touch</h3>
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4 lg:mb-6">
                  <label htmlFor="name" className="block text-base lg:text-lg font-medium text-black">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4 lg:mb-6">
                  <label htmlFor="email" className="block text-base lg:text-lg font-medium text-black">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Mobile Number Input */}
                <div className="mb-4 lg:mb-6">
                  <label htmlFor="mobile" className="block text-base lg:text-lg font-medium text-black">
                    Your Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>

                {/* Message Input */}
                <div className="mb-4 lg:mb-6">
                  <label htmlFor="message" className="block text-base lg:text-lg font-medium text-black">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm h-32 focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Write your message"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-2 lg:py-3 rounded-lg"
                  style={{ backgroundColor: colors.primaryBlue, color: colors.white }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="w-full lg:w-1/3 bg-primaryBlue p-6 lg:p-8 rounded-lg shadow-lg"
              style={{ backgroundColor: colors.primaryBlue }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-white text-center">Contact Information</h3>
              <p className="text-base lg:text-lg mb-6 text-white text-center">
                Feel free to contact us via phone or email.
              </p>

              <div className="space-y-4 lg:space-y-6 text-white">
                <div className="text-center">
                  <h4 className="text-lg font-semibold">Address</h4>
                  <p>123 Main Street, Suite 101<br />Your City, Country</p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <p>+1 (234) 567-890</p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p>info@example.com</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.section>
      <Footer />
    </>
  );
};

export default Contact;
