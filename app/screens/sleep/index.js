import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import { selectUi } from '../../store/uiSlice';

import Sleep from './Sleep';
import Intro from './Intro';

const Stack = createStackNavigator();

export default () => {
  const ui = useSelector(selectUi);
  return (
    <Stack.Navigator headerMode="none">
      {ui.firstTime ? (
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{
            gestureEnabled: false,
          }}
        />
      ) : null}
      <Stack.Screen
        name="Sleep"
        component={Sleep}
        options={{
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
