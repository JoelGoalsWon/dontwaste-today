import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../api/constants';
import { fetchSettings } from '../redux/actions/setting';

import welcomeScreen from '../screens/settings/getStarted';
import questionScreen from '../screens/question';
import statsScreen from '../screens/stats';
import logScreen from '../screens/log';
import settingsScreen from '../screens/settings';
import releasesScreen from '../screens/releases';
import { fetchCounters, fetchHistory } from '../redux/actions/answer';
import { scheduleQuestionLocalNotification } from '../api/notifications';
import { isAppOutdated } from '../api/helper';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomMenu = ({ navigation }) => {
  const appState = useRef(AppState.currentState);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      navigation.navigate('Procrastinating?');
    }

    if (
      appState.current.match(/active/) &&
      nextAppState !== 'active'
    ) {
      scheduleQuestionLocalNotification();
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const dispatch = useDispatch();
  const isNewUser = useSelector((state) => state.auth.isNewUser);
  const [isUpdateNeeded, setIsUpdateNeeded] = useState(false);

  useEffect(() => {
    dispatch(fetchCounters());
    dispatch(fetchHistory());
    dispatch(fetchSettings());
    setIsUpdateNeeded(isAppOutdated());
  }, []);

  return isUpdateNeeded ? (
    <Stack.Navigator initialRouteName='Releases'>
      <Stack.Screen
        name='Releases'
        component={releasesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : isNewUser ? (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        name='Welcome'
        component={welcomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Tab.Navigator
      initialRouteName='Procrastinating?'
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Procrastinating?') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Results') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === 'Entries') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.disabled,
        tabStyle: { paddingTop: 4 },
        labelStyle: {
          paddingBottom: 2,
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name='Procrastinating?'
        component={questionScreen}
      />
      <Tab.Screen name='Results' component={statsScreen} />
      <Tab.Screen name='Entries' component={logScreen} />
      <Tab.Screen name='Settings' component={settingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
