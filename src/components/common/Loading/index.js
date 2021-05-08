import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './style';

export default function Loading() {
  return (
    <View style={styles.container}>
      {/* TODO use constant color */}
      <ActivityIndicator size='large' color='#0000ff' />
    </View>
  );
}
