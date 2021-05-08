import { GoogleSignin } from '@react-native-google-signin/google-signin';

// eslint-disable-next-line import/prefer-default-export
export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    // client ID of type WEB for your server (needed to verify user ID and offline access)
    webClientId: 'YOUR_WEB_CLIEND_ID',
    // if you want to access Google API on behalf of the user FROM YOUR SERVER
    offlineAccess: false,
  });
};
