// import { getUser } from '../../api/fakeApiUser';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { FETCH_SETTINGS } from '../types';

const unsubscribers = [];

export const fetchSettingsSuccess = (settings) => ({
  type: FETCH_SETTINGS,
  payload: settings,
});

export const fetchSettings = () => (dispatch) => {
  try {
    const userUid = auth().currentUser.uid;
    const usersUnsubscriber = firestore()
      .collection('users')
      .doc(userUid)
      // Everything inside here will be triggered after anything happens
      // on the collection users on the db
      .onSnapshot((snapshot) => {
        const { settings } = snapshot.data();
        // dispatch has to be used to trigger actions inside this file
        dispatch(fetchSettingsSuccess(settings));
      });
    unsubscribers.push(usersUnsubscriber);
  } catch (error) {
    console.log('Error fetching settings: ', error);
  }
};

export const unsubscribeSettingsActions = () => {
  unsubscribers.forEach((unsubscriber) => unsubscriber());
};
