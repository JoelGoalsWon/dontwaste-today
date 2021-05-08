import functions from '@react-native-firebase/functions';

// eslint-disable-next-line import/prefer-default-export
export const getReasonsCount = (start = null, end = null) =>
  functions()
    .httpsCallable('getReasonsCount')({
      start,
      end,
    })
    .then((response) => {
      if (response && response.data) {
        return response.data;
      }
      return [];
    })
    .catch((error) => {
      console.log('Error', error);
    });
