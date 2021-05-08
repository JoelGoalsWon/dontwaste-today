import { StyleSheet } from 'react-native';
import { colors } from '../../api/constants';

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, marginHorizontal: 15 },
  skeleton: {
    width: '100%',
    height: 50,
    marginVertical: 8,
  },
  logsContainer: {
    width: '100%',
    marginVertical: 12,
  },
  itemContainer: {
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  reason: { fontSize: 18, color: colors.dark },
});

export default styles;
