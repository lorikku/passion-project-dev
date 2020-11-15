import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccelerometerSensor from './components/AccelerometerSensor';
import TaskManagerExample from './components/TaskManagerExample';

export default function App() {
  // const [timer, setTimer] = useState(0);
  // const [test, setTest] = useState(false);

  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     setTimer(timer + 1);
  //     console.log(test);
  //     setTest(!test);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  return (
    <View style={styles.container}>
      {/* <TaskManagerExample /> */}
      <AccelerometerSensor />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
