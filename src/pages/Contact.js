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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: '',
    name: ''
  });

  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/contact-info');
        if (!response.ok) throw new Error('Failed to fetch contact info');
        const data = await response.json();
        setContactInfo(data[0] || {});
      } catch (error) {
        console.error('Error fetching contact info:', error);
        setContactInfo({ address: 'Error loading address', phone: 'Error loading phone', email: 'Error loading email' });
      }
    };

    fetchContactInfo();
  }, []);

  const handleContact = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      console.log(data);
      setIsSubmitted(true);
      setFormData({ email: '', phone: '', message: '', name: '' });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <motion.section
        className="py-12 lg:py-16 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `linear-gradient(to right, ${colors.teal} 0%, ${colors.white} 80%, ${colors.teal} 100%)`
        }}
      >
        {!isSubmitted && (
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-teal-500 pb-2 inline-block">
              Contact Us <br />
              <span className='text-sm'>Feel Free to Reach Out!</span>
            </h1>
          </div>
        )}

        {isSubmitted ? (
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              className="p-6 lg:p-8 rounded-lg shadow-xl"
              style={{
                backgroundColor: colors.white,
                borderColor: colors.primaryBlue,
                borderWidth: '2px',
                color: 'black',
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
                    name="name"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={handleContact}
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
                    name="email"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your email address"
                    required
                    value={formData.email}
                    onChange={handleContact}
                  />
                </div>

                {/* Mobile Number Input */}
                <div className="mb-4 lg:mb-6">
                  <label htmlFor="phone" className="block text-base lg:text-lg font-medium text-black">
                    Your Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Enter your mobile number"
                    required
                    value={formData.phone}
                    onChange={handleContact}
                  />
                </div>

                {/* Message Input */}
                <div className="mb-4 lg:mb-6">
                  <label htmlFor="message" className="block text-base lg:text-lg font-medium text-black">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg shadow-sm h-32 focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Write your message"
                    required
                    value={formData.message}
                    onChange={handleContact}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-2 lg:py-3 rounded-lg text-white transition duration-300 ease-in-out"
                  style={{ backgroundColor: colors.primaryBlue }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="w-full lg:w-1/3 bg-[#407df4] p-6 lg:p-8 rounded-lg shadow-lg"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center">
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-white">Contact Info</h3>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white">Address</h4>
                  <p style={{ wordWrap: 'break-word', color: 'white' }}>
                    {contactInfo.address || 'Loading...'}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white">Phone</h4>
                  <p style={{ wordWrap: 'break-word', color: 'white' }}>
                    {contactInfo.phone || 'Loading...'}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white">Email</h4>
                  <p style={{ wordWrap: 'break-word', color: 'white' }}>
                    {contactInfo.email || 'Loading...'}
                  </p>
                </div>

                {/* Map Section */}
                <div className="mt-4">
                  <iframe
                    title="Google Map"
                    className="rounded-lg shadow-lg w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4302.620190763403!2d91.97005454948531!3d24.93009757974487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750552bc71c899d%3A0x804e438bcc32b390!2sSylhet%20Metropolitan%20University!5e0!3m2!1sen!2sau!4v1727275668882!5m2!1sen!2sau"
                    width="300"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
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
