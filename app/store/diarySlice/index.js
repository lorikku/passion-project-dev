import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addDiaryEntry: (state, action) => {
      state.push({
        trackerName: action.payload,
        audioUri: undefined,
        analysisData: [],
        availible: false
      });
    },
    makeDiaryAvailible: (state, action) => {
      const entry = state.find((entry) => entry.trackerName === action.payload);
      if (entry) {
        entry.availible = true;
      }
    },
    deleteDiaryEntry: (state, action) => {
      const index = state.findIndex(
        (entry) => entry.trackerName === action.payload
      );
      if (index !== -1) {
        state.splice(index, index + 1);
      }
    },
    //Add analysis data to diary entry for generating graph later on
    addAnalysisDataToEntry: (state, action) => {
      const { trackerName, timestamp, analysisData } = action.payload;
      const entry = state.find((entry) => entry.trackerName === trackerName);
      if (entry) {
        entry.analysisData.push({
          data: analysisData,
          timestamp,
        });
      }
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const { addDiaryEntry, deleteDiaryEntry, addAnalysisDataToEntry, makeDiaryAvailible } = diarySlice.actions;

//Select diary query to read data from diary state
export const selectDiary = (store) => store.diary;

//Export reducer to import in store
export default diarySlice.reducer;
