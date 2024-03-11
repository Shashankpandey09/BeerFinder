import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Random = () => {
  const { randomBeers } = useSelector((store) => store.beer);

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 25 ? `${words.slice(0, 25).join(' ')}...` : description;
  };

  return (
    <>
      {randomBeers.map((item) => (
        <Link key={item.id} to={`/product/${item.id}`}>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-full transition duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="relative overflow-hidden h-64">
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
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {item.abv}% ABV
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {item.ibu} IBU
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Random;
