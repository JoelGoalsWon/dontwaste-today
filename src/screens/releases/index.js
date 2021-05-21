import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Platform,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';

import { appStoreUrls } from '../../api/constants';
import styles from './style';

const releases = () => {
  const handlePress = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(appStoreUrls.android);
    } else if (Platform.OS === 'ios') {
      Linking.openURL(appStoreUrls.ios);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Image
          style={styles.image}
          // eslint-disable-next-line global-require
          source={require('../../assets/icon_transparent.png')}
        />
        <Text style={styles.title}>Don&apos;t Waste Today</Text>
        <Text style={styles.title}>just got better!</Text>
        <Text style={styles.text}>Please update to continue</Text>

        <TouchableOpacity onPress={handlePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default releases;
