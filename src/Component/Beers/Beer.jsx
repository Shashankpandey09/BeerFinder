import React, { lazy, useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getDetails, getRandomBeers } from '../../slices/ProductSlice/ProductSlice';

const Random = lazy(() => import('../RandomBeers/Random'));

const Beers = () => {
  const { product, randomBeers } = useSelector((store) => store.beer);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredProducts = product.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.first_brewed.includes(query)
    );
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    dispatch(getDetails());
  }, []);

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 25 ? `${words.slice(0, 25).join(' ')}...` : description;
  };

  return (
    <div>
      <div className="text-center text-gray-500 my-8">
        <p className="text-5xl font-bold mb-4">Welcome to Beer Finder!</p>
        <p>Explore a variety of beers and find your favorites.</p>
      </div>
      <div className="text-center">
        <button onClick={() => {dispatch(getRandomBeers())
        setSearchQuery('')}} className="bg-orange-200 hover:bg-orange-300 mb-2 px-4 py-2 rounded">
          Suggest me some beers
        </button>
        {randomBeers.length>0&&<button className="bg-orange-200 ml-4 hover:bg-orange-300 mb-2 px-4 py-2 rounded" onClick={()=>dispatch(getDetails())}>
          previous bears
        </button>}
        
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
          {randomBeers.length > 0&&searchQuery.length==0 ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <Random />
            </Suspense>
          ) : (
            (filteredProducts.length > 0 ? filteredProducts : product).map((item) => (
              <ProductCard key={item.id} truncateDescription={truncateDescription} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150">
    <path d="M20 25h60v100H20z" fill="#ddd" />
    <circle cx="50" cy="125" r="10" fill="#999" />
    <path d="M35 70 L 50 50 L 65 70" stroke="#333" strokeWidth="3" />
  </svg>
);

const ProductCard = ({ item, truncateDescription }) => (
  <Link to={`/product/${item.id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-full transition duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="relative overflow-hidden h-64">
        <ImageWithSkeleton src={item.image_url} alt={item.name} />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-opacity-50">
          <div className="text-center text-white ">
            <h3 className="text-xl font-semibold">{item?.name}</h3>
            <p className="text-lg">{item.tagline}</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <h3 className="text-xl font-semibold">{item?.name}</h3>
        {item.description ? (
          <p className="text-gray-700 text-base">{truncateDescription(item.description)}</p>
        ) : (
          <Skeleton count={10} />
        )}
      </div>
      <div className="px-6 py-4">
        <ProductDetailsItem label={`${item.abv}% ABV`} />
        <ProductDetailsItem label={`${item.ibu} IBU`} />
      </div>
    </div>
  </Link>
);

const ImageWithSkeleton = ({ src, alt }) => (
  <>
    <div className="w-full h-full object-contain bg-gray-200 rounded animate-pulse"></div>
    <img
      className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition duration-300"
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={(event) => {
        event.target.classList.add("opacity-100");
      }}
    />
  </>
);

const ProductDetailsItem = ({ label }) => (
  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
    {label}
  </span>
);

export default Beers;
