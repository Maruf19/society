import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Activities = () => {
  const [newsActivities, setNewsActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsActivities = async () => {
      try {
        const response = await fetch('http://localhost:5000/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news activities');
        }
        const data = await response.json();
        setNewsActivities(data);
      } catch (error) {
        setError('Error fetching news activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsActivities();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Navbar />
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* Main Section Headline */}
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">
              NewsLetter
            </h1>
          </div>

          {/* Loading and Error Messages */}
          {loading && <div className="text-center py-6">Loading...</div>}
          {error && <div className="text-center text-red-500 py-6">{error}</div>}

          {/* Display News articles */}
          <div className="relative mt-12">
            <div className="relative bg-blue-500 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                  {newsActivities.slice().reverse().map((news) => (
                    <div
                      key={news.id}
                      className="bg-white border border-blue-800 bg-opacity-80 shadow-lg rounded-lg overflow-hidden p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                    >
                      <p className="text-sm font-semibold text-black mb-2 text-center ">
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          
                        >
                          {news.title}
                        </a>
                      </p>
                      <p className="text-sm text-blue-500 font-semibold text-center">{news.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Activities;
