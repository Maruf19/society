 import React, { useState, useEffect } from 'react';
 import Header from '../Dashboard/header';
 import { FaArrowLeft, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; 
 import { Link } from 'react-router-dom';
 
 const AboutPage = () => {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [data, setData] = useState([]);
   const [editingId, setEditingId] = useState(null);
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     const payload = { title, description };
 
     try {
       const url = editingId ? `http://localhost:5000/about/${editingId}` : 'http://localhost:5000/about';
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
         setTitle('');
         setDescription('');
         setEditingId(null);
         fetchData();
       } else {
         alert('Failed to upload/update data');
       }
     } catch (error) {
       console.error('Error during upload/update:', error);
     }
   };
 
   const fetchData = async () => {
     try {
       const response = await fetch('http://localhost:5000/about');
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
         const response = await fetch(`http://localhost:5000/about/${id}`, {
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
        <h1 className="text-2xl font-semibold text-center mb-2">Home</h1>
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
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{item.title}</td>
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
   )
 }
 
 export default AboutPage