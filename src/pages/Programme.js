import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

// Sample data for the ProgrammeData
const ProgrammeData = [
  {
    id: 1,
    title: 'Artificial Intelligence Workshop',
    description: 'Dive into the world of AI with hands-on workshops on machine learning, neural networks, and more.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    description: 'Learn full-stack web development, from frontend design to backend APIs using modern technologies.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Cybersecurity Seminar',
    description: 'Understand the fundamentals of cybersecurity and learn how to protect systems and networks from threats.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Hackathon',
    description: 'Participate in our 48-hour hackathon and showcase your coding skills by solving real-world challenges.',
    image: 'https://via.placeholder.com/150',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Programme = () => {
  const [programmeData, setProgrammeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramme = async () => {
      try {
        const response = await fetch('http://localhost:5000/programme');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProgrammeData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        // setLeaderData(fallbackLeader);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramme();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <Navbar />
      <section className="container mx-auto py-6 px-4 md:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 border-b-2 border-teal-500 pb-2 inline-block">
          Our Recent Programme
        
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full">
          {programmeData.map(({ id, title, image , description }) => (
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
                  src={image}
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
                  <motion.button
                    className="px-4 py-2 border border-teal-500 text-teal-500 rounded-full bg-transparent hover:bg-teal-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Review
                  </motion.button>
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
