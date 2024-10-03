import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../reducers/issuesSlice';
import usersReducer from '../reducers/usersSlice';
export const store = configureStore({
    reducer: {
        issues: issuesReducer,
        users: usersReducer
    }
});

