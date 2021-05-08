import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { store } from '../redux/store'; // Funnel
import { firstNotification } from '../redux/actions/auth'; // Funnel
import { addAnswer } from '../api/firestore';
import { scheduleQuestionLocalNotification } from '../api/notifications';

// ------------------------------------ Funnel ------------------------------------
const getIsFirstNotification = async () => {
  const state = await store.getState();
  if (
    state &&
    state.auth &&
    state.auth.isFirstNotification !== undefined
  ) {
    return state.auth.isFirstNotification;
  }
  return null;
};
// ------------------------------------ Funnel ------------------------------------
store.dispatch(firstNotification(true));
store.subscribe(getIsFirstNotification);

// Must be outside of any component LifeCycle (such as `componentDidMount`).
export default () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister(token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification(notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // ------------------------------------ Funnel ------------------------------------
      getIsFirstNotification().then((isFirstNotification) => {
        if (isFirstNotification) {
          console.log('IT IS FIRST NOTIFICATION');
          store.dispatch(firstNotification(false));
        } else {
          console.log('not first notification');
        }
      });
      // ------------------------------------ Funnel ------------------------------------

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction(notification) {
      console.log('ACTION selected:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
      if (notification.action === 'Yes') {
        PushNotification.invokeApp(notification);
      } else {
        addAnswer('Is not procrastinating');
        scheduleQuestionLocalNotification();
      }
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError(err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'procrastination-checker', // (required)
      channelName: 'Procrastination checker', // (required)
      channelDescription: 'Are you procrastinating now?', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
