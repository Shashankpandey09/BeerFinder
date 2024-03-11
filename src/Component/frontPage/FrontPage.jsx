import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const FrontPage = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateX(-10px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 1000 }, // Adjust the duration as needed
  });

  return (
    <div className="h-screen relative flex flex-col items-center bg-gray-200 justify-center ">
     
      <div className="self-center pt-11 pr-2 z-2 text-center absolute">
        <animated.h1
          className="text-4xl inline-block text-violet-600 mb-4 lg:text-5xl"
          style={fadeIn}
          loading='lazy'
        >
          Discover Your Favorite Beer
          <img
        src="/beer.png"
        alt="beer"
        className="w-full h-[200px] inline object-contain"/>
        </animated.h1>
        <animated.p className="text-purple-400 text-lg mb-8 lg:text-xl" style={fadeIn}>
          Explore a variety of beers and find your perfect match.
        </animated.p>
        <Link to="/Home">
          <animated.button
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-yellow-400"
            style={fadeIn}
          >
            Find Yours Now
          </animated.button>

        </Link>
     
      </div>
    </div>
  );
};

export default FrontPage;
