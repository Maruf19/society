import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import img from "../components/Assets/mu.jpeg";

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost:5000/review');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isPaused && testimonials.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="container mx-auto py-6 px-4 md:px-6 lg:px-8 flex flex-col items-center mb-4">
      <h2 className="text-2xl md:text-2xl sm:text-xl lg:text-3xl font-extrabold text-gray-800 mb-12 text-center">
        Student's Thought
        <span className="block mt-2 border-b-2 border-blue-500"></span>
      </h2>
      <div className="relative flex justify-center">
        <div
          className="relative bg-blue-500 bg-opacity-10 p-4 md:p-6 lg:p-8 h-64 w-[600px] rounded-lg shadow-xl ring-2 ring-gradient-500 transition-transform duration-500"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2 md:p-3 rounded-full shadow-lg hover:opacity-80 focus:outline-none transition-opacity"
            onClick={handlePrevious}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-500 text-white p-2 md:p-3 rounded-full shadow-lg hover:opacity-80 focus:outline-none transition-opacity"
            onClick={handleNext}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          {testimonials.length > 0 && (
            <div className="flex flex-col items-center h-full">
              <img
                src={img}
                alt="Student"
                className="w-16 h-16 rounded-full border-2 border-blue-500 mb-3 object-cover"
              />
              <h3 className="text-md md:text-md lg:text-md font-semibold text-gray-800 text-center">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-sm md:text-sm lg:text-sm text-gray-600 text-center">
                {testimonials[currentIndex].batch}
              </p>
              <p className="text-gray-700 italic text-sm md:text-sm lg:text-sm text-center h-20 overflow-hidden">
                <span className="block overflow-hidden text-ellipsis whitespace-normal">
                  "{testimonials[currentIndex].testimonial}"
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
