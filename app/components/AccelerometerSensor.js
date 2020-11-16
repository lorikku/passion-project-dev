import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useDispatch } from 'react-redux';
import { addData } from '../store/trackerSlice';

Accelerometer.setUpdateInterval(1000);

export default function AccelerometerSensor() {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const accelSub = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
      dispatch(addData(data));
    });

    if (accelSub) {
      return function cleanup() {
        accelSub.remove();
      };
    }
  });

  let { x, y, z } = data;
  return (
    <View style={styles.sensor}>
      <Text style={styles.text}>
        Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
      </Text>
      <Text style={styles.text}>
        x: {x} y: {y} z: {z}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});
