import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import HomeScreen from '../screens/home';
import ExampleScreen from '../screens/example';

import { Text, Keyboard } from 'react-native';

import globalStyles from '../styles';
import { useSelector } from 'react-redux';
import { selectUi } from '../store/uiSlice';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  const ui = useSelector(selectUi);
  //Hide bottom navigation on keyboard show and vice versa
  const [visibleNav, setNavVisible] = React.useState(true);
  Keyboard.addListener('keyboardWillShow', () => setNavVisible(false));
  Keyboard.addListener('keyboardWillHide', () => setNavVisible(true));

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: {
          opacity: !visibleNav || !ui.visibleNav ? 0 : 1,
          paddingTop: !visibleNav || !ui.visibleNav ? 0 : 10,
          height: !visibleNav || !ui.visibleNav ? 0 : 90,
          paddingBottom: !visibleNav || !ui.visibleNav ? 0 : 30,
          backgroundColor: globalStyles.color.background,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
      }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Home');
          },
        })}
        options={{
          title: 'Home',
          tabBarLabel: ({ focused }) => <Text>Home</Text>,
        }}
      />
      <BottomTab.Screen
        name="Example"
        component={ExampleScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Example');
          },
        })}
        options={{
          title: 'Example',
          tabBarLabel: ({ focused }) => <Text>Example</Text>,
        }}
      />
    </BottomTab.Navigator>
  );
}
