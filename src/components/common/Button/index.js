import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './style';

const Button = ({ text, color, fontColor, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles(color, fontColor).button}>
      <Text style={styles(color, fontColor).buttonText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;
