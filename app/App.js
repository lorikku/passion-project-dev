import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';

import { Provider } from 'react-redux';
import store from './store';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import globalStyles from './styles';

const Stack = createStackNavigator();

export default function App(props) {
  /* Stuff added by EXPO*/
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // // Load fonts
        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
        //   'lato-semi': require('./assets/fonts/Lato-Bold.ttf'),
        // });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.statusBar}>
          <StatusBar translucent style="inverted" />
        </View>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.Os == 'ios' ? 'padding' : 'height'}
        >
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    paddingTop: Platform.OS === 'android' ? 28 : 0,
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 40 : 0,
    zIndex: 99,
  },
});
