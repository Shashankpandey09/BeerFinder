import { configureStore } from "@reduxjs/toolkit";
import BeerReducer from './src/slices/ProductSlice/ProductSlice';

export const store = configureStore({
  reducer: {
    beer: BeerReducer
  }
});
