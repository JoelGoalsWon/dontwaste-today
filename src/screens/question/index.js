import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import Question from './question';
import MoreReasons from './moreReasons';

const Stack = createStackNavigator();

const QuestionStack = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => navigation.navigate('Procrastinating?'), []),
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false, headerTitle: 'Back' }}
        name='Procrastinating?'
        component={Question}
      />
      <Stack.Screen name='More Reasons' component={MoreReasons} />
    </Stack.Navigator>
  );
};

export default QuestionStack;
