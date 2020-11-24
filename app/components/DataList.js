import * as React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTracker } from '../store/trackerSlice';

export default function DataList() {
  const data = useSelector(selectTracker);
  return (
    <View>
      <Text>Accelerometer data (per second):</Text>
      {data.map((el) => (
        <Text key={el.id}>{`${el.x}`}</Text>
      ))}
    </View>
  );
}
