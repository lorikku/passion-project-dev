import { createSlice, nanoid } from '@reduxjs/toolkit';

//Initial state is an empty array which will contain objects with accelerometer data
const initialState = {
  visibleNav: false,
};

/* Defining uiSlice with reducer functions for adding 
accelerometer results to store */
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.visibleNav = !state.visibleNav;
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const { toggleNav } = uiSlice.actions;

//Select tracker query to read data from tracker state
export const selectUi = (store) => store.ui;

//Export reducer to import in store
export default uiSlice.reducer;
