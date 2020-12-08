import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Diary from './Diary';
import DiaryDetail from './DiaryDetail';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Diary"
        component={Diary}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="DiaryDetail"
        component={DiaryDetail}
        options={{
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
