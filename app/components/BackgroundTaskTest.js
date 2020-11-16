import { Accelerometer } from 'expo-sensors';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../store/trackerSlice';
import BackgroundTask from '../background-workers/BackgroundTask';

Accelerometer.setUpdateInterval(900);

export default function BackgroundTaskTest() {
  const dispatch = useDispatch();
  return (
    <BackgroundTask
      interval={1000}
      function={() => {
        const subAcc = Accelerometer.addListener((accelerometerData) => {
          dispatch(addData(accelerometerData));
          subAcc.remove();
        });
      }}
    />
  );
}
