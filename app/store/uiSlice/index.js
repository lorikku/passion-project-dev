import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullScreen: true,
  firstTime: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
    disableFirstTime: (state) => {
      state.firstTime = false;
    }
  },
});

//Export reducer functions to use it in dispatch in components
export const { toggleFullScreen, disableFirstTime } = uiSlice.actions;

//Select ui query to read data from ui state
export const selectUi = (store) => store.ui;

//Export reducer to import in store
export default uiSlice.reducer;
