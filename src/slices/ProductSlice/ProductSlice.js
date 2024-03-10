import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
const url = 'https://api.punkapi.com/v2/beers'

const initialState = {
  product: [],
  status: 'idle',
}

export const getDetails = createAsyncThunk('beer/fetchData', async () => {
  try {
    const res = await axios(url)
    const detail = res.data // Adjust this line based on the actual structure
    console.log(detail)
    return detail
  } catch (error) {
    console.log(error.response)

    throw error
  }
})

export const BeerSlice = createSlice({
  name: 'singlePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.fulfilled, (state, action) => {
        state.status = 'successful'
        state.product = action.payload
        console.log(state.product)
      })
      .addCase(getDetails.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message // Set error message on failure
      })
  },
})

export default BeerSlice.reducer
