import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Achievement = () => {
  const [achievementData, setAchievementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Smooth scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

 // Fetch the achievement data from the server
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5000/achievement');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log('Fetched data:', result); // Debugging line
    setAchievementData(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

fetchData();
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

  // Sort achievements by date, latest first
  const sortedAchievements = [...achievementData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Navbar />
      <section className="container mx-auto mb-10 px-4 mt-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 border-b-2 border-blue-500 pb-2 inline-block">
          Student's Achievement
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {sortedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl relative border border-blue-500"
            >
              <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg mb-4 mt-3 border border-blue-500">
                <img
                  src={achievement.imageUrl}
                  alt={`Achievement ${achievement.id}`}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>
              <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs md:text-sm font-bold rounded-br-lg px-2 py-1 md:px-3 md:py-2">
                {achievement.type}
              </div>

              <div className="flex flex-col items-center justify-center  ">
                {achievement.position && (
                  <p className="text-sm sm:text-base md:text-sm mb-1 md:mb-2 border font-semibold border-blue-500 px-3 py-1 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
                    <strong>Position:</strong> {achievement.position}
                  </p>
                )}
                {achievement.location && (
                  <p className="text-sm sm:text-base md:text-sm mb-1 md:mb-2 border font-semibold border-blue-500 px-3 py-1 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
                    <strong>Location:</strong> {achievement.location}
                  </p>
                )}
                {achievement.locationDate && (
                  <p className="text-sm sm:text-base md:text-sm mb-1 md:mb-2 border font-semibold border-blue-500 px-3 py-1 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
                    <strong>Date:</strong> {achievement.locationDate}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Achievement;
