import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';

import { Provider } from 'react-redux';
import {store, persistor} from './store/store';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import * as Font from 'expo-font';
import globalStyles from './styles';

import {setNotificationHandler} from 'expo-notifications';
import {PersistGate} from 'redux-persist/integration/react';
//Basic notification handler which gets called whenever a new notification is about to be triggered (while app is in foreground)
setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

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

        // Load fonts
        await Font.loadAsync({
          sfProRoundedBold: require('./assets/fonts/SF-Pro-Rounded-Bold.ttf'),
          sfProRoundedRegular: require('./assets/fonts/SF-Pro-Rounded-Regular.ttf'),
          sfProCompactRegular: require('./assets/fonts/SF-Compact-Rounded-Regular.otf'),
        });
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
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.statusBar}>
            <StatusBar
              translucent
              style="inverted"
              backgroundColor={'transparent'}
            />
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
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  statusBar: {
    zIndex: 99,
  },
});
