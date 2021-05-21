import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';

import FrequencySlider from '../../components/common/FrequencySlider';
import AndroidTimePicker from '../../components/common/AndroidTimePicker';
import IosTimePicker from '../../components/common/IosTimePicker';
import DaysPicker from '../../components/common/DaysPicker';
import Title from '../../components/common/Title';
import Button from '../../components/common/Button';
import { colors } from '../../api/constants';
import styles from './style';

import { saveSettings } from '../../api/firestore';
import { welcomeUser } from '../../redux/actions/auth';

// ---- Funnel ----
import { startNowTap } from '../../api/analytics';

const getStarted = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector(
    (state) => state.setting.settings,
  ); // state is the same as store
  const [modalVisible, setModalVisible] = useState(false);

  const [showAndroid, setShowAndroid] = useState(false);
  const [showios, setShowios] = useState(false);
  const [settings, setSettings] = useState(settingsState);

  const handlePress = () => {
    dispatch(welcomeUser(false));
    saveSettings(settings);
    startNowTap(); // Funnel
  };

  useEffect(() => {
    setSettings(settingsState);
  }, [settingsState]);

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
        <View style={styles.title}>
          <Title title='Final step' />
        </View>
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
            Next, <Text style={{ fontWeight: 'bold' }}>when</Text> to
            send these notifications?
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
            Finally, on{' '}
            <Text style={{ fontWeight: 'bold' }}>which days</Text>?
          </Text>
          <DaysPicker settings={settings} setSettings={setSettings} />
        </View>

        <View>
          <Button
            text='START NOW'
            color={colors.primary}
            fontColor='white'
            onPress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>

      <Modal
        animationType='fade'
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>How it works</Text>
            <Text style={styles.modalText}>
              You&rsquo;re all set for now.
            </Text>
            <Text style={styles.modalText}>
              We&rsquo;ll send you a notification later to ask if
              you&rsquo;re procrastinating.
            </Text>
            <Text style={styles.modalText}>
              Be honest when you answer!
            </Text>
            <View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handlePress();
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default getStarted;
