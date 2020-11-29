import { createSlice } from '@reduxjs/toolkit';


//Initial state is an empty array which will contain objects with accelerometer data
const initialState = {
  activeTracker: false,
  data: [],
};

/* Defining trackerSlice with reducer functions for adding 
accelerometer results to store */
export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    toggleTracker: (state) => {
      state.activeTracker = !state.activeTracker;
    },
    addTrackerData: (state, action) => {
      state.data.push({
        ...action.payload,
      });
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const { toggleTracker, addTrackerData } = trackerSlice.actions;

//Select tracker query to read data from tracker state
export const selectTracker = (store) => store.tracker;

//Export reducer to import in store
export default trackerSlice.reducer;
