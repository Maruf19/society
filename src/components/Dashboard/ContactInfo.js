import React, { useState, useEffect } from 'react';
import Header from '../Dashboard/header'; // Ensure you have this component
import { FaTrash, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactInfo = () => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/contact-info');
            const result = await response.json();

            if (Array.isArray(result)) {
                setData(result);
            } else {
                setData([]);
                console.error('Fetched data is not an array:', result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            address,
            phone,
            email,
        };

        // Then send JSON data
        const response = await fetch('http://localhost:5000/contact-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setSuccessMessage('Contact information added successfully!'); // Set success message
            fetchData(); // Refresh data after submission
            // Clear the form fields
            setAddress('');
            setPhone('');
            setEmail('');
        } else {
            alert('Failed to add contact information'); // Handle error if necessary
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`http://localhost:5000/contact-info/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Data successfully deleted');
                    fetchData(); // Refresh data after deletion
                } else {
                    alert('Failed to delete data');
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
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
                    <h1 className="text-2xl font-semibold text-center mb-2">Add Contact Info</h1>
                    
                    {/* Display success message */}
                    {successMessage && (
                        <div className="mb-4 text-green-600 text-center">{successMessage}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter an Address"
                                required
                                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter an Email"
                                required
                                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Mobile No.</label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter a Mobile No."
                                required
                                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-pink-500 text-white font-bold rounded-md hover:bg-pink-400 transition duration-200"
                        >
                            Upload <FaCheck className="inline ml-2" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Contact Data Table</h2>
                <table className="min-w-full border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Address</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Mobile No</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map(item => (
                                <tr key={item._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{item.address}</td>
                                    <td className="border border-gray-300 p-2">{item.email}</td>
                                    <td className="border border-gray-300 p-2">{item.phone}</td>
                                    <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                                        <button
                                            className="text-black"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border border-gray-300 p-2">
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

export default ContactInfo;
