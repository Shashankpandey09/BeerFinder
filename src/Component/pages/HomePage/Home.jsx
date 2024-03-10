import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../../slices/ProductSlice/ProductSlice';
import Navbar from '../../navbar/Navbar';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.beer);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredProducts = product.filter(product =>
      product.name.toLowerCase().includes(query) || product.tagline.toLowerCase().includes(query)||product.first_brewed.includes(query)
    );
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 25 ? `${words.slice(0, 25).join(' ')}...` : description;
  };

  return (
    <div style={{ backgroundColor: '#ffeded' }}>
      <Navbar />
      <div className="text-center text-gray-500 my-8">
        <p className="text-5xl font-bold mb-4">Welcome to Beer Finder!</p>
        <p>Explore a variety of beers and find your favorites.</p>
      </div>
      <div className="container mx-auto place-content-center px-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for beers..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded mb-4"
          style={{ backgroundColor: '#fff9f9', color: '#3c3c3c' }}
        />
        {/* Display Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(filteredProducts.length > 0 ? filteredProducts : product).map((item) => (
            (<ProductCard key={item.id} truncateDescription={truncateDescription} item={item} />)
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ item, truncateDescription }) => (
  <Link key={item.id} to={`/product/${item.id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-full transition duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="relative overflow-hidden h-64">
        {/* Skeleton for image */}
        <div className="w-full h-full object-contain bg-gray-200 rounded animate-pulse"></div>
        <img
          className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition duration-300"
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          onLoad={(event) => {
            event.target.classList.add("opacity-100");
          }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-opacity-50">
          <div className="text-center text-white ">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-lg">{item.tagline}</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
      {item.description ? (
          <p className="text-gray-700 text-base">{truncateDescription(item.description)}</p>
        ) : (
          <Skeleton count={10} />
        )}
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {item.abv}% ABV
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {item.ibu} IBU
        </span>
      </div>
    </div>
  </Link>
);


export default Home;
