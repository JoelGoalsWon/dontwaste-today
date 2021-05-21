import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import Button from '../../components/common/Button';
import { colors, reasons } from '../../api/constants';
import { addAnswer } from '../../api/firestore';
import styles from './style';
import { scheduleQuestionLocalNotification } from '../../api/notifications';
import { firstAnswerAfterFirstNotification } from '../../api/analytics'; // Funnel

const MoreReasons = ({ navigation }) => {
  const showHiddenFeatures = useSelector(
    (state) => state.auth.showHiddenFeatures,
  );

  // Funnel
  const isFirstNotification = useSelector(
    (state) => state.auth.isFirstNotification,
  );

  const onAddAnswer = async (reason) => {
    await addAnswer(reason);
    // Funnel
    if (isFirstNotification) {
      firstAnswerAfterFirstNotification();
    }
    scheduleQuestionLocalNotification();
    navigation.navigate('Procrastinating?');
    navigation.navigate('Results');
  };

  const reasonsToDisplay = reasons.slice(4);

  return (
    <SafeAreaView style={styles.safeAreaMoreReasons}>
      <View style={styles.viewMoreReasonsStyle}>
        {showHiddenFeatures && (
          <Button
            text='On Reddit'
            color={colors.reddit}
            fontColor='white'
            onPress={() => onAddAnswer('On Reddit')}
            Ionicons={<Ionicons name='logo-reddit' color='#fff' />}
          />
        )}
        <FlatList
          style={styles.flatListMoreReasons}
          data={reasonsToDisplay}
          renderItem={({ item }) => (
            <Button
              text={item}
              color={colors.primary}
              fontColor='white'
              onPress={() => onAddAnswer(item)}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
};

MoreReasons.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MoreReasons;
