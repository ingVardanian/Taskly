import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../reducers/issuesSlice';

export const store = configureStore({
    reducer: {
        issues: issuesReducer
    }
});

