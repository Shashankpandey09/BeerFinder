import React from 'react';


const Navbar = () => {


  return (
    <nav className="bg-blue-600 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-white text-3xl font-bold">Beer Finder</a>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-48 px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none mr-4"
          />
          <button className="text-white focus:outline-none">
           
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
