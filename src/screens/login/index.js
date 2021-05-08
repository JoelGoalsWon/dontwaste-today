import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';

// GOOGLE SIGN IN
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

import { useDispatch } from 'react-redux';
import {
  login,
  welcomeUser,
  enableHiddenFeatures,
  firstNotification,
} from '../../redux/actions/auth';
import { addUser } from '../../api/firestore';
import { defaultSettings, colors } from '../../api/constants';
import styles from './style';

// Funnel
import {
  openSourceOrWhyNeededTap,
  startCreateAccount,
  finishCreateAccount,
} from '../../api/analytics';

const Login = () => {
  // const [userInfo, setuserInfo] = useState([]);
  const [user, setUser] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const signIn = async () => {
    startCreateAccount(); // Funnel
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth()
        .signInWithCredential(credential)
        .then((result) => {
          const loggedUser = {
            name: result.user.displayName,
            email: result.user.email,
            settings: defaultSettings,
          };

          if (result.additionalUserInfo.isNewUser) {
            addUser(result.user.uid, loggedUser);
            dispatch(welcomeUser(true));
            dispatch(enableHiddenFeatures(false));
            dispatch(firstNotification(true));
          }

          dispatch(login(user));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  async function onAppleButtonPress() {
    startCreateAccount(); // Funnel
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest(
        {
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [
            appleAuth.Scope.EMAIL,
            appleAuth.Scope.FULL_NAME,
          ],
        },
      );

      const { identityToken, nonce } = appleAuthRequestResponse;

      if (identityToken) {
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );

        await auth()
          .signInWithCredential(appleCredential)
          .then((result) => {
            const loggedUser = {
              name: result.user.displayName,
              email: result.user.email,
              settings: defaultSettings,
            };

            if (result.additionalUserInfo.isNewUser) {
              addUser(result.user.uid, loggedUser);
              dispatch(welcomeUser(true));
              dispatch(enableHiddenFeatures(false));
              dispatch(firstNotification(true));
            }

            dispatch(login(user));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // handle this - retry?
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }

  function onAuthStateChanged(loggedUser) {
    setUser(loggedUser);
    finishCreateAccount(); // Funnel
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView
        style={styles.safeAreaViewStyle}
        forceInset={{ top: 'always' }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Image
              style={styles.appIconStyle}
              // eslint-disable-next-line global-require
              source={require('../../assets/appicon.png')}
            />
            <Text style={styles.titleTextStyle}>
              Don&apos;t Waste Today!
            </Text>
            <Text style={styles.subtitleTextStyle}>
              A free procrastination
            </Text>
            <Text style={styles.subtitleTextStyle}>checker app</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <View>
              <GoogleSigninButton
                style={styles.googleSignInButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={signIn}
              />
            </View>
            <View>
              {/* Render your other social provider buttons here */}
              {appleAuth.isSupported && (
                <AppleButton
                  cornerRadius={3}
                  style={styles.signInWithAppleButton}
                  buttonStyle={AppleButton.Style.BLACK}
                  buttonType={AppleButton.Type.SIGN_IN}
                  onPress={() => {
                    onAppleButtonPress();
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.openSourceAndWhyNeededView}>
          <TouchableOpacity
            style={styles.sourceCodeButton}
            onPress={() => {
              setModalVisible(true);
              openSourceOrWhyNeededTap(); // Funnel
            }}
          >
            <Text style={styles.sourceCodeButtonText}>
              Why is sign in needed?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sourceCodeButton}
            onPress={() =>
              Linking.openURL(
                'https://github.com/JoelGoalsWon/dontwaste-today',
              )
            }
          >
            <Text style={styles.sourceCodeButtonText}>
              This app is open source. View code
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType='fade'
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>
                Why is sign in needed?
              </Text>
              <Text style={styles.modalText}>
                Sign in ensures your data is safe in case you lose or
                change phones, or want to use multiple devices.
              </Text>
              <Text style={styles.modalText}>
                Your personal information remains private. It will
                never be sold or shared with anyone else.
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Pressable
                  style={[styles.button, styles.buttonPrivacy]}
                  onPress={() => {
                    Linking.openURL(
                      'https://docs.google.com/document/d/e/2PACX-1vQeUy7YdXBLPOt0eNIwCagyrdMYi0_gAQjLXiSSPLD-zs0dBkKCdf0UzDtJGT14wuEXlTa4FNYq_Ewt/pub',
                    );
                    setModalVisible(!modalVisible);
                    openSourceOrWhyNeededTap(); // Funnel
                  }}
                >
                  <Text style={styles.textOutlineStyle}>
                    Privacy Policy
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default Login;
