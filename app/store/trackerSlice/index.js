import { createSlice } from '@reduxjs/toolkit';
import trackerToolsRedux from '../trackerToolsRedux';

//Initial state is an empty array which will contain objects with accelerometer data
const initialState = {
  activeTracker: undefined,
  data: [],
};

/* Defining trackerSlice with reducer functions for adding 
accelerometer results to store */
export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    toggleTracker: (state) => {
      if (state.activeTracker) {
        state.activeTracker = undefined;
      } else {
        state.activeTracker = trackerToolsRedux.generateFileName();
        console.log(state.activeTracker);
      }
    },
    addTrackerData: (state, action) => {
      state.data.push(action.payload);
    },
    purgeTrackerData: (state) => {
      state.data = [];
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const {
  toggleTracker,
  addTrackerData,
  purgeTrackerData,
} = trackerSlice.actions;

//Select tracker query to read data from tracker state
export const selectTracker = (store) => store.tracker;

//Export reducer to import in store
export default trackerSlice.reducer;
