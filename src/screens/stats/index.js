import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

import { BarChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { enableHiddenFeatures } from '../../redux/actions/auth';

import { getColorScale } from '../../api/helper';
import Title from '../../components/common/Title';
import Popup from '../../components/common/Popup';
import styles from './styles';
import { motivationalQuotes } from '../../api/constants';

const Stats = () => {
  const dispatch = useDispatch();
  const showHiddenFeatures = useSelector(
    (state) => state.auth.showHiddenFeatures,
  );

  const counters = useSelector((state) => state.answer.counters);
  const history = useSelector((state) => state.answer.history);

  const [reasons, setReasons] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isNotProcrastinating, setIsNotProcrastinating] = useState(
    [],
  );
  const [showPopup, setShowPopup] = useState(true);

  const handleLongPress = () => {
    if (!showHiddenFeatures) {
      dispatch(enableHiddenFeatures(true));
      Toast.show('You unlocked the hidden features! 🤯', 0.5);
    }
  };

  // If counters are updated, re-render
  useEffect(() => {
    const data = counters
      .map((el, index) => ({
        ...el,
        color: getColorScale(index),
      }))
      .sort((a, b) => b.total - a.total);
    setReasons(data);
  }, [counters]);

  // If history is updated, re-render
  useEffect(() => {
    const dataLabel = history.map((el) =>
      moment(el.createdAt).format('ddd D'),
    );
    setLabels(dataLabel);
    const dataIsNotProcrastinating = history.map(
      (el) => (el.isNotProcrastinating / el.total) * 100,
    );
    setIsNotProcrastinating(dataIsNotProcrastinating);
  }, [history]);

  return (
    <>
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        {labels.length > 0 ? (
          <>
            <TouchableOpacity
              onLongPress={handleLongPress}
              style={{ marginBottom: 10 }}
            >
              <Title title='Results' />
            </TouchableOpacity>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {showHiddenFeatures && (
                <View style={styles.chartContainer}>
                  <Text style={styles.quoteStyle}>
                    &rdquo;
                    {motivationalQuotes[moment().date() - 1].quote}
                    &rdquo;
                  </Text>
                  <Text style={styles.quoteAuthorStyle}>
                    - {motivationalQuotes[moment().date() - 1].author}{' '}
                    -
                  </Text>
                </View>
              )}
              {reasons.length > 0 && (
                <View style={styles.chartContainer}>
                  <Text style={styles.chartTitle}>
                    Reasons for procrastinating
                  </Text>
                  <PieChart
                    data={reasons}
                    width={Dimensions.get('window').width / 2}
                    height={200}
                    chartConfig={{
                      color: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor='total'
                    center={[Dimensions.get('window').width / 8, 0]}
                    hasLegend={false}
                  />

                  {/* TODO move to external component */}
                  {reasons &&
                    reasons.map((item) => (
                      <View
                        key={item.reason}
                        style={styles.reasonContainer}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <Ionicons
                            name='square'
                            size={18}
                            color={item.color}
                          />
                          <Text style={styles.reasonLabel}>
                            {item.reason}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.reasonTotal}>
                            {item.total}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
              )}
              <View style={styles.chartContainer}>
                <Text
                  style={[
                    styles.chartTitle,
                    {
                      marginBottom: 20,
                    },
                  ]}
                >
                  How focused were you?
                </Text>
                <BarChart
                  data={{
                    labels,
                    datasets: [
                      {
                        data: isNotProcrastinating,
                        color: (opacity = 1) =>
                          `rgba(9, 132, 227, ${opacity})`,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width}
                  height={220}
                  verticalLabelRotation={330}
                  fromZero
                  yAxisSuffix='%'
                  xLabelsOffset={10}
                  chartConfig={{
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: '#08130D',
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0,
                    color: (opacity = 1) =>
                      `rgba(9, 132, 227, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(39, 43, 45, ${opacity})`,
                    barPercentage: 1,
                  }}
                  style={{
                    marginLeft: -10,
                    zIndex: 1000,
                  }}
                />
              </View>
            </ScrollView>
            {showPopup && (
              <Popup
                dismissHandler={() => setShowPopup(false)}
                screen='Results'
              />
            )}
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Title title='Results' />
            <Text style={{ fontSize: 18 }}>Nothing to show here</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default Stats;
