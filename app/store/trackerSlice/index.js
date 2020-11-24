import { createSlice, nanoid } from '@reduxjs/toolkit';

//Initial state is an empty array which will contain objects with accelerometer data
const initialState = [];

/* Defining trackerSlice with reducer functions for adding 
accelerometer results to store */
export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.push({
        id: nanoid(),
        ...action.payload,
      });
      console.log(action.payload.x);
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const { addData } = trackerSlice.actions;

//Select tracker query to read data from tracker state
export const selectTracker = (store) => store.tracker;

//Export reducer to import in store
export default trackerSlice.reducer;
