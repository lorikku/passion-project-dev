import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addDiaryEntry: (state, action) => {
      //"Entry" model structure
      state.push({
        trackerName: action.payload,
        audioUri: undefined,
        analysisData: [],
        availible: false,
        remAmount: 0
      });
    },
    makeEntryAvailible: (state, action) => {
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
      const { trackerName, elapsedTime, deviation } = action.payload;
      const entry = state.find((entry) => entry.trackerName === trackerName);
      if (entry) {
        entry.analysisData.push({
          deviation,
          elapsedTime,
          rem: false
        });
      }
    },
    reportRemToEntry: (state, action) => {
      const trackerName = action.payload;
      const entry = state.find((entry) => entry.trackerName === trackerName);
      if(entry) {
        //Increase amount of REMS detected by 1
        entry.remAmount++;
        //Set REM value of last analysis made to true
        entry.analysisData[entry.analysisData.length - 1].rem = true;
      }
    }
  },
});

//Export reducer functions to use it in dispatch in components
export const { addDiaryEntry, deleteDiaryEntry, addAnalysisDataToEntry, makeEntryAvailible, reportRemToEntry } = diarySlice.actions;

//Select diary query to read data from diary state
export const selectDiary = (store) => store.diary;

//Export reducer to import in store
export default diarySlice.reducer;
