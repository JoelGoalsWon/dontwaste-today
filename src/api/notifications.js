import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import moment from 'moment';
import { Platform } from 'react-native';
import { store } from '../redux/store';

import { colors, questionNotificationTitle } from './constants';
import { getRandomIntInclusive } from './helper';

const getSettings = async () => {
  const state = await store.getState();
  if (state && state.setting && state.setting.settings) {
    return state.setting.settings;
  }
  return null;
};

store.subscribe(getSettings);

const getAvailableDateTime = (availableDays, offsetDays = 0) => {
  let availableDay;
  let i = offsetDays;

  do {
    const day = moment().add(i, 'days').isoWeekday();
    availableDay = availableDays.find(
      (el) => el.id === day && el.isSelected,
    );
    i += 1;
  } while (!availableDay);

  const calculatedDateTime = moment().add(i - 1, 'days');

  return calculatedDateTime;
};

const getNextNotificationTime = async () => {
  const settings = await getSettings();
  const dates = [];

  if (settings) {
    // Set time in available days range
    let calculatedDateTime = getAvailableDateTime(
      settings.availableDays,
    );

    // Set time in frequency  range
    switch (settings.frequency) {
      case 1:
        calculatedDateTime = calculatedDateTime.add(
          getRandomIntInclusive(1, 3),
          'hours',
        );
        break;
      case 2:
        calculatedDateTime = calculatedDateTime.add(
          getRandomIntInclusive(25, 100),
          'minutes',
        );
        break;
      default:
        calculatedDateTime = calculatedDateTime.add(
          getRandomIntInclusive(10, 30),
          'minutes',
        );
        break;
    }

    // check if time is in availableTime
    const calculatedTime = moment(calculatedDateTime).format('h:mma');

    const endTime = moment(settings.availableTime.end).format(
      'h:mma',
    );
    const startTime = moment(settings.availableTime.start).format(
      'h:mma',
    );

    const isTimeInRange =
      moment(calculatedTime, 'h:mma').isBefore(
        moment(endTime, 'h:mma'),
      ) &&
      moment(calculatedTime, 'h:mma').isAfter(
        moment(startTime, 'h:mma'),
      );

    if (isTimeInRange) {
      // Get difference in milliseconds from calculated time and now
      const nextNotificationTime = calculatedDateTime.diff(moment());
      // console.log(
      //   `You  will be asked again in: ${Math.floor(
      //     nextNotificationTime / 60000,
      //   )} minutes`,
      // );
      dates.push(nextNotificationTime);
    }

    // Set date in next available day
    let nextAvailableDateTime = getAvailableDateTime(
      settings.availableDays,
      1,
    );

    // Set time at start
    const nextStartTime = settings.availableTime.start;
    nextAvailableDateTime = moment(nextAvailableDateTime).set({
      hour: moment(nextStartTime).hours(),
      minute: moment(nextStartTime).minutes(),
    });

    // Get difference in milliseconds from calculated time and now
    const nextNotificationTime = nextAvailableDateTime.diff(moment());
    // console.log(
    //   `You  will be asked next time in: ${Math.floor(
    //     nextNotificationTime / 60000,
    //   )} minutes`,
    // );

    dates.push(nextNotificationTime);

    return [...new Set(dates)];
  }
  return [new Date(Date.now() + 25 * 1000)];
};

export const cancelAllLocalNotifications = () => {
  if (Platform.OS === 'android') {
    PushNotification.cancelAllLocalNotifications();
  } else {
    PushNotificationIOS.removeAllPendingNotificationRequests();
  }
};

// TODO call when changing something in the settings
// TODO set an id and delete only this notification (in case other scheduled nots are needed)
export const scheduleQuestionLocalNotification = async () => {
  cancelAllLocalNotifications();

  const dates = await getNextNotificationTime();

  dates.forEach((date) => {
    if (Platform.OS === 'android') {
      PushNotification.localNotificationSchedule({
        channelId: 'procrastination-checker', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: questionNotificationTitle,
        message: '(be honest with yourself)', // (required)
        ticker: 'Are you procrastinating right now?',
        // actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
        date: new Date(Date.now() + date),
        vibration: 300,
        color: colors.primary,
        invokeApp: false,
        group: 'questions',
      });
    } else {
      // Temp fix: using a deprecated funtion because the original suddenly stopped working (TODO)
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: questionNotificationTitle,
        alertBody: '(be honest with yourself)',
        category: 'questions',
        fireDate: Date.now() + date,
      });

      // PushNotificationIOS.addNotificationRequest({
      //   id: 'question',
      //   title: questionNotificationTitle,
      //   body: '(be honest with yourself)',
      //   category: 'questions',
      //   invokeApp: false,
      //   fireDate: new Date(Date.now() + date),
      // });
    }
  });
};
