import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import img from '../components/Assets/22.jpg';
import img1 from '../components/Assets/11.jpg';
import img2 from '../components/Assets/mu.jpeg';

// Sample data for President, VP, and GS
const leaders = [
  {
    id: 1,
    name: 'John Doe',
    position: 'President',
    image: img, // Replace with actual image path
    description: 'John leads the society with a passion for innovation and teamwork.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Vice President',
    image: img1, // Replace with actual image path
    description: 'Jane drives collaboration and ensures seamless operations.',
  },
  {
    id: 3,
    name: 'Robert Brown',
    position: 'General Secretary',
    image: img2, // Replace with actual image path
    description: 'Robert oversees administrative tasks and community outreach.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Leadership = () => {
  return (
    <div className="container mx-auto p-4 lg:p-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 border-b-2 border-teal-500 pb-2 inline-block">Current Leadership</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader) => (
          <motion.div
            key={leader.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105  border border-teal-500"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              className="w-full h-48 object-cover" // Set a fixed height for images
              src={leader.image}
              alt={leader.name}
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{leader.name}</h2>
              <p className="text-md text-teal-500 font-semibold mb-4">{leader.position}</p>
              {/* <p className="text-gray-600 mb-6">{leader.description}</p> */}
              
              {/* Button */}
              <div className="text-center pt-2 pb-2">
                <a
                  href="/team" // Link to your team page
                  className="bg-teal-500 text-white font-bold py-2 px-6 text-sm rounded-lg hover:bg-teal-400 transition duration-300"
                >
                  View Full Team
                </a>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
