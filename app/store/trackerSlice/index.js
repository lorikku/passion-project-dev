import { createSlice } from '@reduxjs/toolkit';

//Initial state is an empty array which will contain objects with accelerometer data
const initialState = {
  activeTracker: undefined,
  acceleroData: [],
};

/* Defining trackerSlice with reducer functions for adding 
accelerometer results to store */
export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    toggleTracker: (state, action) => {
      state.activeTracker = action.payload;
    },
    addTrackerData: (state, action) => {
      state.acceleroData.push(action.payload);
    },
    purgeTrackerData: (state) => {
      state.acceleroData = [];
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
