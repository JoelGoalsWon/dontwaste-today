import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

import {
  FETCH_ANSWERS,
  FETCH_COUNTERS,
  FETCH_HISTORY,
  SET_LOADING,
} from '../types';

const unsubscribers = [];

export const fetchAnswersSuccess = (answers) => ({
  type: FETCH_ANSWERS,
  payload: answers,
});

export const fetchCountersSuccess = (counters) => ({
  type: FETCH_COUNTERS,
  payload: counters,
});

export const fetchHistorySuccess = (answers) => ({
  type: FETCH_HISTORY,
  payload: answers,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const fetchAnswers = () => (dispatch) => {
  try {
    const userUid = auth().currentUser.uid;
    dispatch(setLoading(true));
    const answerUnsubscriber = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('answers')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const answers = snapshot.docs.map((doc) => {
            const answer = doc.data();
            return answer;
          });
          dispatch(fetchAnswersSuccess(answers));
          dispatch(setLoading(false));
        },
        (error) => {
          dispatch(setLoading(false));
          console.log('Error fetching answers onSnapshot: ', error);
        },
      );
    unsubscribers.push(answerUnsubscriber);
  } catch (error) {
    dispatch(setLoading(false));
    console.log('Error fetching answers: ', error);
  }
};

export const fetchCounters = () => (dispatch) => {
  try {
    const userUid = auth().currentUser.uid;
    dispatch(setLoading(true));
    const countersUnsubscriber = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('counter')
      .onSnapshot(
        (snapshot) => {
          const counters = snapshot.docs.map((doc) => {
            const counter = doc.data();
            return counter;
          });
          dispatch(fetchCountersSuccess(counters));
          dispatch(setLoading(false));
        },
        (error) => {
          dispatch(setLoading(false));
          console.log('Error fetching counters onSnapshot: ', error);
        },
      );
    unsubscribers.push(countersUnsubscriber);
  } catch (error) {
    dispatch(setLoading(false));
    console.log('Error fetching counters: ', error);
  }
};

export const fetchHistory = () => (dispatch) => {
  try {
    const userUid = auth().currentUser.uid;
    dispatch(setLoading(true));
    const historyUnsubscriber = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('history')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .onSnapshot(
        (snapshot) => {
          const answers = snapshot.docs
            .map((doc) => {
              const answer = doc.data();
              return answer;
            })
            .sort(
              (a, b) => moment(a.createdAt) - moment(b.createdAt),
            );

          dispatch(fetchHistorySuccess(answers));
          dispatch(setLoading(false));
        },
        (error) => {
          dispatch(setLoading(false));
          console.log('Error fetching history onSnapshot: ', error);
        },
      );
    unsubscribers.push(historyUnsubscriber);
  } catch (error) {
    dispatch(setLoading(false));
    console.log('Error fetching history: ', error);
  }
};

export const unsubscribeAnswerActions = () => {
  unsubscribers.forEach((unsubscriber) => unsubscriber());
};
