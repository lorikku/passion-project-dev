import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import RealityCheckScreen from '../screens/reality-check';
import SleepScreen from '../screens/sleep';
import DiaryScreen from '../screens/diary';

import { Keyboard, Platform, Text } from 'react-native';

import globalStyles from '../styles';
import { useSelector } from 'react-redux';
import { selectUi } from '../store/uiSlice';

import RealityCheckNav from '../components/svg/nav/RealityCheckNav';
import SleepNav from '../components/svg/nav/SleepNav';
import DiaryNav from '../components/svg/nav/DiaryNav';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'SleepScreen';

export default function BottomTabNavigator() {
  const ui = useSelector(selectUi);
  //Hide bottom navigation on keyboard show and vice versa
  const [visibleNav, setNavVisible] = React.useState(true);
  React.useEffect(() => {
    Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => setNavVisible(false)
    );
    Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => setNavVisible(true)
    );
  }, []);

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: {
          opacity: !visibleNav || ui.fullScreen ? 0 : 1,
          paddingTop: !visibleNav || ui.fullScreen ? 0 : 40,
          height: !visibleNav || ui.fullScreen ? 0 : 90,
          paddingBottom:
            !visibleNav || ui.fullScreen
              ? 0
              : Platform.OS === 'android'
              ? 30
              : 70,
          backgroundColor:
            !visibleNav || ui.fullScreen
              ? 'transparent'
              : globalStyles.color.background,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name="RealityCheckScreen"
        component={RealityCheckScreen}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('RealityCheckScreen');
          },
        })}
        options={{
          title: 'Reality Check',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <RealityCheckNav focused={focused} />,
        }}
      />
      <BottomTab.Screen
        name="SleepScreen"
        component={SleepScreen}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('SleepScreen');
          },
        })}
        options={{
          title: 'Sleep',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <SleepNav focused={focused} />,
        }}
      />
      <BottomTab.Screen
        name="DiaryScreen"
        component={DiaryScreen}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('DiaryScreen');
          },
        })}
        options={{
          title: 'Diary',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <DiaryNav focused={focused} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
