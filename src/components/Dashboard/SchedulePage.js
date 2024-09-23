import React, { useState, useEffect } from 'react';
import Header from '../Dashboard/header';
import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const SchedulePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      
      // Add title and description to FormData
      formData.append('title', title);
      formData.append('description', description);
  
      // Upload image if one is selected
      if (image) {
        formData.append('image', image); // Include image in FormData
      } else {
        alert('Please select an image to upload.');
        return;
      }
  
      const uploadResponse = await fetch('http://localhost:5000/schedule', {
        method: 'POST',
        body: formData,
      });
  
      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        alert(editingId ? 'Data successfully updated' : 'Data successfully uploaded');
        
        // Reset form fields
        setTitle('');
        setDescription('');
        setImage(null);
        setEditingId(null);
        fetchData(); // Refresh data
      } else {
        const errorResult = await uploadResponse.text();
        alert(`Failed to upload image: ${errorResult}`);
      }
    } catch (error) {
      console.error('Error during upload/update:', error);
      alert('An error occurred during the upload.');
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/schedule');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:5000/schedule/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Data successfully deleted');
          fetchData();
        } else {
          alert('Failed to delete data');
        }
      } catch (error) {
        console.error('Error during deletion:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.imageUrl); // Set image URL for editing
    setEditingId(item.id);
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
      <div className="flex items-center justify-center min-h-screen">
        <div id="form-container" className="bg-white border border-black rounded-lg shadow-lg px-8 py-2 w-96 max-w-full">
          <h1 className="text-2xl font-semibold text-center mb-2">Schedule</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
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
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.title}</td>
                <td className="border border-gray-300 p-2">{item.description}</td>
                <td className="border border-gray-300 p-2">
                  {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover" />}
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
                    onClick={() => handleDelete(item.id)}
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

export default SchedulePage;
