import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTracker, addData } from '../store/trackerSlice';

export default function DataList() {
  const dispatch = useDispatch();
  const data = useSelector(selectTracker);
  return (
    <View>
      {data.map((el) => (
        <Text key={el.id}>{`${el.x}`}</Text>
      ))}
    </View>
  );
}
