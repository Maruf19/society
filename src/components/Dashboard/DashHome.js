import React, { useState } from 'react';

const Dashboard = () => {
  const [title] = useState('Welcome to Our Amazing Website');
  const [description] = useState(
    'This is the default home page description. You can update this section using the admin panel below.'
  );

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex-1 bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-6 border border-black">
        <div className="max-w-4xl p-8 bg-white rounded-2xl shadow-2xl text-center transition-all duration-300 transform hover:scale-105">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
            {title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="  p-6 pt-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-black p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="mt-2 text-gray-500">1500</p>
          </div>
          <div className="bg-white p-4 border border-black rounded-lg shadow">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="mt-2 text-gray-500">$12,500</p>
          </div>
          <div className="bg-white p-4 border border-black rounded-lg shadow">
            <h2 className="text-lg font-semibold">Active Orders</h2>
            <p className="mt-2 text-gray-500">320</p>
          </div>
          <div className="bg-white p-4 border border-black rounded-lg shadow">
            <h2 className="text-lg font-semibold">New Signups</h2>
            <p className="mt-2 text-gray-500">45</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
