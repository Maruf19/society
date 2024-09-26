import React, { useState, useEffect } from 'react'; 
import Header from '../Dashboard/header';
import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const ActivityPage = () => {
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState(''); // New state for title
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/news');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, link, description }; // Include title in the payload

    try {
      const url = editingId ? `http://localhost:5000/news/${editingId}` : 'http://localhost:5000/news';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(editingId ? 'Data successfully updated' : 'Data successfully uploaded');
        setLink('');
        setDescription('');
        setTitle(''); // Reset title after submission
        setEditingId(null);
        fetchData();  // Refresh data after submission
      } else {
        alert('Failed to upload/update data');
      }
    } catch (error) {
      console.error('Error during upload/update:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:5000/news/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Data successfully deleted');
          fetchData();  // Fetch updated data after deletion
        } else {
          const errorMessage = await response.text();
          alert(`Failed to delete data: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error during deletion:', error);
        alert(`Error during deletion: ${error.message}`);
      }
    }
  };

  const handleEdit = (item) => {
    setLink(item.link);
    setDescription(item.description);
    setTitle(item.title); // Set title for editing
    setEditingId(item._id);  // Use _id for editing
    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchData();  // Fetch data when component mounts
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center justify-between p-4">
        <Link to="/dashboard" className="flex items-center text-gray-700">
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div id="form-container" className="bg-white border border-black rounded-lg shadow-lg px-8 py-2 w-96 max-w-full">
          <h1 className="text-2xl font-semibold text-center mb-2">Home</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label> {/* New title label */}
              <input
                type="text"
                id="title"
                value={title} // Bind title state
                onChange={(e) => setTitle(e.target.value)} // Update title state
                placeholder="Enter a title"
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="link" className="block text-gray-700 font-bold mb-2">Link</label>
              <input
                type="text"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter a link"
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description"
                required
                rows="6"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white font-bold rounded-md hover:bg-pink-400 transition duration-200"
            >
              {editingId ? 'Update' : 'Upload'} <FaCheck className="inline ml-2" />
            </button>
          </form>
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loading && <div className="text-center py-6">Loading...</div>}
      {error && <div className="text-center text-red-500 py-6">{error}</div>}

      {/* Data Table */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Data Table</h2>
        <table className="min-w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Link</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{item.title}</td>
                <td className="border border-gray-300 p-2">{item.link}</td>
                <td className="border border-gray-300 p-2">{item.description}</td>
                <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                  <button
                    className="p-2 text-black"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-2 text-black"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ActivityPage;
