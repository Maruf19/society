import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Activities = () => {
  const [activeSection, setActiveSection] = useState('all');
  const [youtubeActivities, setYoutubeActivities] = useState([]);
  const [facebookActivities, setFacebookActivities] = useState([]);
  const [newsActivities, setNewsActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchYoutubeActivities(),
          fetchFacebookActivities(),
          fetchNewsActivities(),
        ]);
      } catch (err) {
        setError('Error fetching activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchYoutubeActivities = async () => {
    try {
      const response = await fetch('http://localhost:5000/youtube');
      const data = await response.json();
      setYoutubeActivities(data);
    } catch (error) {
      console.error('Error fetching YouTube activities:', error);
      throw error; // Throw error to be caught in the useEffect
    }
  };

  const fetchFacebookActivities = async () => {
    try {
      const response = await fetch('http://localhost:5000/facebook');
      const data = await response.json();
      setFacebookActivities(data);
    } catch (error) {
      console.error('Error fetching Facebook activities:', error);
      throw error; // Throw error to be caught in the useEffect
    }
  };

  const fetchNewsActivities = async () => {
    try {
      const response = await fetch('http://localhost:5000/news');
      const data = await response.json();
      setNewsActivities(data);
    } catch (error) {
      console.error('Error fetching News activities:', error);
      throw error; // Throw error to be caught in the useEffect
    }
  };

  const handleFilter = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Navbar />
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* Main Section Headline */}
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-teal-500 pb-2 inline-block">
              Our Recent Programme
            </h1>
          </div>

          {/* Buttons to filter sections */}
          <div className="flex flex-wrap justify-center mb-4">
            {['all', 'youtube', 'facebook', 'news'].map((section) => (
              <button
                key={section}
                onClick={() => handleFilter(section)}
                className={`px-4 py-2 mx-2 mb-2 font-semibold ${activeSection === section ? 'bg-teal-600 text-white' : 'bg-white text-teal-600'} border border-teal-600 rounded-lg`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Loading and Error Messages */}
          {loading && <div className="text-center py-6">Loading...</div>}
          {error && <div className="text-center text-red-500 py-6">{error}</div>}

          {/* Display YouTube videos */}
          {(activeSection === 'all' || activeSection === 'youtube') && (
            <div>
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-4 border-b-2 border-teal-500 pb-2 inline-block">YouTube Videos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {youtubeActivities.map((video) => (
                  <div key={video.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-56 sm:h-64 lg:h-72"
                      src={video.embedLink}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display Facebook posts */}
          {(activeSection === 'all' || activeSection === 'facebook') && (
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-4 border-b-2 border-teal-500 pb-2 inline-block">Facebook Posts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {facebookActivities.map((post) => (
                  <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-56 sm:h-72 lg:h-80"
                      src={post.embedLink}
                      title={post.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display News articles */}
          {(activeSection === 'all' || activeSection === 'news') && (
            <div className="relative mt-12">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-4 border-b-2 border-teal-500 pb-2 inline-block">Latest News</h3>
              <div className="relative bg-blue-800 bg-opacity-50 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col items-center justify-center text-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsActivities.map((news) => (
                      <div key={news.id} className="bg-white bg-opacity-80 shadow-lg rounded-lg overflow-hidden p-4">
                        <p className="text-sm font-semibold text-teal-500 mb-2">
                          <a href={news.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {news.title}
                          </a>
                        </p>
                        <p className="text-sm text-black">{news.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Activities;
