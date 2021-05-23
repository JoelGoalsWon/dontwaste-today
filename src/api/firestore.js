import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { camelCase } from 'lodash';
import Toast from 'react-native-simple-toast';
import { getDateTime } from './helper';
import { reasonTap, entryDelete } from './analytics'; // Modified to track answers and deletions

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
    const now = getDateTime();
    const today = moment(now).format('YYYY-MM-DD');
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
      createdAt: now,
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

export const deleteEntry = (entry) => {
  try {
    const camelCasedReason = camelCase(entry.reason);
    const userUid = auth().currentUser.uid;
    const date = moment(entry.createdAt).format('YYYY-MM-DD');
    const isProcrastinating = entry.reason !== 'Is not procrastinating';

    // ---- Prepare refs ----
    const answersRef = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('answers')
      .doc(entry.id);

    const historyRef = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('history')
      .doc(date);

    const counterRef = firestore()
      .collection('answers')
      .doc(userUid)
      .collection('counter')
      .doc(camelCasedReason);

    // ---- Start transaction ----
    firestore().runTransaction(async transaction => {
      // ---- Prepare answers ----
      const answers = await transaction.get(answersRef);
      if (!answers.exists) {
        return;
      }
      await transaction.delete(answersRef);

      // ---- Prepare history ----
      const history = await transaction.get(historyRef);
      if (history.exists) {
        if (history.data().total > 1) {
          await transaction.set(
            historyRef,
            {
              isNotProcrastinating: firestore.FieldValue.increment(
                !isProcrastinating ? -1 : 0,
              ),
              total: firestore.FieldValue.increment(-1),
            },
            { merge: true },
          );
        } else {
          await transaction.delete(historyRef);
        }
      }

      // ---- Prepare counters ----
      if (isProcrastinating) {
        const counter = await transaction.get(counterRef);
        if (counter.exists) {
          if (counter.data().total > 1) {
            await transaction.set(
              counterRef,
              {
                total: firestore.FieldValue.increment(-1),
              },
              { merge: true },
            );
          } else {
            await transaction.delete(counterRef);
          }
        }
      }
    }).catch((error) => {
      console.error('Error deleting entry: ', error);
    });

    entryDelete(entry.reason, date); // TODO check if it's right here - Modified to track deletion
    Toast.show('Entry deleted!', 0.5); // TODO check toast message if it's correct right here
  } catch (error) {
    console.error('Error deleting entry: ', error);
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
