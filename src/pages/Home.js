import React from 'react';
import img from '../components/Assets/mu.jpeg'
function Home() {
  return (
    <section className="relative bg-gray-100 py-20">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30">
      <img src={img} className='w-96'></img>
      </div>
      {/* Content */}
      <div className="relative container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-teal-500 mb-6">
          Welcome to MU CSE Society
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          We are a community of passionate developers, tech enthusiasts, and
          learners, striving to make a positive impact in the field of computer science.
          Join us in our journey of learning, collaboration, and innovation.
        </p>
        <div className="flex justify-center">
          <a
            href="/about"
            className="bg-teal-500 text-white font-bold py-3 px-6 rounded-full hover:bg-teal-400 transition duration-300"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
