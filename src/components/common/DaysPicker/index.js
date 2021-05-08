import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';
import { colors } from '../../../api/constants';

const DaysPicker = ({ settings, setSettings }) => {
  const handlePress = (itemPressed) => {
    //  TODO validate if at  least 1 day is selected  on availableDays
    const newSettings = {
      ...settings,
      availableDays: settings.availableDays.map((el) => {
        if (el.id === itemPressed.id) {
          return { ...el, isSelected: !el.isSelected };
        }
        return el;
      }),
    };
    setSettings(newSettings);
  };

  return settings.availableDays.map((item) => (
    <TouchableOpacity
      style={styles.touchableOpacityStyle}
      onPress={() => handlePress(item)}
      key={item.id}
    >
      <Text style={styles.sectionListItemStyle}>{item.value}</Text>
      {item.isSelected && (
        <Ionicons
          style={styles.ioniconsStyle}
          name='checkmark'
          color={colors.primary}
          size={20}
        />
      )}
    </TouchableOpacity>
  ));
};

export default DaysPicker;
