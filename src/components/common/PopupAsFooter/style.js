import { StyleSheet } from 'react-native';
import { colors } from '../../../api/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    width: '100%',
    padding: 10,
  },
  image: {
    height: 64,
    width: 64,
    resizeMode: 'cover',
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
    flexShrink: 1,
  },
  title: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: 18,
    flexShrink: 1,
    paddingRight: 18,
  },
  body: { color: colors.light, fontSize: 16, flexShrink: 1 },
  dismissButton: {
    position: 'absolute',
    right: -5,
    top: -20,
    color: colors.light,
    fontSize: 30,
    padding: 20,
    zIndex: 100,
  },
});

export default styles;
