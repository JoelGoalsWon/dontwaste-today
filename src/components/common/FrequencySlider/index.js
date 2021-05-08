import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import Slider from '@react-native-community/slider';
import { colors } from '../../../api/constants';
import styles from './style';

const FrequencySlider = ({ settings, setSettings }) => {
  // const [frequency, setFrequency] = useState(2); // Retrieve from firebase/local
  const [frequencyText, setFrequencyText] = useState(false);

  const onSliderValueChange = (selectedFrequency) => {
    const currentFrequency = selectedFrequency || settings.frequency;
    setSettings({ ...settings, frequency: currentFrequency });
  };

  useEffect(() => {
    if (settings.frequency === 1) {
      setFrequencyText('Every few hours');
    } else if (settings.frequency === 2) {
      setFrequencyText('Every hour or so');
    } else {
      setFrequencyText('Few times an hour');
    }
  }, [settings.frequency]);

  return (
    <>
      <View style={styles.viewStyle}>
        <Text>{frequencyText}</Text>
      </View>
      <Slider
        style={styles.sliderStyle}
        minimumValue={1}
        maximumValue={3}
        step={1}
        value={settings.frequency}
        onValueChange={onSliderValueChange}
        minimumTrackTintColor='gray'
        maximumTrackTintColor='gray'
        thumbTintColor={colors.primary}
      />
    </>
  );
};

export default FrequencySlider;
