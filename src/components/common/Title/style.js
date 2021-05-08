import { StyleSheet } from 'react-native';
import { colors } from '../../../api/constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 5,
  },
  titleText: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 26,
    color: colors.dark,
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: 'Verdana',
    fontSize: 20,
    textAlign: 'center',
    color: colors.muted,
  },
});

export default styles;
