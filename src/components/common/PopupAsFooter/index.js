import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  Image,
  View,
} from 'react-native';

import styles from './style';
import { getRemoteValue } from '../../../api/remoteConfig';
import { logPopupTap } from '../../../api/analytics';

export default ({ screen, link }) => {
  const [isPopupEnabled, setIsPopupEnabled] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    setIsPopupEnabled(
      getRemoteValue('bottom_popup_enabled').asBoolean(),
    );
    setImage(getRemoteValue('bottom_popup_image').asString());
  }, []);

  const tapHandler = async () => {
    Linking.openURL(link);
    logPopupTap(screen, image); // TODO await should go here?
  };

  return isPopupEnabled ? (
    <TouchableOpacity style={styles.container} onPress={tapHandler}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Want an accountability coach?
        </Text>
        <Text style={styles.body}>Get GoalsWon</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <></>
  );
};
