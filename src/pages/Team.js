import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './team.css'; // Import the custom CSS file for flip animation


  

// const [yearRange, setYearRange]
const Team = () => {
   const [yearRange] = useState('2024-2025'); // Update this as needed

   const [teamData, setTeamData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
 
   useEffect(() => {
     const fetchTeam = async () => {
       try {
         const response = await fetch('http://localhost:5000/team');
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         const data = await response.json();
         setTeamData(data);
       } catch (err) {
         console.error(err);
         setError(err.message);
       
       } finally {
         setLoading(false);
       }
     };
 
     fetchTeam();
   }, []);
 
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;
 
  return (
    <>
      <Navbar />
     {/* Main Team Section */}
     <section className="bg-white">
  <div className="relative overflow-hidden">
    <div className="relative container mx-auto px-4 lg:px-8">
    <h2 className="text-2xl font-bold text-center text-teal-600 mb-8 relative z-10 mt-16">
              MU CSE Society Existing Committee <br/> <span className="text-yellow-500">({yearRange})</span>
            </h2>

      {/* First row with 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 relative z-10">
        {teamData.slice(0, 3).map((member, index) => (
       <div key={index} className="flip-card w-64 h-80 p-6">
            <div className="flip-card-inner w-full h-full absolute transform transition-transform duration-500 hover:rotate-y-180">
              <div className="flip-card-front border border-red-950 bg-white text-center rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-44 h-44 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-teal-500">{member.name}</h3>
              </div>
              <div className="flip-card-back bg-transparent text-center text-black border border-black rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transform rotate-y-180">
                <p className="text-lg">{member.role}</p>
                <p className="text-black mt-2 text-sm">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second row with 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 relative z-10">
        {teamData.slice(3).map((member, index) => (
          <div key={index} className="flip-card w-64 h-80 p-6">
            <div className="flip-card-inner w-full h-full absolute transform transition-transform duration-500 hover:rotate-y-180">
              <div className="flip-card-front border border-red-950 bg-white text-center rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-44 h-44 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-teal-500">{member.name}</h3>
              </div>
              <div className="flip-card-back bg-transparent text-center text-black border border-black rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transform rotate-y-180">
                <p className="text-lg">{member.role}</p>
                <p className="text-black mt-2 text-sm">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Remaining rows with 5 cards each */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
        {team.slice(7).map((member, index) => (
          <div key={index} className="flip-card w-56 h-80 relative mx-auto">
            <div className="flip-card-inner w-full h-full absolute transform transition-transform duration-500 hover:rotate-y-180">
              <div className="flip-card-front bg-white border border-red-950 text-center rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-teal-500">{member.name}</h3>
              </div>
              <div className="flip-card-back bg-transparent text-center text-black border border-black rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transform rotate-y-180">
                <p className="text-lg">{member.role}</p>
                <p className="text-black mt-2 text-sm">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  </div>
</section>


      <Footer />
    </>
  );
};

export default Team;
