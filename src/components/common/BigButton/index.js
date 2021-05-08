import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../../../api/constants';
import styles from './style';

const BigButton = ({
  text,
  emoji,
  onPress,
  isNotProcrastinating,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      {
        backgroundColor: isNotProcrastinating
          ? colors.secondary
          : colors.primary,
      },
    ]}
    onPress={onPress}
  >
    <Text style={styles.buttonEmoji}>{emoji}</Text>
    <Text
      style={[
        styles.buttonText,
        { color: isNotProcrastinating ? colors.dark : colors.light },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

export default BigButton;
