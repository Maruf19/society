import React, { useState, useEffect } from 'react';
import Header from '../Dashboard/header';
import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const LeaderPage = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the ID being edited
  const [currentImageUrl, setCurrentImageUrl] = useState(''); // To hold the current image URL for display

  // Fetch the leader data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/leader');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  // Handle form submission for both adding and updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    if (image) {
      formData.append('image', image);
    }

    try {
      let requestMethod = editingId ? 'PUT' : 'POST';
      let url = editingId
        ? `http://localhost:5000/leader/${editingId}`
        : 'http://localhost:5000/leader';

      const response = await fetch(url, {
        method: requestMethod,
        body: formData,
      });

      if (response.ok) {
        alert(editingId ? 'Data successfully updated' : 'Data successfully uploaded');
        setName('');
        setPosition('');
        setImage(null);
        setCurrentImageUrl(''); // Reset current image URL
        setEditingId(null);
        fetchData(); // Refresh the data after submission
      } else {
        alert('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  // Handle deletion of a leader
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:5000/leader/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Data successfully deleted');
          fetchData();
        } else {
          const errorText = await response.text();
          alert(`Failed to delete data: ${errorText}`);
        }
      } catch (error) {
        console.error('Error during deletion:', error);
        alert('An error occurred during deletion.');
      }
    }
  };

  // Handle editing by setting the form with the selected leader's data
  const handleEdit = (item) => {
    setName(item.name);
    setPosition(item.position);
    setCurrentImageUrl(item.imageUrl); // Set the current image URL for display
    setEditingId(item._id); // Set the ID for editing
    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-between p-4">
        <Link to="/dashboard" className="flex items-center text-gray-700">
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center min-h-screen">
        <div id="form-container" className="bg-white border border-black rounded-lg shadow-lg px-8 py-2 w-96 max-w-full">
          <h1 className="text-2xl font-semibold text-center mb-2">
            {editingId ? 'Edit Leader' : 'Add Leader'}
          </h1>
          <form onSubmit={handleSubmit}>
            {editingId && currentImageUrl && (
              <img src={currentImageUrl} alt="Current" className="w-20 h-20 object-cover mb-2" />
            )}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name 
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a Name"
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="position" className="block text-gray-700 font-bold mb-2">
                Position
              </label>
              <textarea
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter the position"
                required
                rows="6"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
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

      {/* Data Table */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Data Table</h2>
        <table className="min-w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{item._id}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.position}</td>
                <td className="border border-gray-300 p-2">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover" />
                  )}
                </td>
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
};

export default LeaderPage;
