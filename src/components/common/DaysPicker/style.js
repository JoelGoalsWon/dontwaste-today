import { StyleSheet } from 'react-native';
import { colors } from '../../../api/constants';

const styles = StyleSheet.create({
  sectionListItemStyle: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: colors.dark,
    // backgroundColor: 'transparent',
  },
  touchableOpacityStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ioniconsStyle: {
    paddingHorizontal: 20,
  },
});

export default styles;
