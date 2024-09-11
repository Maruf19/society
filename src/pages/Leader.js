import React from 'react';
import img from '../components/Assets/22.jpg'
import img1 from '../components/Assets/11.jpg'
import img2 from '../components/Assets/mu.jpeg'
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

const Leadership = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Current Leadership</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {leaders.map((leader) => (
          <div key={leader.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              className="w-full h-56 object-cover"
              src={leader.image}
              alt={leader.name}
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">{leader.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{leader.position}</p>
              <p className="text-gray-700 mb-4">{leader.description}</p>
              <button className="text-black border border-black px-6 py-2 rounded-full bg-transparent hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
