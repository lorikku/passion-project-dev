import { createSlice, nanoid } from '@reduxjs/toolkit';

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
    toggleTracker: (state, action) => {
      state.activeTracker = action.payload;
    },
    addAccelData: (state, action) => {
      state.data.push({
        id: nanoid(),
        ...action.payload,
      });
      console.log(action.payload.x);
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const { toggleTracker, addAccelData } = trackerSlice.actions;

//Select tracker query to read data from tracker state
export const selectTracker = (store) => store.tracker;

//Export reducer to import in store
export default trackerSlice.reducer;
