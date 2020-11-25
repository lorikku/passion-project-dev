import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from './trackerSlice';
import uiReducer from './uiSlice';

export default configureStore({
  reducer: {
    tracker: trackerReducer,
    ui: uiReducer,
  },
});
