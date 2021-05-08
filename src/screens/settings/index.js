import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from './settings';

import { saveSettings } from '../../api/firestore';
import styles from './style';

const Stack = createStackNavigator();

const SettingsStack = () => {
  const settingsState = useSelector(
    (state) => state.setting.settings,
  ); // state is the same as store

  const [settings, setSettings] = useState(settingsState);

  const handlePress = () => {
    saveSettings(settings);
  };

  useEffect(() => {
    setSettings(settingsState);
  }, [settingsState]);

  useFocusEffect(
    useCallback(() => setSettings(settingsState), [settingsState]),
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Settings'
        options={{
          headerTitle: 'Settings',
          headerRight: () => (
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.headerRightButton}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      >
        {() => (
          <SettingsScreen
            settings={settings}
            setSettings={setSettings}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SettingsStack;
