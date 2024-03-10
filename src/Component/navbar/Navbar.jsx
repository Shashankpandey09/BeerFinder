import React, { useState } from 'react';


const Navbar = () => {



  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query) || product.tagline.toLowerCase().includes(query)
    );
    setFilteredProducts(filteredProducts);
  };


  return (
    <nav className="bg-blue-600 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-white text-3xl font-bold">Beer Finder</a>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
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
