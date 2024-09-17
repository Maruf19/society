import React, { useEffect } from 'react';
import img from '../components/Assets/33.avif';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Programme from './Programme';
import TestimonialSlider from './Testimonial';

function Home() {
  useEffect(() => {
    // Smooth scroll to the top of the page when the component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-r from-blue-500 to-teal-500 py-20 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30">
          <img src={img} alt='background img' className='h-full w-full object-cover' />
        </div>
        {/* Content */}
        <div className="relative container mx-auto px-6 text-center mt-16">
          <h1 className="text-5xl font-extrabold mb-8 transition-opacity duration-500">
            Welcome to MU CSE Society
          </h1>
          <p className="text-lg mb-8 leading-relaxed transition-opacity duration-500">
            Welcome to the MU CSE Society, the dynamic hub for Computer Science and Engineering students at MU. Whether you're an experienced coder or just starting out, our society offers a range of opportunities to help you grow, learn, and connect with fellow tech enthusiasts. Our mission is to bridge the gap between academic learning and real-world applications through hands-on workshops, coding challenges, hackathons, and seminars on emerging technologies like AI, cybersecurity, and web development.
            We also focus on mentorship and networking, offering valuable connections with industry professionals, alumni, and recruiters from top tech companies. Through career events, tech talks, and collaborative projects, our members build portfolios and develop the skills needed to excel in the tech industry.
            Joining MU CSE Society means becoming part of a community dedicated to innovation, problem-solving, and shaping the future of technology. Whether you're here to sharpen your skills, work on exciting projects, or expand your professional network, the MU CSE Society is your gateway to success.
          </p>
          <div className="flex justify-center">
            <a
              href="/about"
              className="bg-teal-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
      <Programme />
      <TestimonialSlider />
      <Footer />
    </>
  );
}

export default Home;
