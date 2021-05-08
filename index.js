import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import setupNotifications from './src/config/notifications';
import App from './App';

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/fr-BE');
  require('intl/locale-data/jsonp/nl-BE');
  require('intl/locale-data/jsonp/it-IT');
}

setupNotifications();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
