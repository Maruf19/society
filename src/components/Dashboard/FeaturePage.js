import React, { useState, useEffect } from 'react';
import Header from '../Dashboard/header';
import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const FeaturePage = () => {
  const [type, setType] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [locationDate, setLocationDate] = useState('');
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch the feature data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/achievement');
      const result = await response.json();
      console.log('Fetched data:', result); // Debugging line
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission for both adding and updating
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert for submission
    alert(editingId ? 'Submitting updates...' : 'Submitting new data...');

    const formData = new FormData();
    formData.append('type', type);
    formData.append('position', position);
    formData.append('location', location);
    formData.append('locationDate', locationDate);
    if (image) {
        formData.append('image', image);
    }

    try {
        const requestMethod = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `http://localhost:5000/achievement/${editingId}`
            : 'http://localhost:5000/achievement';

        const response = await fetch(url, {
            method: requestMethod,
            body: formData,
        });

        if (response.ok) {
            const result = await response.json(); // Assuming the backend sends back the created/updated item
            alert(editingId ? 'Data successfully updated' : 'Data successfully uploaded');
            console.log('Response from server:', result); // Debugging line

            // Reset form
            setType('');
            setPosition('');
            setLocation('');
            setLocationDate('');
            setImage(null);
            setEditingId(null);
            fetchData();
        } else {
            const errorText = await response.text();
            alert(`Failed to submit the form: ${errorText}`);
        }
    } catch (error) {
        console.error('Error during form submission:', error);
    }
};

  // Handle deletion of a feature
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:5000/achievement/${id}`, {
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

  // Handle editing
  const handleEdit = (item) => {
    setType(item.type);
    setPosition(item.position);
    setLocation(item.location);
    setLocationDate(item.locationDate);
    setImage(null);
    setEditingId(item._id);
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
            {editingId ? 'Edit Feature' : 'Add Feature'}
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Type */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type</label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter type"
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>
            {/* Position */}
            <div className="mb-4">
              <label htmlFor="position" className="block text-gray-700 font-bold mb-2">Position</label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position"
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>
            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>
            {/* Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
              <input
                type="date"
                id="date"
                value={locationDate}
                onChange={(e) => setLocationDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>
            {/* Image */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>
            {/* Submit Button */}
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
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{item._id}</td>
                <td className="border border-gray-300 p-2">{item.type}</td>
                <td className="border border-gray-300 p-2">{item.position}</td>
                <td className="border border-gray-300 p-2">{item.location}</td>
                <td className="border border-gray-300 p-2">{item.locationDate}</td>
                <td className="border border-gray-300 p-2">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.type} className="w-20 h-20 object-cover" />
                  )}
                </td>
                <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                  <button className="p-2 text-black" onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </button>
                  <button className="p-2 text-black" onClick={() => handleDelete(item._id)}>
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

export default FeaturePage;
