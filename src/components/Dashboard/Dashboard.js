import React from 'react';
import Header from '../Dashboard/header';
import Sidebar from '../Dashboard/Sidebar';
import DashHome from '../Dashboard/DashHome';

const Dashboard = () => {
  return (
    <div className="flex">
    {/* Sidebar */}
    <Sidebar />

    {/* Main content */}
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <DashHome />
      </main>
    </div>
  </div>
  );
};

export default Dashboard;
