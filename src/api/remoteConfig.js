import remoteConfig from '@react-native-firebase/remote-config';

export const initializeRemoteConfig = () => {
  remoteConfig()
    .setDefaults({
      bottom_popup_title: 'Need accountability?',
      bottom_popup_text:
        'Get a coach who will help you hit your goals',
      bottom_popup_image:
        'https://firebasestorage.googleapis.com/v0/b/goalswon.appspot.com/o/coaches%2FSimon.png?alt=media&token=99b9f4f4-b8d9-4503-9fa2-cbd3717aee94',
      bottom_popup_link:
        'https://www.goalswon.com/?utm_source=popup&utm_medium=sideproject&utm_campaign=dwt',
    })
    // Be warned Firebase may start to reject your requests if values are requested too frequently.
    // .then(() => remoteConfig().fetch(0)) // Refresh cache
    .then(() => remoteConfig().fetchAndActivate());
};

export const getRemoteValue = (key) => remoteConfig().getValue(key);
