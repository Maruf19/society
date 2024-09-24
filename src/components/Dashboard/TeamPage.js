import React, { useState, useEffect } from 'react';
import Header from '../Dashboard/header';
import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const TeamPage = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the ID being edited

  // Fetch the schedule data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/team');
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
    formData.append('role', role);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      let requestMethod = editingId ? 'PUT' : 'POST';
      let url = editingId
        ? `http://localhost:5000/team/${editingId}`
        : 'http://localhost:5000/team';

      const response = await fetch(url, {
        method: requestMethod,
        body: formData,
      });

      if (response.ok) {
        alert(editingId ? 'Data successfully updated' : 'Data successfully uploaded');
        setName('');
        setRole('');
        setDescription('');
        setImage(null);
        setEditingId(null);
        fetchData(); // Refresh the data after submission
      } else {
        alert('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  // Handle deletion of a schedule
 const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this item?')) {
    try {
      const response = await fetch(`http://localhost:5000/team/${id}`, {
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
  

  // Handle editing by setting the form with the selected schedule's data
  const handleEdit = (item) => {
    setName(item.name);
    setRole(item.role);
    setDescription(item.description);
    setImage(null); // Reset the image upload for edit
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
            {editingId ? 'Edit Team' : 'Add Team'}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
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
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Role
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter a Role"
                required
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
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
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{item._id}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.role}</td>
                <td className="border border-gray-300 p-2">{item.description}</td>
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

export default TeamPage;
