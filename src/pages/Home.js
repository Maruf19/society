import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import img from '../components/Assets/33.avif';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Programme from './Programme';
import TestimonialSlider from './Testimonial';

function Home() {
  const [home, setHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Smooth scroll to the top of the page when the component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Fetch data
    const fetchHome = async () => {
      try {
        const response = await fetch('http://localhost:5000/home'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHome(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-r from-blue-500 to-teal-500 py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30">
          <img src={img} alt='background img' className='h-full w-full object-cover' />
        </div>
        {/* Content */}
        <div className="relative container mx-auto px-6 sm:px-12 md:px-24 text-center mt-16">
          {home.map(({ id, title, description }) => (
            <div key={id}>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 leading-tight"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed text-gray-200 shadow-md p-4 rounded-lg bg-gray-800 bg-opacity-70"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {description}
              </motion.p>
            </div>
          ))}

          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a
              href="/about"
              className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-400 transition duration-300"
            >
              About Us
            </a>
          </motion.div>
        </div>
      </section>
      <Programme />
      <TestimonialSlider />
      <Footer />
    </>
  );
}

export default Home;
