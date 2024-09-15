import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

  //   // Hide the thank you message after 5 seconds
  //   setTimeout(() => {
  //     setIsSubmitted(false);
  //   }, 5000);
  // };
  };
  return (
    <>
      <Navbar />
      <section className="py-16 bg-gradient-to-r from-teal-100 via-white to-teal-100">
        {/* Headline */}
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">Contact With Us</h2>
          <p className="text-gray-600 mt-4 text-lg">
            We would love to hear from you. Please fill out the form below or reach us directly.
          </p>
        </div>

        {/* Conditionally show thank you message or the form and contact details */}
        {isSubmitted ? (
          <div className="container mx-auto flex items-center justify-center px-4">
            <motion.div
              className="w-full lg:w-1/2 bg-green-100 p-8 rounded-xl shadow-2xl border border-green-400 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
            >
              <strong className="text-2xl font-bold text-green-700">Thank you!</strong>
              <p className="mt-4 text-green-700">
                We appreciate you contacting us. We'll be in touch soon!
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="container mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between px-4 lg:px-12">
            {/* Contact Form Section */}
            <motion.div
              className="w-full lg:w-2/3 bg-white p-8 rounded-xl shadow-2xl border border-gray-200"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-6 text-center">Get in Touch</h3>
              <p className="text-gray-600 mb-8 text-center">
                Have any questions? Fill out the form and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Phone Number Input */}
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Message Input */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm h-32 focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Write your message"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 duration-300 ease-in-out focus:ring-4 focus:ring-teal-300 focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Address Section */}
            <motion.div
              className="w-full lg:w-1/3 p-8 bg-teal-600 text-white rounded-xl shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            >
              <h3 className="text-3xl font-bold mb-4 text-white text-center">Contact Information</h3>
              <p className="mb-6 text-center text-lg">
                If you'd prefer to reach us directly, here are our contact details:
              </p>

              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold">Address</h4>
                  <p className="text-white">
                    123 Main Street, Suite 101<br />Your City, Country
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <p className="text-white">+1 (234) 567-890</p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p className="text-white">info@example.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Contact;
