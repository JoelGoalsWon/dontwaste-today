import analytics from '@react-native-firebase/analytics';

// eslint-disable-next-line import/prefer-default-export
export const logPopupTap = async (screen, title, text, image) => {
  try {
    await analytics().logEvent('popup_tap', {
      screen,
      title,
      text,
      image,
    });
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};

// Modified to track answers
export const reasonTap = async (reason) => {
  try {
    await analytics().logEvent('reason_tap', {
      reason,
    });
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};

// Modified to track deletions
export const entryDelete = async (reason, date) => {
  try {
    await analytics().logEvent('entry_delete', {
      reason,
      date,
    });
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};

// Funnel events
export const openSourceOrWhyNeededTap = async () => {
  try {
    await analytics().logEvent('open_source_why_needed_tap', {
      name: 'Tap opensource/why needed',
    });
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};

export const startCreateAccount = async () => {
  try {
    await analytics().logEvent('start_create_account', {
      name: 'Start create account',
    });
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};

export const finishCreateAccount = async () => {
  try {
    await analytics().logEvent('finish_create_account', {
      name: 'Finish create account',
    });
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};

export const startNowTap = async () => {
  try {
    await analytics().logEvent('start_now_tap', {
      name: 'Tap start now',
    });
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};

export const firstAnswerAfterFirstNotification = async () => {
  try {
    await analytics().logEvent(
      'first_answer_after_first_notification',
      {
        name: 'First answer after first notification',
      },
    );
  } catch (e) {
    console.log('Unable to log analytics event:', e);
  }
};
