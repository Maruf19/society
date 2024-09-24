import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Programme() {
  const [programmeData, setProgrammeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Smooth scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch Programme data from the backend API
    const fetchProgrammeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/programme'); // Fetching data from API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parsing JSON data from the response
        setProgrammeData(data); // Set the fetched data in state
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchProgrammeData(); // Invoke the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) return <p>Loading...</p>; // Display loading text while fetching data
  if (error) return <p>Error: {error}</p>; // Display error if fetch fails

  return (
    <>
      <Navbar />
      <section className="container mx-auto py-6 px-4 md:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 border-b-2 border-teal-500 pb-2 inline-block">
          Our Recent Programme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full">
          {programmeData.map(({ id, title, imageUrl, description }) => (
            <motion.div
              key={id}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto flex flex-col border border-teal-500"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  className="w-full h-48 md:h-56 lg:h-64 object-cover border border-teal-500"
                  src={imageUrl} // Use the correct image URL
                  alt={title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-1">
                <h2 className="text-lg md:text-xl font-bold text-teal-600 mb-4">{title}</h2>
                <p className="text-gray-600 mb-6 flex-1 text-sm md:text-base">{description}</p>
                <div className="flex flex-col sm:flex-row sm:space-x-4 mt-auto">
                  <motion.button
                    className="px-4 py-2 mb-2 sm:mb-0 border border-teal-500 text-teal-500 rounded-full bg-transparent hover:bg-teal-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                  <Link to="/review">
                    <motion.button
                      className="px-4 py-2 border border-teal-500 text-teal-500 rounded-full bg-transparent hover:bg-teal-500 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Review
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Programme;
