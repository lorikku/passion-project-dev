import { createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

//Async thunk for setting audio uri/moving
export const setEntryAudioUriThunk = createAsyncThunk(
  'diary/setEntryAudioUriThunk',
  async ({ trackerName, oldAudioUri, newCacheUri }) => {
    console.log('thunk started');
    //Initializing neecessary variables
    let newDocumentUri = newCacheUri; // !!!!!!!!! SET BACK TO UNDEFINED IF YOU WANT THE MOVING TO WORK TOO !!!!!!!!!
    const directoryUri = FileSystem.documentDirectory + 'Audio/';
    const infoOptions = { md5: false, size: false };

    //Check if current audio exists, if it does, delete it
    if (oldAudioUri) {
      const fileStatus = await FileSystem.getInfoAsync(
        oldAudioUri,
        infoOptions
      );
      fileStatus.exists && (await FileSystem.deleteAsync(oldAudioUri));
      console.log('previous audio got deleted from document!');
    }

    /* DISABLED MOVING FROM CACHE TO DOCUMENT BECAUSE IT DOESN'T WORK AT THE MOMENT (probably permissions issue) */
    //If a new audio was succesfully recored and stored in the cache storage, save it in document (aka permanent) storage
    if (false) {
      //Extract the audio file name from newCacheUri
      const fileNameArr = newCacheUri.split('/');
      const fileNameUri = fileNameArr[fileNameArr.length - 1];

      //Check if "audioRecordings" directory exists in document storage, make one if it doesn't
      const directoryStatus = await FileSystem.getInfoAsync(
        directoryUri,
        infoOptions
      );
      !directoryStatus.exists &&
        (await FileSystem.makeDirectoryAsync(directoryUri));

      //Move audio from cache directory to document (permanent) directory
      await FileSystem.moveAsync({ from: newCacheUri, to: directoryUri });
      newDocumentUri = directoryUri + fileNameUri;
      console.log('new audio moved to document!');
    }

    //This is the 'payload creator', returns the payload for the action
    return {
      trackerName,
      newDocumentUri,
    };
  }
);
