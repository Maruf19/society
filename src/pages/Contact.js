import React from 'react';
import { motion } from 'framer-motion';

// Sample background image (replace with your image)
import img from '../components/Assets/mu.jpeg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact= () => {
  return (
    <>
    <Navbar/>
    <section className="relative py-16 bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${img})` }}></div>

      <div className="relative container mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between px-4 lg:px-12">
        {/* Contact Form Section */}
        <motion.div
          className="flex-2 bg-white shadow-xl rounded-lg p-8 w-full lg:w-2/3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        >
          <h2 className="text-3xl font-bold text-teal-600 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have any questions? Fill out the form and we'll get back to you shortly.
          </p>

          {/* Form */}
          <form>
            {/* Name Input */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                placeholder="Write your message"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-3 rounded-full hover:bg-teal-600 transition duration-300 ease-in-out focus:ring-4 focus:ring-teal-400 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Address Section */}
        <motion.div
          className="flex-2 text-white p-8 rounded-lg w-full lg:w-1/3 bg-teal-600 shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        >
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          <p className="mb-6">
            If you'd prefer to reach us directly, here are our contact details:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p>123 Main Street, Suite 101<br />Your City, Country</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p>+1 (234) 567-890</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p>info@example.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    <Footer/>
   </>
  

  );
};

export default Contact;
