import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <div className="text-white text-2xl font-bold px-2">MyApp</div>
      <nav>
        <Link
          to="/Dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          to="/homepage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         HomePage
        </Link>
        <Link
          to="/aboutpage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          About
        </Link>
        <Link
          to="/missionvisionpage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Mission And Vision
        </Link>

        <Link
          to="/schedulepage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Schedule
        </Link>
        <Link
          to="/featurepage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         Achievement
        </Link>

        <Link
          to="/leaderPage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         Current Leader
        </Link>

        <Link
          to="/teamPage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         Committee Team
        </Link>

        <Link
          to="/programmePage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Recent Programme
        </Link>

        <Link
          to="/activityPage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         Activities
        </Link>

        <Link
          to="/contactPage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         Contact
        </Link>

        <Link
          to="/contactInfo"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         Contact Info
        </Link>
        <Link
          to="/reviewPage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
        Review
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
