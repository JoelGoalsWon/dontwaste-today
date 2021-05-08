import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MomentTimezone from 'moment-timezone';
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from '../Button';
import styles from './style';
import { colors } from '../../../api/constants';
import { dateTimeToUtc } from '../../../api/helper';

const AndroidTimePicker = ({ settings, setSettings }) => {
  const [showSincePicker, setShowSincePicker] = useState(false);
  const [showUntilPicker, setShowUntilPicker] = useState(false);

  const onChangeSince = (event, selectedDate) => {
    const currentDate = selectedDate || settings.availableTime.start;
    const currentDateUtc = dateTimeToUtc(currentDate);
    setShowSincePicker(false);
    setSettings({
      ...settings,
      availableTime: {
        start: currentDateUtc,
        end: settings.availableTime.end,
      },
    });
  };

  const onChangeUntil = (event, selectedDate) => {
    const currentDate = selectedDate || settings.availableTime.start;
    const currentDateUtc = dateTimeToUtc(currentDate);
    setShowUntilPicker(false);
    setSettings({
      ...settings,
      availableTime: {
        start: settings.availableTime.start,
        end: currentDateUtc,
      },
    });
  };

  const updateShowSincePicker = () => {
    setShowSincePicker(true);
  };

  const updateShowUntilPicker = () => {
    setShowUntilPicker(true);
  };

  return (
    <View style={styles.view}>
      <Text>From</Text>
      <Button
        onPress={updateShowSincePicker}
        color={colors.tertiary}
        fontColor={colors.dark}
        text={new Date(
          MomentTimezone(settings.availableTime.start)
            .tz(MomentTimezone.tz.guess())
            .format(),
        ).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      />
      {showSincePicker && (
        <DateTimePicker
          display='spinner'
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
      )}

      <Text>To</Text>
      <Button
        onPress={updateShowUntilPicker}
        color={colors.tertiary}
        fontColor={colors.dark}
        text={new Date(
          MomentTimezone(settings.availableTime.end)
            .tz(MomentTimezone.tz.guess())
            .format(),
        ).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      />
      {showUntilPicker && (
        <DateTimePicker
          display='spinner'
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
      )}
    </View>
  );
};

export default AndroidTimePicker;
