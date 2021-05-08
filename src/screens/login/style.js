import { StyleSheet } from 'react-native';
import { colors } from '../../api/constants';

const styles = StyleSheet.create({
  sourceCodeButton: {
    borderRadius: 30,
    marginVertical: 10,
  },
  sourceCodeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: colors.light,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    margin: 5,
    padding: 10,
    elevation: 2,
    width: 150,
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  buttonPrivacy: {
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textOutlineStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: colors.primary,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconStyle: {
    height: 230,
    width: 230,
    borderRadius: 10,
  },
  titleTextStyle: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.light,
    marginVertical: 5,
  },
  subtitleTextStyle: {
    textAlign: 'center',
    fontSize: 18,
  },
  googleSignInButton: {
    minWidth: 300,
    height: 55,
    marginBottom: 10,
    marginTop: 20,
  },
  signInWithAppleButton: {
    minWidth: 300,
    height: 50,
    marginBottom: 10,
  },
  openSourceAndWhyNeededView: {
    bottom: 20,
    position: 'absolute',
  },
});

export default styles;
