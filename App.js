import React, { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ---- Navigation----
import RNBootSplash from 'react-native-bootsplash';

// ---- Navigation----
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ---- Firebase ----
import auth from '@react-native-firebase/auth';

// ---- Redux ----
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

// ---- Screens----
import LoginScreen from './src/screens/login';
import BottomMenuScreen from './src/components/BottomMenu';
import { initializeRemoteConfig } from './src/api/remoteConfig';
import { configureGoogleSignin } from './src/api/googleSignIn';

const Stack = createStackNavigator();

export default function App() {
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    configureGoogleSignin();

    const init = async () => {
      auth().onAuthStateChanged((user) => {
        setLogged(user);
      });
    };
    init().finally(async () => {
      // await RNBootSplash.hide({ fade: true });
      if (Platform.OS === 'android') {
        setTimeout(() => RNBootSplash.hide({ fade: true }), 600);
      }
    });

    initializeRemoteConfig();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor='transparent'
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            {logged ? (
              <Stack.Navigator initialRouteName='BottomMenu'>
                <Stack.Screen
                  name='BottomMenu'
                  component={BottomMenuScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
                  name='Login'
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
