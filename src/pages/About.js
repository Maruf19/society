import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Leadership from './Leader';

// Animation variants for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

function About() {
  const [about, setAboutData] = useState(null);
  const [missionVision, setMissionVision] = useState(null); // New state for mission and vision
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Smooth scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchAbout = async () => {
      try {
        const response = await fetch('http://localhost:5000/about');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchMissionVision = async () => { // New function to fetch mission and vision
      try {
        const response = await fetch('http://localhost:5000/mission-vision'); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMissionVision(data);
      } catch (err) {
        setError(err.message);
      }
    };

    Promise.all([fetchAbout(), fetchMissionVision()]) // Fetch both in parallel
      .finally(() => setLoading(false)); // Set loading to false after both fetches
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="relative py-20 flex items-center justify-center min-h-screen bg-blue-400">
        <div className="relative z-10 container mx-auto px-12 py-16 text-center border border-teal-500 bg-gray-300">
          {about ? (
            about.map(({ id, title, description }) => (
              <div key={id} className="relative z-10 mb-6">
                <h1 className="text-4xl lg:text-5xl text-teal-500 font-extrabold">
                  {title}
                </h1>
                <p className="text-black text-lg lg:text-xl mb-8 px-4 lg:px-24">
                  {description}
                </p>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
          <a
            href='/team'
            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-400 transition duration-300"
          >
            Existing Committee
          </a>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="mb-4 px-6 lg:px-24 pt-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {missionVision ? (
            missionVision.map(({ id, title, description }) => ( // Ensure correct destructuring
              <motion.div
                key={id}
                className="bg-white shadow-lg rounded-lg px-8 py-4 border border-teal-500"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 border-b-2 border-teal-500 pb-2 inline-block">{title}</h2>
                <p className="leading-relaxed text-base text-gray-700">
                  {description}
                </p>
              </motion.div>
            ))
          ) : (
            <div>No mission and vision data available.</div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <Leadership />

      <Footer />
    </>
  );
}

export default About;
