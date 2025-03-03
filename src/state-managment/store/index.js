import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../slices/issuesSlice';
import usersReducer from '../slices/usersSlice';
import authUserInfoSlice from '../slices/authUserInfoSlice';

export const store = configureStore({
    reducer: {
        issues: issuesReducer,
        users: usersReducer,
        authInfo: authUserInfoSlice
    }
});

