import React from 'react';
import Navbar from '../components/Navbar';

function About() {
  return (
    <>
    <Navbar/>
      <section className="bg-black-100 py-12">
  <div class="container mx-auto px-4">
    <div class="text-center">
      <h2 class="text-4xl font-bold text-red-500 bg-red-800 mb-4">About Me</h2>
      <p class="text-4xl text-gray-600 max-w-2xl mx-auto">
        Hello! I'm Maruf, a passionate full stack developer and programmer with experience in building responsive and user-friendly web applications. I love exploring new technologies and continually improving my skills. Welcome to my travel journey!
      </p>
    </div>
   
  </div>
</section>
</>
  );
}

export default About;
