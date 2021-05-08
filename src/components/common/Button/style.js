import { StyleSheet } from 'react-native';
import { colors } from '../../../api/constants';

const styles = (color, fontColor) =>
  StyleSheet.create({
    button: {
      borderRadius: 30,
      paddingVertical: 16,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: color,
      shadowColor: colors.dark,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 3,
    },
    buttonText: {
      color: fontColor,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default styles;
