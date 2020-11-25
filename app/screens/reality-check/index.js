import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import RealityCheck from './RealityCheck';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="RealityCheck"
        component={RealityCheck}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
