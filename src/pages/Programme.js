import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UpcomingPrograme from './UpcomingPrograme';

// Sample data for the programs
const programs = [
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

function Programme() {
  return (
    <>
      <Navbar />
      <section className="container mx-auto py-12 px-4 mt-24 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 border-b-2 border-teal-500 pb-2 inline-block">
          Our Recent Programs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
          {programs.map((program) => (
            <motion.div
              key={program.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto transition-transform transform hover:scale-105"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  className="w-full h-40 object-cover"
                  src={program.image}
                  alt={program.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-teal-600 mb-4">{program.title}</h2>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <motion.button
                  className="px-4 py-2 border border-teal-500 text-teal-500 rounded-full bg-transparent hover:bg-teal-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <UpcomingPrograme />
      <Footer />
    </>
  );
}

export default Programme;
