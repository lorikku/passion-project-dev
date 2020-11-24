import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Example from './Example';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Example"
        component={Example}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
