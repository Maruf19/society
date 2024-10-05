import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchScheduleData = async () => {
      try {
        const response = await fetch('http://localhost:5000/schedule');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScheduleData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <section className="container mx-auto mb-10 px-4 mt-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 border-b-2 border-blue-500 pb-2 inline-block">
          Upcoming Activities
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
          {scheduleData.map((schedule) => (
            <motion.div
              key={schedule._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto transition-transform transform hover:scale-105 border border-blue-500 flex flex-col h-full"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  className="w-full h-52 object-cover border border-blue-500"
                  src={schedule.imageUrl}
                  alt={schedule.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-blue-500 mb-2">{schedule.title}</h2>
                <p className="text-gray-800 font-bold mb-2 text-right">Reg. Fee: {schedule.fee}</p>
                <p className="text-gray-600 mb-6">{schedule.description}</p>
                <div className="mt-auto flex justify-center">
                  <Link 
                    to="/payment" 
                    state={{ schedule }} // Pass the selected schedule to the PaymentMethod component
                  >
                    <motion.button
                      className="px-4 py-2 border border-blue-500 text-black rounded-full bg-transparent hover:bg-blue-500 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Register Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Schedule;
