import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet , View } from 'react-native';
import Sensor from './components/AccelerometerSensor';

export default function App() {
  return (
    <View style={styles.container}>
      <Sensor />
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
