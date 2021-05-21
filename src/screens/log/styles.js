import { StyleSheet } from 'react-native';
import { colors } from '../../api/constants';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  textContainer: {
    marginLeft: 10,
  },
  reason: { fontSize: 18, color: colors.dark },
  deleteAction: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
  },
});

export default styles;
