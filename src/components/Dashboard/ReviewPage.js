import React, { useState, useEffect } from 'react';
import Header from '../Dashboard/header';
import { FaTrash } from 'react-icons/fa';

const ReviewPage= () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/review');
      const result = await response.json();
      
      if (Array.isArray(result)) {
        setData(result); // Set data if it's an array
      } else {
        setData([]); // Fallback in case the result is not an array
        console.error('Fetched data is not an array:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const handleDelete = async (id) => {
  console.log(`Deleting item with id: ${id}`);

  if (window.confirm('Are you sure you want to delete this item?')) {
    try {
      const response = await fetch(`http://localhost:5000/review/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error deleting item:', errorText);
        alert('Failed to delete data: ' + errorText);
      } else {
        alert('Data successfully deleted');
        fetchData(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Network or server error during deletion:', error);
      alert('Network or server error occurred');
    }
  }
};


  return (
    <>
      <Header />

      {/* Data Table */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Contact Data Table</h2>
        <table className="min-w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Batch</th>
              <th className="border border-gray-300 p-2">Review/Opinion</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map(item => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.batch}</td>
                  <td className="border border-gray-300 p-2">{item.testimonial}</td>
                  <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                    <button
                      className="text-black"
                      onClick={() => handleDelete(item._id)} // Use _id for deletion
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 p-2">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReviewPage;
