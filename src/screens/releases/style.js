import { StyleSheet } from 'react-native';
import { colors } from '../../api/constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollViewStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.light,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: colors.light,
    shadowColor: colors.dark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
