import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import RealityCheck from './RealityCheck';
import RealityCheckInput from './RealityCheckInput';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="RealityCheck"
        component={RealityCheck}
        options={{
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />
       <Stack.Screen
        name="RealityCheckInput"
        component={RealityCheckInput}
        options={{
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
