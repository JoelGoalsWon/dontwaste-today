import Moment from 'moment';
import _ from 'lodash';
import { getVersion } from 'react-native-device-info';
import { getRemoteValue } from './remoteConfig';

const colorScale = [
  '#0984e3',
  '#d63031',
  '#fdcb6e',
  '#00b894',
  '#6c5ce7',
  '#e17055',
  '#00cec9',
  '#e84393',
  '#74b9ff',
  '#b2bec3',
  '#ffeaa7',
  '#e256ae',
];

export const dateTimeToUtc = (datetime = new Date()) =>
  Moment(datetime).utc().format();

export const getDateTime = () => Moment().utc().format();

export const getColorScale = (index) =>
  index < colorScale.length ? colorScale[index] : '#fff';

export const toCamelCase = (text) => _.camelCase(text);

export const getRandomIntInclusive = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(
    Math.random() * (maxValue - minValue + 1) + minValue,
  );
};

export const isAppOutdated = () => {
  const lastMandatoryUpdate = getRemoteValue(
    'last_mandatory_update',
  ).asString();
  const currentVersion = getVersion();

  if (currentVersion < lastMandatoryUpdate) {
    return true;
  }
  return false;
};
