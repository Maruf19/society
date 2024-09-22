import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Leadership = () => {
  const [leaderData, setLeaderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch('http://localhost:5000/leader');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaderData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        // setLeaderData(fallbackLeader);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 lg:p-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 border-b-2 border-teal-500 pb-2 inline-block">Current Leadership</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaderData.map(({ id, name, position, image }) => (
          <motion.div
            key={id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border border-teal-500"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              className="w-full h-48 object-cover"
              src={image}
              alt={name}
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{name}</h2>
              <p className="text-md text-teal-500 font-semibold mb-4">{position}</p>
              
              <div className="text-center pt-2 pb-2">
                <a
                  href="/team"
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
