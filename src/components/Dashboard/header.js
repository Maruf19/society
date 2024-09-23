import React from 'react';

const Header = () => {
  return (
    
    <header className="bg-slate-200 shadow p-4 flex justify-between items-center border border-red-800">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-100">
          <i className="fas fa-bell"></i>
        </button>
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
