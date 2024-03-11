import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Beers from '../../Beers/Beer'
import Navbar from '../../navbar/Navbar';

const Home = () => {
  const { randomBeers } = useSelector((store) => store.beer);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar />
   
      <Beers />
    </div>
  );
};

export default Home;
