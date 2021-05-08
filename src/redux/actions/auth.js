// import { getUser } from '../../api/fakeApiUser';

import {
  WELCOME_USER,
  HIDDEN_FEATURES,
  FIRST_NOTIFICATION,
} from '../types';

export const fetchUserRequest = () => ({
  type: 'FETCH_USER_REQUEST',
});

export const fetchUserSuccess = (users) => ({
  type: 'FETCH_USER_SUCCESS',
  payload: users,
});

export const fetchUserFail = () => ({
  type: 'FETCH_USER_FAILED',
});

export const login = (user) => ({
  type: 'LOGIN',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
  payload: null,
});

export const welcomeUser = (isNewUser) => ({
  type: WELCOME_USER,
  payload: isNewUser,
});

export const enableHiddenFeatures = (showHiddenFeatures) => ({
  type: HIDDEN_FEATURES,
  payload: showHiddenFeatures,
});

// Funnel
export const firstNotification = (isFirstNotification) => ({
  type: FIRST_NOTIFICATION,
  payload: isFirstNotification,
});

export const fetchDataUser = () => async (dispatch) => {
  try {
    dispatch(fetchUserRequest());
    // const { data } = await getUser();
    // dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFail());
  }
};
