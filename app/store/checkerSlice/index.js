import { createSlice } from '@reduxjs/toolkit';

//Initial state is an empty array which will contain objects with accelerometer data
const initialState = [];

/* Defining checkerSlice with reducer functions for adding 
accelerometer results to store */
export const checkerSlice = createSlice({
  name: 'checker',
  initialState,
  reducers: {
    addRealityCheck: (state, action) => {
      state.push(action.payload);
    },
    deleteCheckerById: (state, action) => {
      const index = state.findIndex((_, index) => index === action.payload);
      if(index !== -1) {
        state.splice(index, index + 1);
      }
      console.log(state);
    }
  },
});

//Export reducer functions to use it in dispatch in components
export const { addRealityCheck, deleteCheckerById } = checkerSlice.actions;

//Select checker query to read data from checker state
export const selectChecker = (store) => store.checker;

//Export reducer to import in store
export default checkerSlice.reducer;
