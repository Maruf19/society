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
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Smooth scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch content from the API
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/about'); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the fetched data for debugging
        setContentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="relative py-20 flex items-center justify-center min-h-screen bg-blue-400">
        <div className="relative z-10 container mx-auto px-12 py-16 text-center border border-teal-500 bg-gray-300">
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl text-teal-500 font-extrabold mb-6">
              {contentData.header ? contentData.header.title : "Loading..."}
            </h1>
            <p className="text-black text-lg lg:text-xl mb-8 px-4 lg:px-24">
              {contentData.header ? contentData.header.description : "Loading..."}
            </p>
            <a
              href='/team'
              className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-400 transition duration-300"
            >
              Existing Committee
            </a>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="mb-4 px-6 lg:px-24 pt-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {contentData.missionVision ? (
            contentData.missionVision.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg px-8 py-4 border border-teal-500"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 border-b-2 border-teal-500 pb-2 inline-block">{item.title}</h2>
                <p className="leading-relaxed text-base text-gray-700">
                  {item.description}
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
};

export default About;
