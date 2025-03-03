import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection, db } from '../../services/firebase/firebase';

const initialState = {
  users: [],
  loading: false,
  error: null
}

export const fetchUsersData = createAsyncThunk('data/fetchUsersData', async () => {
  const queryData = await getDocs(collection(db, 'registerUsers'));
  return queryData.docs.map((doc) => {
    const { firstName, lastName } = doc.data();
    return {label: `${firstName} ${lastName}`, value: doc.id}
  });
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (promise) => {
    promise
      .addCase(fetchUsersData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload
      })
  }
})


export default usersSlice.reducer;



