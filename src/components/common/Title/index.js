import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const Title = ({ title, subtitle }) => (
  <View style={styles.container}>
    {title && <Text style={styles.titleText}>{title}</Text>}
    {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
  </View>
);

export default Title;
