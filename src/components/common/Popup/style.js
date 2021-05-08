import { StyleSheet } from 'react-native';
import { colors } from '../../../api/constants';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    bottom: 20,
    backgroundColor: colors.primary,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 80,
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
