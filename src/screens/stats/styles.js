import { StyleSheet } from 'react-native';
import { colors } from '../../api/constants';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: colors.background,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 20,
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
  },
  chartTitle: { fontSize: 20, color: colors.muted },
  reasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  reasonLabel: {
    fontSize: 18,
    marginLeft: 4,
    color: colors.muted,
  },
  reasonTotal: {
    fontSize: 18,
    color: colors.muted,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  quoteAuthorStyle: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default styles;
