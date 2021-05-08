import React from 'react';
import { Text, View } from 'react-native';
import MomentTimezone from 'moment-timezone';
//import PropTypes from 'prop-types';

import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style';
import { dateTimeToUtc } from '../../../api/helper';

const IosTimePicker = ({ settings, setSettings }) => {
  const onChangeSince = (event, selectedDate) => {
    const currentDate = selectedDate || settings.availableTime.start;
    const currentDateUtc = dateTimeToUtc(currentDate);
    setSettings({
      ...settings,
      availableTime: {
        start: currentDateUtc,
        end: settings.availableTime.end,
      },
    });
  };

  const onChangeUntil = (event, selectedDate) => {
    const currentDate = selectedDate || settings.availableTime.end;
    const currentDateUtc = dateTimeToUtc(currentDate);
    setSettings({
      ...settings,
      availableTime: {
        start: settings.availableTime.start,
        end: currentDateUtc,
      },
    });
  };

  return (
    <View style={styles.viewStyle}>
      <View style={styles.subViewStyle}>
        <Text>From</Text>
        <DateTimePicker
          style={styles.pickerStyle}
          display='inline'
          //testID='dateTimePicker'
          value={
            new Date(
              MomentTimezone(settings.availableTime.start)
                .tz(MomentTimezone.tz.guess())
                .format(),
            )
          }
          mode='time'
          is24Hour={false}
          onChange={onChangeSince}
        />
      </View>
      <View style={styles.subViewStyle}>
        <Text>To</Text>
        <DateTimePicker
          style={styles.pickerStyle}
          display='inline'
          //testID='dateTimePicker'
          value={
            new Date(
              MomentTimezone(settings.availableTime.end)
                .tz(MomentTimezone.tz.guess())
                .format(),
            )
          }
          mode='time'
          is24Hour={false}
          onChange={onChangeUntil}
        />
      </View>
    </View>
  );
};

// IosTimePicker.propTypes = {
//   settings: PropTypes.shape({
//     settings: PropTypes.func.isRequired,
//   }).isRequired, // PropTypes.objectOf(PropTypes.object).isRequired,
//   setSettings: PropTypes.shape({
//     setSsettings: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default IosTimePicker;
