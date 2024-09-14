import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Sample data for YouTube, Facebook, and News activities
const youtubeActivities = [
  {
    id: 1,
    title: 'Latest Webinar on AI',
    embedLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Watch our latest webinar on AI advancements.',
  },
  {
    id: 2,
    title: 'Deep Learning Tutorial',
    embedLink: 'https://www.youtube.com/embed/vlDzYIIOYmM',
    description: 'Learn the basics of deep learning with this tutorial.',
  },
  {
    id: 3,
    title: 'React Hooks Explained',
    embedLink: 'https://www.youtube.com/embed/f687hBjwFcM',
    description: 'Master React hooks in this comprehensive video.',
  },
];

const facebookActivities = [
  {
    id: 1,
    title: 'MU CSE Society Post',
    embedLink: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmucses%2Fposts%2Fpfbid035mHceBSPVwEbb7ZJpkhSYd7FfCcQXMCxC3Z3tbRsnkdawNADsQLqbm4buGwmX1oJl&show_text=true&width=500',
    description: 'Check out our recent activities and updates.',
  },
  {
    id: 2,
    title: 'Project Launch Announcement',
    embedLink: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmucses%2Fposts%2Fpfbid0gXkDzPajJHEuZqAa4jLq2t2AvhsGjUPRJnaoRhBWeVRMdSizXJoi56xcxa6rr2Bwl&show_text=true&width=500',
    description: 'We’re excited to launch our new project! Stay tuned.',
  },
  {
    id: 3,
    title: 'Tech Workshop Recap',
    embedLink: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmucses%2Fposts%2Fpfbid0xkvDZkFN9UzNnFTpsGXCriNVb1iwjoxUzZkigKDQyZHUrUvCHDLqkVEtUsAAMkuYl&show_text=true&width=500',
    description: 'Recap of our recent hands-on tech workshop.',
  },
];

const newsActivities = [
  {
    id: 1,
    title: 'লোডশেডিংয়ে বেশি কষ্টে ঢাকা, কুমিল্লা, ময়মনসিংহের গ্রামবাসী',
    link: 'https://www.prothomalo.com/bangladesh/xhsnooymdj',
    description: '- Ptothom Alo',
  },
  {
    id: 2,
    title: 'AI Revolution in Healthcare',
    link: 'https://www.technews.com/ai-healthcare',
    description: 'How AI is transforming the healthcare industry.',
  },
  {
    id: 3,
    title: 'Future of Web Development',
    link: 'https://www.technews.com/future-web',
    description: 'Discover the trends shaping the future of web development.',
  },
];

const Activities = () => {
  const [activeSection, setActiveSection] = useState('all');

  const handleFilter = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Navbar />
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* Main Section Headline */}
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-teal-500 pb-2 inline-block">
              Our Recent Programme
            </h1>
          </div>

          {/* Buttons to filter sections */}
          <div className="flex flex-wrap justify-center mb-8">
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

          {/* Display YouTube videos */}
          {(activeSection === 'all' || activeSection === 'youtube') && (
            <div>
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-12 border-b-2 border-teal-500 pb-2 inline-block">YouTube Videos</h3>
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
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-12 border-b-2 border-teal-500 pb-2 inline-block">Facebook Posts</h3>
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
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-12 border-b-2 border-teal-500 pb-2 inline-block">Latest News</h3>
              <div className="relative bg-black bg-opacity-50 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col items-center justify-center text-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsActivities.map((news) => (
                      <div key={news.id} className="bg-white bg-opacity-80 shadow-lg rounded-lg overflow-hidden p-4">
                        <p className="text-lg font-semibold text-teal-500 mb-2">
                          <a href={news.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {news.title}
                          </a>
                        </p>
                        <p className="text-sm text-black text-bold">{news.description}</p>
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
