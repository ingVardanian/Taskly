import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null
}


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (promise) => {

  }
})