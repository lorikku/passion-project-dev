import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  scheduleNotificationAsync,
  cancelScheduledNotificationAsync,
} from 'expo-notifications';

//Notifications titles that will be displayed (gets chosen at random)
const titles = ['Are you dreaming?', 'Reality check!', 'Is this reality?'];

//Notification triggers based off of selected frequency
const triggers = {
  low: {
    seconds: 5 * 60, //5 minutes
  },
  medium: {
    seconds: 2 * 60, //2 minutes
  },
  high: {
    seconds: 5,
  },
};

/* Async function possible with Redux Thunk middleware. This makes it possible to dispatch async functions as 'payload creators', 
which will then dispatch action types based off of the status of the async function (pending | fulfilled | rejected) */
export const addRealityCheckThunk = createAsyncThunk(
  'checker/addRealityCheckAsync',
  async (input) => {
    const { body, freq } = input;

    //Content extracted from input, shown in notification
    const content = {
      title: titles[Math.floor(Math.random() * titles.length)],
      body,
    };

    //Trigger settings for notification
    const trigger = {
      ...triggers[freq],
      repeats: true,
    };

    //Scheduling notification and extracting notification identifier as "id"
    const id = await scheduleNotificationAsync({
      content,
      trigger,
    });

    //This is the 'payload creator', returns the payload for the action
    return {
      id,
      content,
      freq,
      active: true,
    };
  }
);

export const toggleRealityCheckThunk = createAsyncThunk(
  'checker/toggleRealityCheckAsync',
  async (check) => {
    const { id, content, freq, active } = check;

    if (active) {
      //If check was active, cancel notifications
      await cancelScheduledNotificationAsync(id);
    } else {
      //If check was unactive, enable notification again (using same id)
      const trigger = {
        ...triggers[freq],
        repeats: true,
      };

      await scheduleNotificationAsync({
        identifier: id,
        content,
        trigger,
      });
    }

    return id;
  }
);

export const deleteRealityCheckThunk = createAsyncThunk(
  'checker/deleteRealityCheckAsync',
  async (check) => {
    const { id, active } = check;

    if (active) {
      //If check was active, cancel notifications
      await cancelScheduledNotificationAsync(id);
    }

    return id;
  }
);
