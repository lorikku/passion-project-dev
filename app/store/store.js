import { configureStore } from '@reduxjs/toolkit';
import checkerSlice from './checkerSlice';
import trackerReducer from './trackerSlice';
import uiReducer from './uiSlice';

export default configureStore({
  reducer: {
    tracker: trackerReducer,
    ui: uiReducer,
    checker: checkerSlice
  },
});
