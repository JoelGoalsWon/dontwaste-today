import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../api/constants';

const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
    width: DeviceWidth * 0.43,
    height: DeviceWidth * 0.43,
    backgroundColor: colors.primary,
    shadowColor: colors.dark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    paddingHorizontal: 4,
    textAlign: 'center',
    paddingBottom: 10,
    marginTop: 12,
  },
  buttonEmoji: {
    fontSize: 50,
    textAlign: 'center',
    color: colors.dark,
  },
});

export default styles;
