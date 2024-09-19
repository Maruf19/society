import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const testimonials = [
  {
    name: "John Doe",
    title: "Software Engineer",
    feedback: "This platform is amazing! It has helped me improve my coding skills tremendously.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    title: "Product Manager",
    feedback: "I love the user interface. It’s clean, easy to use, and provides a great experience.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Johnson",
    title: "Data Scientist",
    feedback: "The community is incredibly helpful, and I’ve learned so much through the resources provided.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

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
    <section className="container mx-auto py-6 px-4 md:px-6 lg:px-8 flex flex-col items-center">
    <h2 className="text-2xl md:text-2xl sm:text-xl lg:text-3xl font-extrabold text-gray-800 mb-12 text-center">
      Student's Thought
      <span className="block mt-2 border-b-4 border-teal-500"></span>
    </h2>
      <div className="relative flex justify-center">
        <div
          className="relative bg-white p-4 md:p-6 lg:p-8 max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-xl ring-2 ring-gradient-500 transition-transform duration-500"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 md:p-3 rounded-full shadow-lg hover:opacity-80 focus:outline-none transition-opacity"
            onClick={handlePrevious}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 md:p-3 rounded-full shadow-lg hover:opacity-80 focus:outline-none transition-opacity"
            onClick={handleNext}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <div className="flex flex-col items-center">
            <img
              src={testimonials[currentIndex].image}
              alt={`${testimonials[currentIndex].name}'s portrait`}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-md mb-4"
            />
            <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-800 mb-2 text-center">
              {testimonials[currentIndex].name}
            </h3>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-4 text-center">
              {testimonials[currentIndex].title}
            </p>
            <p className="text-gray-700 italic text-sm md:text-base lg:text-lg text-center">
              "{testimonials[currentIndex].feedback}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
