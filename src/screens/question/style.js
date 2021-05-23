import { StyleSheet } from 'react-native';
import { colors } from '../../api/constants';

const styles = StyleSheet.create({
  safeAreaQuestion: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: colors.background,
  },
  viewFourButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  safeAreaMoreReasons: {
    flex: 1,
  },
  viewMoreReasonsStyle: {
    marginVertical: 10,
  },
});

export default styles;
