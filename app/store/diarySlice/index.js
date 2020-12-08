import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addDiaryEntry: (state, action) => {
      state.push(action.payload);
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const { addDiaryEntry } = diarySlice.actions;

//Select diary query to read data from diary state
export const selectDiary = (store) => store.diary;

//Export reducer to import in store
export default diarySlice.reducer;
