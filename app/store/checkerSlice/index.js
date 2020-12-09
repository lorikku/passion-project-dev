import { createSlice } from '@reduxjs/toolkit';
//Importing async thunks from other file
import {
  addRealityCheckThunk,
  toggleRealityCheckThunk,
  deleteRealityCheckThunk,
} from './asyncThunks';

/* SLICE CREATOR */
//Initial state is an empty array which will contain objects with notification data
const initialState = [];

/* Defining checkerSlice with reducer functions for adding 
currently scheduled notifications to store */
export const checkerSlice = createSlice({
  name: 'checker',
  initialState,
  extraReducers: {
    [addRealityCheckThunk.fulfilled]: (state, action) => {
      //"Reality check" model structure
      //Looks like useless destructuring, did it to show the model structure
      const { id, content, freq, active } = action.payload;
      state.unshift({ id, content, freq, active });
    },
    [toggleRealityCheckThunk.fulfilled]: (state, action) => {
      const check = state.find((el) => el.id === action.payload);
      if (check) {
        check.active = !check.active;
      }
    },
    [deleteRealityCheckThunk.fulfilled]: (state, action) => {
      const index = state.findIndex((check) => check.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

/* EXPORTS */
//Export thunk thunk functions with normalized names
export {
  addRealityCheckThunk as addRealityCheckAsync,
  toggleRealityCheckThunk as toggleRealityCheckAsync,
  deleteRealityCheckThunk as deleteRealityCheckAsync,
};

//Export select checker query to read data from checker state
export const selectChecker = (store) => store.checker;

//Export reducer to import in store
export default checkerSlice.reducer;
