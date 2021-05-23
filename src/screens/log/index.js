import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useDispatch, useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import moment from 'moment';
import { colors } from '../../api/constants';
import { deleteEntry } from '../../api/firestore';
import Title from '../../components/common/Title';
import { fetchAnswers } from '../../redux/actions/answer';
import styles from './styles';
import Popup from '../../components/common/Popup';

const Stats = () => {
  const [showPopup, setShowPopup] = useState(true);

  const answers = useSelector((state) => state.answer.answers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnswers());
  }, []);

  const onDeleteEntry = async (entry) => {
    await deleteEntry(entry);
  };

  return (
    <>
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        {answers && answers.length > 0 ? (
          <>
            <Title title='Entries' />
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FlatList
                style={styles.logsContainer}
                data={answers}
                renderItem={({ item }) => (
                  <Swipeable
                    friction={2}
                    rightThreshold={40}
                    renderRightActions={() => (
                      <RectButton
                        style={styles.deleteAction}
                        onPress={() => onDeleteEntry(item)}
                      >
                        <Ionicons
                          name='trash-outline'
                          color={colors.tertiary}
                          size={24}
                        />
                      </RectButton>
                    )}
                  >
                    <View style={styles.itemContainer}>
                      <View>
                        {item.reason === 'Is not procrastinating' ? (
                          <Ionicons
                            name='checkmark-circle-outline'
                            color={colors.success}
                            size={20}
                          />
                        ) : (
                          <Ionicons
                            name='close-circle-outline'
                            color={colors.danger}
                            size={20}
                          />
                        )}
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.reason}>
                          {item.reason === 'Is not procrastinating'
                            ? 'Not procrastinating'
                            : item.reason}
                        </Text>
                        <Text>
                          {moment(item.createdAt).format(
                            'ddd D MMM, hh:mm A',
                          )}
                        </Text>
                      </View>
                    </View>
                  </Swipeable>
                )}
                keyExtractor={item => item.createdAt}
              />
            </ScrollView>
            {showPopup && (
              <Popup
                dismissHandler={() => setShowPopup(false)}
                screen='Entries'
              />
            )}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Title title='Entries' />
            <Text style={{ fontSize: 18 }}>Nothing to show here</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default Stats;
