import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc, db, onAuthStateChanged, auth } from '../../services/firebase/firebase';

const initialState = {
  authUserInfo: {
    isAuth: false,
    userProfileInfo: {}
  },
  error: null,
  loading: false
}

export const fetchUserProfileInfo = createAsyncThunk('data/fetchUserProfileInfo', async (action) => {
 return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const { uid } = user;
        const ref = doc(db, 'registerUsers', uid);
        getDoc(ref).then((userData) => {
          if (userData.exists()) {
            resolve(userData.data())
          } else {
            resolve(null);
          }
        })
      } else {
        reject('Oppps !');
      }
    })
  })
});

export const authUserInfoSlice = createSlice({
  name: 'userProfileInfo',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      console.log(action, '>>>>')
      state.authUserInfo.isAuth = action.payload;
    }
  },

  extraReducers: (promise) => {
    promise
      .addCase(fetchUserProfileInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserProfileInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.authUserInfo.isAuth = true;
          state.authUserInfo.userProfileInfo = action.payload;
        } else {
          state.authUserInfo.isAuth = false;
          state.authUserInfo.userProfileInfo = {}
        }
      })
      .addCase(fetchUserProfileInfo.rejected, (state) => {
        state.loading = false;
        state.authUserInfo.isAuth = false;
        state.authUserInfo.userProfileInfo = {}
      })
  }
});

export const { setIsAuth } = authUserInfoSlice.actions;
export default authUserInfoSlice.reducer;