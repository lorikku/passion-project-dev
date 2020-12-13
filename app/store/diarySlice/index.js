import { createSlice } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

import { setEntryAudioUriThunk } from './asyncThunks';

const findEntry = (state, trackerName) => {
  const entry = state.find((entry) => entry.trackerName === trackerName);
  return entry;
};

const initialState = [];

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    //Normal reducers
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
    makeEntryAvailible: (state, action) => {
      const entry = findEntry(state, action.payload);
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
      const entry = findEntry(state, trackerName);
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
  //Reducers from thunks
  extraReducers: {
    [setEntryAudioUriThunk.rejected]: (state, action) => {
      FileSystem.deleteAsync(action.meta.arg.oldAudioUri)
    },
    [setEntryAudioUriThunk.pending]: (state, action) => {
      const { trackerName } = action.meta.arg;
      const entry = findEntry(state, trackerName);
      entry.audioSaving = true;
    },
    [setEntryAudioUriThunk.fulfilled]: (state, action) => {
      const { trackerName, newDocumentUri } = action.payload;
      const entry = findEntry(state, trackerName);

      if (entry) {
        if (newDocumentUri) {
          //Change entry's audio URI to new URI
          entry.audioUri = newDocumentUri;
          entry.audioSaving = false;
          // entry.audioSaving = false;
          console.log('new file location:', entry.audioUri);
        } else {
          //If URI was undefined => audio got deleted for this entry => set undefined
          entry.audioSaving = false;
          entry.audioUri = undefined;
          console.log('audio for this entry was unset in redux');
        }
      }
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

export { setEntryAudioUriThunk as setEntryAudioUriAsyc };

//Select diary query to read data from diary state
export const selectDiary = (store) => store.diary;

//Export reducer to import in store
export default diarySlice.reducer;
