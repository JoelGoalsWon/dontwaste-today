import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { camelCase } from 'lodash';
import Toast from 'react-native-simple-toast';
import { getDateTime } from './helper';
import { reasonTap } from './analytics'; // Modified to track answers

export const addUser = (uid, user) => {
  try {
    firestore()
      .collection('users')
      .doc(uid)
      .set(user)
      .catch((error) => {
        console.error('Error writing user: ', error);
      });
  } catch (error) {
    console.error('Error adding user: ', error);
  }
};

export const addAnswer = (reason) => {
  try {
    const camelCasedReason = camelCase(reason);
    const userUid = auth().currentUser.uid;
    const today = moment().format('YYYY-MM-DD');
    const isProcrastinating = reason !== 'Is not procrastinating';

    // ---- Start transaction ----
    const batch = firestore().batch();

    // ---- Prepare answers ----
    const answersRef = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('answers')
      .doc();

    batch.set(answersRef, {
      reason,
      createdAt: getDateTime(),
    });

    // ---- Prepare history ----
    const historyRef = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('history')
      .doc(today);

    batch.set(
      historyRef,
      {
        createdAt: today,
        isNotProcrastinating: firestore.FieldValue.increment(
          !isProcrastinating ? 1 : 0,
        ),
        total: firestore.FieldValue.increment(1),
      },
      { merge: true },
    );

    // ---- Prepare counters ----
    if (isProcrastinating) {
      const counterRef = firestore()
        .collection('answers')
        .doc(userUid)
        .collection('counter')
        .doc(camelCasedReason);

      batch.set(
        counterRef,
        {
          reason,
          createdAt: today,
          total: firestore.FieldValue.increment(1),
        },
        { merge: true },
      );
    }

    reasonTap(reason); // TODO check if it's right here - Modified to track reason
    Toast.show('Entry saved!', 0.5); // TODO check toast message if it's correct right here

    // ---- Finish transaction ----
    batch.commit().catch((error) => {
      console.error('Error writing answer: ', error);
    });
  } catch (error) {
    console.error('Error adding answer: ', error);
  }
};

export const saveSettings = (settings) => {
  try {
    const userUid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(userUid)
      .update({ settings })
      .then(Toast.show('Settings saved', 0.5))
      .catch((error) => {
        console.error('Error while updating setting: ', error);
      });
  } catch (error) {
    console.error('Error updating setting: ', error);
  }
};
