import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addDiaryEntry: (state, action) => {
      //"Entry" model structure
      state.unshift({
        trackerName: action.payload,
        audioUri: undefined,
        analysisData: [],
        availible: false,
        remAmount: 0,
      });
    },
    setEntryAudioUri: (state, action) => {
      const {trackerName, audioUri} = action.payload;
      const entry = state.find((entry) => entry.trackerName === trackerName);
      if (entry) {
        entry.audioUri = audioUri;
      }
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
        state.splice(index, 1);
      }
    },
    //Add analysis data to diary entry for generating graph later on
    addAnalysisDataToEntry: (state, action) => {
      const { elapsedTime, deviation } = action.payload;
      state[0].analysisData.push({
        deviation,
        elapsedTime,
        rem: false,
      });
    },
    reportRemToEntry: (state, action) => {
      const trackerName = action.payload;
      const entry = state.find((entry) => entry.trackerName === trackerName);
      if (entry) {
        //Increase amount of REMS detected by 1
        entry.remAmount++;
        //Set REM value of last analysis made to true
        entry.analysisData[entry.analysisData.length - 1].rem = true;
      }
    },
    purgeDiary: (state) => {
      state.length = 0;
      console.log('diary purged');
    },
  },
});

//Export reducer functions to use it in dispatch in components
export const {
  addDiaryEntry,
  deleteDiaryEntry,
  addAnalysisDataToEntry,
  makeEntryAvailible,
  reportRemToEntry,
  purgeDiary,
} = diarySlice.actions;

//Select diary query to read data from diary state
export const selectDiary = (store) => store.diary;

//Export reducer to import in store
export default diarySlice.reducer;
