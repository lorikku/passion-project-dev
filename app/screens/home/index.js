import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Intro from './Intro';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
