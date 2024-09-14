import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Leadership from './Leader';
import img from '../components/Assets/11.jpg';

// Updated color scheme for comfortable viewing
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } }, // Animation on hover
};

const AboutUs = () => {
  return (
    <>
      <Navbar />

      {/* Background Section */}
      <section className="relative py-20 flex items-center justify-center min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={img} alt="background" className="object-cover h-full w-full" />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-teal-300 mb-6">
            Who We Are
          </h1>
          <p className="text-white text-lg lg:text-xl mb-8 px-4 lg:px-24">
            Welcome to the MU CSE Society, the dynamic hub for Computer Science and Engineering students at MU. Whether you're an experienced coder or just starting out, our society offers opportunities to help you grow, learn, and connect with fellow tech enthusiasts.
          </p>
          <a
            href="/about"
            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-400 transition duration-300"
          >
            Learn More About Us
          </a>
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="mb-12 px-6 lg:px-24 py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-8"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover" // Apply hover animation
          >
            <h2 className="text-3xl font-semibold mb-4 text-teal-600">Our Mission</h2>
            <p className="leading-relaxed text-lg text-gray-700">
              Our mission is to drive innovation, deliver high-quality solutions, and foster long-term relationships with our clients. We strive to create a positive impact through technology and collaboration, helping businesses overcome challenges and unlock new opportunities.
            </p>
          </motion.div>
          <motion.div
            className="bg-white shadow-lg rounded-lg p-8"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover" // Apply hover animation
          >
            <h2 className="text-3xl font-semibold mb-4 text-teal-600">Our Values</h2>
            <p className="leading-relaxed text-lg text-gray-700">
              Integrity, collaboration, and excellence are at the core of everything we do. We believe in transparent communication, ethical business practices, and delivering results that exceed expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <Leadership />

      {/* Full Team Button */}
      <div className="text-center pt-2 pb-12">
        <a
          href="/team" // Link to your team page
          className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-400 transition duration-300"
        >
          View Full Team
        </a>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
