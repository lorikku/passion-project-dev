import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AccelerometerSensor from './components/AccelerometerSensor';
import BackgroundTaskTest from './components/BackgroundTaskTest';
import TaskManagerExample from './background-workers/TaskManagerExample';
import { Accelerometer } from 'expo-sensors';
import { Provider } from 'react-redux';
import store from './store';
import DataList from './components/DataList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
          {/* <TaskManagerExample /> */}
          <AccelerometerSensor />
          <DataList />
          {/* <BackgroundTaskTest /> */}
          <StatusBar style="auto" />
      </Provider>
    </SafeAreaView>
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
