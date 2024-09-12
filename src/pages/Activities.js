import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Sample data for YouTube, Facebook, and News activities
const youtubeActivities = [
  {
    id: 1,
    title: 'Latest Webinar on AI',
    embedLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    description: 'Watch our latest webinar on AI advancements.',
  },
  {
    id: 2,
    title: 'Deep Learning Tutorial',
    embedLink: 'https://www.youtube.com/embed/vlDzYIIOYmM', // Replace with actual video URL
    description: 'Learn the basics of deep learning with this tutorial.',
  },
  {
    id: 3,
    title: 'React Hooks Explained',
    embedLink: 'https://www.youtube.com/embed/f687hBjwFcM', // Replace with actual video URL
    description: 'Master React hooks in this comprehensive video.',
  },
];

const facebookActivities = [
  {
    id: 1,
    title: 'MU CSE Society Post',
    embedLink: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmucses%2Fposts%2Fpfbid035mHceBSPVwEbb7ZJpkhSYd7FfCcQXMCxC3Z3tbRsnkdawNADsQLqbm4buGwmX1oJl&show_text=true&width=500', // The link you provided
    description: 'Check out our recent activities and updates.',
  },
  {
    id: 2,
    title: 'Project Launch Announcement',
    embedLink: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmucses%2Fposts%2Fpfbid032JZQUusizrxLpJjWbytJkAGAA85UQgC2ugAVe4DCscxdpiKFhwypehrMyu2XcN7hl&show_text=true&width=500',
    description: 'We’re excited to launch our new project! Stay tuned.',
  },
  {
    id: 3,
    title: 'Tech Workshop Recap',
    embedLink: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmucses%2Fposts%2Fpfbid032JZQUusizrxLpJjWbytJkAGAA85UQgC2ugAVe4DCscxdpiKFhwypehrMyu2XcN7hl&show_text=true&width=500', // Example placeholder link
    description: 'Recap of our recent hands-on tech workshop.',
  },
];

const newsActivities = [
  {
    id: 1,
    title: 'Tech Conference 2024 Announcement',
    link: 'https://www.prothomalo.com/bangladesh/xhsnooymdj', // Replace with actual news article URL
    description: 'Join us at the upcoming Tech Conference 2024.',
  },
  {
    id: 2,
    title: 'AI Revolution in Healthcare',
    link: 'https://www.technews.com/ai-healthcare', // Replace with actual news article URL
    description: 'How AI is transforming the healthcare industry.',
  },
  {
    id: 3,
    title: 'Future of Web Development',
    link: 'https://www.technews.com/future-web', // Replace with actual news article URL
    description: 'Discover the trends shaping the future of web development.',
  },
];

const Activities = () => {
  return (
    <>
    <Navbar/>
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-teal-600 mb-8">Recent Activities</h2>

        {/* YouTube Section */}
        <div>
          <h3 className="text-3xl font-bold text-teal-500 mb-6">YouTube Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubeActivities.map((video) => (
              <div key={video.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative w-full h-64">
                  <iframe
                    className="w-full h-full"
                    src={video.embedLink}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
               
              </div>
            ))}
          </div>
        </div>

        {/* Facebook Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-teal-500 mb-6">Facebook Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facebookActivities.map((post) => (
              <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative w-full h-64">
                  <iframe
                    className="w-full h-full"
                    src={post.embedLink}
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        {/* News Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-teal-500 mb-6">Latest News</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsActivities.map((news) => (
              <div key={news.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative w-full h-64 bg-gray-200 flex items-center justify-center">
                  <p className="text-lg font-semibold text-teal-500">
                    <a href={news.link} target="_blank" rel="noopener noreferrer">
                      {news.title}
                    </a>
                  </p>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-2xl font-bold mb-2">{news.title}</h4>
                  <p className="text-gray-600 mb-4">{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Activities;
