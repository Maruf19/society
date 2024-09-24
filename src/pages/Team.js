import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './team.css'; // Import the custom CSS file for flip animation

function Team() {
  const [yearRange] = useState('2024-2025'); // Update this as needed
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
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

    fetchTeamData();
  }, []);

  if (loading) return <p className="text-center text-teal-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <Navbar />

      {/* Main Team Section */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">
            MU CSE Society Existing Committee <br />
            <span className="text-yellow-500">({yearRange})</span>
          </h2>

          {/* First row with 3 members */}
          <h3 className="text-2xl font-semibold text-center text-teal-700 mb-6">Advisory Members</h3>
          <div className="flex justify-center mb-12">
            {teamData.slice(0, 3).map((team, index) => (
              <div key={index} className="flip-card w-72 h-80 p-4">
                <div className="flip-card-inner w-full h-full transition-transform duration-500 ease-in-out transform hover:rotate-y-180">
                  <div className="flip-card-front bg-white border border-teal-600 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <img
                      src={team.imageUrl || team.image}
                      alt={team.name}
                      className="w-44 h-44 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-md font-bold text-teal-600">{team.name}</h3>
                  </div>
                  <div className="flip-card-back bg-teal-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                    <p className="text-lg">{team.role}</p>
                    <p className="mt-2 text-sm">{team.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

         {/* Advisory row with 2 members */}
<div className="flex justify-center mb-12">
  {teamData.slice(3, 5).map((team, index) => (
    <div key={index} className="flip-card w-72 h-80 p-4">
      <div className="flip-card-inner w-full h-full transition-transform duration-500 ease-in-out transform hover:rotate-y-180">
        <div className="flip-card-front bg-white border border-teal-600 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src={team.imageUrl || team.image}
            alt={team.name}
            className="w-44 h-44 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-bold text-teal-600">{team.name}</h3>
        </div>
        <div className="flip-card-back bg-teal-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          <p className="text-lg">{team.role}</p>
          <p className="mt-2 text-sm">{team.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>


          {/* Current Committee: First row with 3 members */}
          <h3 className="text-2xl font-semibold text-center text-teal-700 mb-6">Current Committee</h3>
          <div className="flex justify-center mb-12">
            {teamData.slice(5, 8).map((team, index) => (
              <div key={index} className="flip-card w-72 h-80 p-4">
                <div className="flip-card-inner w-full h-full transition-transform duration-500 ease-in-out transform hover:rotate-y-180">
                  <div className="flip-card-front bg-white border border-teal-600 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <img
                      src={team.imageUrl || team.image}
                      alt={team.name}
                      className="w-44 h-44 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold text-teal-600">{team.name}</h3>
                  </div>
                  <div className="flip-card-back bg-teal-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                    <p className="text-lg">{team.role}</p>
                    <p className="mt-2 text-sm">{team.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current Committee: Second row with 4 members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {teamData.slice(8).map((team, index) => (
              <div key={index} className="flip-card w-full h-80 p-4">
                <div className="flip-card-inner w-full h-full transition-transform duration-500 ease-in-out transform hover:rotate-y-180">
                  <div className="flip-card-front bg-white border border-teal-600 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <img
                      src={team.imageUrl || team.image}
                      alt={team.name}
                      className="w-44 h-44 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold text-teal-600">{team.name}</h3>
                  </div>
                  <div className="flip-card-back bg-teal-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                    <p className="text-lg">{team.role}</p>
                    <p className="mt-2 text-sm">{team.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Team;
