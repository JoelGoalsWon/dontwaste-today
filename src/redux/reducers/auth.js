import {
  WELCOME_USER,
  HIDDEN_FEATURES,
  FIRST_NOTIFICATION,
} from '../types';

const initialState = {
  userData: null,
};

export const authReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        userData: null,
      };

    case WELCOME_USER:
      return {
        ...state,
        isNewUser: payload,
      };

    case HIDDEN_FEATURES:
      return {
        ...state,
        showHiddenFeatures: payload,
      };

    // Funnel
    case FIRST_NOTIFICATION:
      return {
        ...state,
        isFirstNotification: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
