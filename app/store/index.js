import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from './trackerSlice';

export default configureStore({
  reducer: {
    tracker: trackerReducer,
  },
});
