import { createSlice } from '@reduxjs/toolkit';
//Importing async thunks from other file
import {addRealityCheckThunk, toggleRealityCheckThunk} from './asyncThunks'

/* SLICE CREATOR */
//Initial state is an empty array which will contain objects with notification data
const initialState = [];

/* Defining checkerSlice with reducer functions for adding 
currently scheduled notifications to store */
export const checkerSlice = createSlice({
  name: 'checker',
  initialState,
  reducers: {
    deleteCheckerById: (state, action) => {
      const index = state.findIndex((_, index) => index === action.payload);
      if(index !== -1) {
        state.splice(index, index + 1);
      }
    }
  },
  extraReducers: {
    [addRealityCheckThunk.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [toggleRealityCheckThunk.fulfilled]: (state, action) => {
      const check = state.find((el) => el.id === action.payload);
      if(check){
        check.active = !check.active;
      }
    },
  }
});

/* EXPORTS */
//Export reducer functions to use it in dispatch in components
export const { deleteCheckerById } = checkerSlice.actions;

//Export thunk thunk functions with normalized names
export {addRealityCheckThunk as addRealityCheck, toggleRealityCheckThunk as toggleRealityCheck};

//Export select checker query to read data from checker state
export const selectChecker = (store) => store.checker;

//Export reducer to import in store
export default checkerSlice.reducer;
