import React from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Title from '../../components/common/Title';
import BigButton from '../../components/common/BigButton';
import styles from './style';
import { colors, reasons } from '../../api/constants';

import { addAnswer } from '../../api/firestore';
import { scheduleQuestionLocalNotification } from '../../api/notifications';

import { firstAnswerAfterFirstNotification } from '../../api/analytics'; // Funnel

const Question = ({ navigation }) => {
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
    navigation.navigate('Results');
  };

  return (
    <SafeAreaView
      style={styles.safeAreaQuestion}
      forceInset={{ top: 'always' }}
    >
      <Title title='Procrastinating now?' subtitle='If yes, why?' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        <View style={styles.viewFourButtons}>
          <View>
            <BigButton
              text={reasons[0]}
              emoji='😰'
              onPress={() => onAddAnswer(reasons[0])}
            />
            <BigButton
              text={reasons[1]}
              emoji='😔'
              onPress={() => onAddAnswer(reasons[1])}
            />
          </View>
          <View>
            <BigButton
              text={reasons[2]}
              emoji='🙃'
              onPress={() => onAddAnswer(reasons[2])}
            />
            <BigButton
              text={reasons[3]}
              emoji='🥵'
              onPress={() => onAddAnswer(reasons[3])}
            />
          </View>
        </View>
        <View style={styles.viewFourButtons}>
          <View>
            <BigButton
              text='Something else'
              emoji='💬'
              onPress={() => navigation.navigate('More Reasons')}
            />
          </View>
          <View>
            <BigButton
              text='Not procrastinating'
              emoji='😎'
              onPress={() => onAddAnswer('Is not procrastinating')}
              color={colors.secondary}
              isNotProcrastinating
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

Question.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Question;
