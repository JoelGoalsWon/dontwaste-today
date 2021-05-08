import { defaultSettings } from '../../api/constants';
import { FETCH_SETTINGS } from '../types';

const initialState = {
  settings: defaultSettings,
};

export const settingReducer = (state = initialState, action) => {
  const { payload } = action; // This is action.payload
  switch (action.type) {
    case FETCH_SETTINGS:
      return {
        ...state,
        settings: payload,
      };

    default:
      return state;
  }
};

export default settingReducer;
