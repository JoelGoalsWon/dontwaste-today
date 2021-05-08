import { combineReducers } from 'redux';
import { answerReducer } from './answer';
import { authReducer } from './auth';
import { settingReducer } from './setting';

const reducers = combineReducers({
  answer: answerReducer,
  auth: authReducer,
  setting: settingReducer,
});

export default reducers;
