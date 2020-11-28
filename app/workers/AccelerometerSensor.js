import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useDispatch } from 'react-redux';
import { addAccelData } from '../store/trackerSlice';

Accelerometer.setUpdateInterval(1000);

export default function AccelerometerSensor() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const dispatch = useDispatch();
  useEffect(() => {
    const accelSub = Accelerometer.addListener((accelerometerData) => {
      console.log('data added');
      setData(accelerometerData);
      dispatch(addAccelData(data));
    });

    return () => accelSub.remove();
  });

  return null;
}
