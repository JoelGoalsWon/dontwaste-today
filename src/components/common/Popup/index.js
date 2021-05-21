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

export default ({ dismissHandler, screen }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [isPopupEnabled, setIsPopupEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTitle(getRemoteValue('bottom_popup_title').asString());
    setText(getRemoteValue('bottom_popup_text').asString());
    setImage(getRemoteValue('bottom_popup_image').asString());
    setLink(getRemoteValue('bottom_popup_link').asString());
    setIsPopupEnabled(
      getRemoteValue('bottom_popup_enabled').asBoolean(),
    );
  }, []);

  const tapHandler = async () => {
    Linking.openURL(link);
    dismissHandler();
    logPopupTap(screen, title, text, image); // TODO await should go here?
  };

  return isPopupEnabled ? (
    <TouchableOpacity
      style={[styles.container, { bottom: isLoaded ? 20 : -200 }]}
      onPress={tapHandler}
    >
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
        onLoadStart={() => setIsLoaded(false)}
        onLoadEnd={() => setIsLoaded(true)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{text}</Text>
      </View>
      <Text style={styles.dismissButton} onPress={dismissHandler}>
        &#215;
      </Text>
    </TouchableOpacity>
  ) : (
    <></>
  );
};
