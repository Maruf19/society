import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ReviewSection = () => {
  const [name, setName] = useState('');
  const [batch, setBatch] = useState(''); // New state for batch
  const [testimonial, setTestimonial] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, batch, testimonial }), // Include batch in the request body
      });

      if (response.ok) {
        setSuccessMessage('Thank you for your testimonial!');
        setName('');
        setBatch(''); // Reset batch
        setTestimonial('');
      } else {
        throw new Error('Failed to submit your testimonial. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Your Opinion</h2>

        {/* Success/Error Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="p-4 border border-teal-500 rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
                required
              />
            </label>
          </div>

          {/* Batch input field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Batch:
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full p-2 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Opinion:
              <textarea
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                className="w-full p-2 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
                required
              />
            </label>
          </div>

          <button 
            type="submit" 
            className={`bg-teal-500 text-white px-4 py-2 rounded transition duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ReviewSection;
