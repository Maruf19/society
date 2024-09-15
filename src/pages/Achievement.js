import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const achievements = [
  {
    id: 1,
    type: 'Programming Contest',
    date: '2024-09-10',
    position: '1st Position',
    location: 'MU Campus',
    locationDate: '12/12/2024',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    type: 'Hackathon Winner',
    date: '2024-08-15',
    position: '2nd Position',
    location: 'Tech Fest 2024',
    locationDate: '15/11/2024',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    type: 'Code Challenge',
    date: '2024-07-25',
    position: '1st Position',
    location: 'Online',
    locationDate: '01/09/2024',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    type: 'Cultural Festival',
    date: '2024-06-20',
    position: 'Participation',
    location: 'University Hall',
    locationDate: '20/06/2024',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    type: 'Science Fair',
    date: '2024-05-30',
    position: 'Honorable Mention',
    location: 'MU Campus',
    locationDate: '30/05/2024',
    image: 'https://via.placeholder.com/150',
  },
];

const Achievement = () => {
  // Sort achievements by date, latest first
  const sortedAchievements = achievements.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 md:p-8 lg:p-12 rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800">Our Students Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {sortedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl relative border border-gray-400"
            >
              <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg mb-4 mt-3">
                <img
                  src={achievement.image}
                  alt={`Achievement ${achievement.id}`}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>
              <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs md:text-sm font-bold rounded-br-lg px-2 py-1 md:px-3 md:py-2">
                {achievement.type}
              </div>
              <div className="flex flex-col items-center justify-center mt-4 md:mt-6 lg:mt-8">
                {achievement.position && (
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-1 md:mb-2 text-center"><strong>Position:</strong> {achievement.position}</p>
                )}
                {achievement.location && (
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-1 md:mb-2 text-center"><strong>Location:</strong> {achievement.location}</p>
                )}
                {achievement.locationDate && (
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-1 md:mb-2 text-center"><strong>Date:</strong> {achievement.locationDate}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Achievement;