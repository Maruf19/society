import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

const ActiveSeason = () => {
  const [formData, setFormData] = useState({
    facebookEmbedLink: '',
    facebookDescription: '',
    youtubeEmbedLink: '',
    youtubeDescription: '',
    newsLink: '',
    newsDescription: '',
  });

  const [activeForm, setActiveForm] = useState('facebook'); // Set the default active form

  const [entries, setEntries] = useState({
    facebook: [],
    youtube: [],
    news: [],
  });

  // Fetch data from the APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const facebookResponse = await fetch('http://localhost:5000/facebook');
        const youtubeResponse = await fetch('http://localhost:5000/youtube');
        const newsResponse = await fetch('http://localhost:5000/news');

        const facebookData = await facebookResponse.json();
        const youtubeData = await youtubeResponse.json();
        const newsData = await newsResponse.json();

        // Update entries with fetched data
        setEntries({
          facebook: facebookData.map(entry => ({
            embedLink: entry.embedLink,
            description: entry.description,
          })),
          youtube: youtubeData.map(entry => ({
            embedLink: entry.embedLink,
            description: entry.description,
          })),
          news: newsData.map(entry => ({
            link: entry.link,
            description: entry.description,
          })),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, platform) => {
    e.preventDefault();

    // Create an entry structure based on the platform
    let newEntry;
    if (platform === 'news') {
      newEntry = {
        link: formData.newsLink,
        description: formData.newsDescription,
      };
    } else {
      newEntry = {
        embedLink: formData[`${platform}EmbedLink`],
        description: formData[`${platform}Description`],
      };
    }

    setEntries((prev) => ({
      ...prev,
      [platform]: [...prev[platform], newEntry],
    }));

    // Reset the form data after submission
    setFormData({
      facebookEmbedLink: '',
      facebookDescription: '',
      youtubeEmbedLink: '',
      youtubeDescription: '',
      newsLink: '',
      newsDescription: '',
    });
  };

  const toggleFormVisibility = (platform) => {
    setActiveForm(platform); // Set the active form to the selected platform
  };

  // Dummy handlers for edit and delete
  const handleEdit = (entry) => {
    console.log("Edit entry:", entry);
  };

  const handleDelete = (entry) => {
    console.log("Delete entry:", entry);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Active Season</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        {['facebook', 'youtube', 'news'].map((platform) => (
          <button
            key={platform}
            className={`py-2 px-4 sm:px-6 text-white rounded-md transition duration-300 ${activeForm === platform ? 'bg-indigo-600' : 'bg-gray-400 hover:bg-gray-500'}`}
            onClick={() => toggleFormVisibility(platform)}
          >
            {`${platform.charAt(0).toUpperCase() + platform.slice(1)} Form`}
          </button>
        ))}
      </div>

      {/* Form and Data Tables */}
      {['facebook', 'youtube', 'news'].map((platform) => (
        activeForm === platform && (
          <div key={platform} className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
            <form onSubmit={(e) => handleSubmit(e, platform)} className="space-y-4">
              {platform !== 'news' ? (
                <>
                  <label className="block text-gray-600 mb-2">{`${platform.charAt(0).toUpperCase() + platform.slice(1)} Embed Link`}</label>
                  <input
                    type="url"
                    name={`${platform}EmbedLink`}
                    value={formData[`${platform}EmbedLink`]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${platform} embed link`}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <label className="block text-gray-600">{`${platform.charAt(0).toUpperCase() + platform.slice(1)} Description`}</label>
                  <textarea
                    name={`${platform}Description`}
                    value={formData[`${platform}Description`] || ''}
                    onChange={handleInputChange}
                    placeholder="Enter a description"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </>
              ) : (
                <>
                  <label className="block text-gray-600 mb-2">News Link</label>
                  <input
                    type="url"
                    name="newsLink"
                    value={formData.newsLink}
                    onChange={handleInputChange}
                    placeholder="Enter news link"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <label className="block text-gray-600">{`News Description`}</label>
                  <textarea
                    name="newsDescription"
                    value={formData.newsDescription || ''}
                    onChange={handleInputChange}
                    placeholder="Enter a description"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </>
              )}
              <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md mt-4 hover:bg-indigo-700 transition duration-300">Submit</button>
            </form>

            {/* Data Table */}
            <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-4">{`${platform.charAt(0).toUpperCase() + platform.slice(1)} Data Table`}</h4>
            <div className="overflow-x-auto">
              <div className="bg-white border border-gray-300 rounded-md shadow-md">
                {/* Header */}
                <div className="flex bg-gray-100 font-semibold">
                  <div className="flex-1 py-2 px-4 border-b">Link</div>
                  <div className="flex-1 py-2 px-4 border-b">Description</div>
                  <div className="py-2 px-4 border-b">Actions</div> {/* Actions Column */}
                </div>

                {/* Body */}
                <div>
                  {entries[platform].map((entry, index) => (
                    <div key={index} className="flex hover:bg-gray-50">
                      {/* Link Column */}
                      <div className="flex-1 py-2 px-4 border-b overflow-hidden">
                        {platform === 'news' ? (
                          <a
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline overflow-hidden whitespace-nowrap overflow-ellipsis"
                            title={entry.link} // Show full link on hover
                          >
                            {entry.link}
                          </a>
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: entry.embedLink }} className="overflow-hidden whitespace-nowrap overflow-ellipsis" />
                        )}
                      </div>
                      {/* Description Column */}
                      <div className="flex-1 py-2 px-4 border-b overflow-hidden">
                        <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">{entry.description}</div>
                      </div>
                      {/* Actions Column */}
                      <div className="py-2 px-4 border-b flex items-center">
                        <button
                          onClick={() => handleEdit(entry)} // Your edit function
                          className="text-black hover:text-blue-600 transition duration-200"
                          aria-label="Edit"
                        >
                          <FaEdit className="mr-2" />
                        </button>
                        <button
                          onClick={() => handleDelete(entry)} // Your delete function
                          className="text-black hover:text-red-600 transition duration-200"
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default ActiveSeason;
