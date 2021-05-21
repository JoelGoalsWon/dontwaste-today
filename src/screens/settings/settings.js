import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

// GOOGLE SIGN IN
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth';

import ItemSeparator from '../../components/common/ItemSeparator';
import FrequencySlider from '../../components/common/FrequencySlider';
import AndroidTimePicker from '../../components/common/AndroidTimePicker';
import IosTimePicker from '../../components/common/IosTimePicker';
import DaysPicker from '../../components/common/DaysPicker';
import styles from './style';
import { colors } from '../../api/constants';
import { cancelAllLocalNotifications } from '../../api/notifications';
import { unsubscribeAnswerActions } from '../../redux/actions/answer';
import { unsubscribeSettingsActions } from '../../redux/actions/setting';
import PopupAsFooter from '../../components/common/PopupAsFooter';

const Settings = ({ settings, setSettings }) => {
  const [showAndroid, setShowAndroid] = useState(false);
  const [showios, setShowios] = useState(false);

  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await unsubscribeAnswerActions();
      await unsubscribeSettingsActions();

      if (Platform.OS === 'ios') {
        GoogleSignin.revokeAccess();
      } else {
        await GoogleSignin.revokeAccess();
      }
      await GoogleSignin.signOut();
      cancelAllLocalNotifications();
      auth()
        .signOut()
        .catch((error) => {
          console.log(error);
        });
      dispatch(logout());
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setShowios(true);
    } else {
      setShowAndroid(true);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View>
          <Text style={styles.sectionHeader}>
            <Text style={{ fontWeight: 'bold' }}>How often</Text>{' '}
            should I ask if you are procrastinating?
          </Text>
          <FrequencySlider
            settings={settings}
            setSettings={setSettings}
          />
        </View>

        <View>
          <Text style={styles.sectionHeader}>
            At <Text style={{ fontWeight: 'bold' }}>which times</Text>{' '}
            should I send notifications?
          </Text>
          {showAndroid && (
            <AndroidTimePicker
              settings={settings}
              setSettings={setSettings}
            />
          )}
          {showios && (
            <IosTimePicker
              settings={settings}
              setSettings={setSettings}
            />
          )}
        </View>

        <View>
          <Text style={styles.sectionHeader}>
            On <Text style={{ fontWeight: 'bold' }}>which days</Text>{' '}
            should I do this?
          </Text>
          <DaysPicker settings={settings} setSettings={setSettings} />
        </View>

        <View>
          <Text style={styles.sectionHeader} />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('mailto:joel@goalswon.com')
            }
          >
            <View style={styles.row}>
              <Text>Contact developer (I reply to all messages)</Text>
              <Ionicons
                name='chevron-forward-outline'
                color='gray'
                size={20}
              />
            </View>
          </TouchableOpacity>
          <ItemSeparator />
          <TouchableOpacity onPress={signOut}>
            <View style={styles.row}>
              <Text style={{ color: colors.danger }}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>

        <PopupAsFooter
          screen='Settings'
          link='https://www.goalswon.com/?utm_source=settings&utm_medium=sideproject&utm_campaign=dwt'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
