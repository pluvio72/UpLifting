import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Chart from '../../../components/chart';
import {Row} from '../../../components/Reusable/reusable';
import {Metrics} from '../../../data/exercises';
import {RootStackParamList} from '../../../data/navigation';
import {colors, PaddingStylesheet, Styles} from '../../../util/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'detailed_chart_view'>;

type FromDate = 'All Time' 
  | 'Past Week'
  | 'Past 2 Weeks'
  | 'Past Month'
  | 'Past 2 Months'
  | 'Past 4 Months'
  | 'Past 6 Months'
  | 'Past Year'
  | 'Past 2 Years';

const DetailedChartView: React.FC<Props> = ({route}) => {
  const {exerciseName} = route.params;

  const [metric, setMetric] = useState<Metrics>('Weight');
  const [sortBy, setSortBy] = useState<FromDate>('All Time');

  return (
    <View style={Styles.container}>
      <Text
        style={[
          Styles.textLg,
          Styles.textBold,
          Styles.textCenter,
          PaddingStylesheet({pt: 12, pb: 16}),
        ]}>
        {exerciseName}
      </Text>
      <Dropdown
        data={[{name: 'Weight'}, {name: 'Volume'}, {name: '`Reps'}]}
        labelField={'name'}
        valueField={'name'}
        onChange={newVal => setMetric(newVal.name)}
        value={metric}
        style={styles.dropdown}
        activeColor={colors.grey400}
        containerStyle={styles.dropdownContainer}
      />
      <Chart
        data={[
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ]}
        labels={['January', 'February', 'March', 'April', 'May', 'June']}
        yAxisInterval={10}
        margin={{mb: 8}}
      />
      <Text
        style={[
          Styles.textBold,
          Styles.textCenter,
          PaddingStylesheet({pt: 10, pb: 14}),
          Styles.textMd,
        ]}>
        Statistics
      </Text>
      <Dropdown
        data={[
          {name: 'All Time'},
          {name: 'Past Week'},
          {name: 'Past 2 Weeks'},
          {name: 'Past Month'},
          {name: 'Past 2 Months'},
          {name: 'Past 4 Months'},
          {name: 'Past 6 Months'},
          {name: 'Past Year'},
          {name: 'Past 2 Years'},
        ]}
        valueField={'name'}
        labelField={'name'}
        onChange={newVal => setSortBy(newVal.name)}
        value={sortBy}
        style={styles.sortDropdown}
        containerStyle={styles.sortDropdownContainer}
        itemContainerStyle={styles.sortDropdownText}
        itemTextStyle={styles.sortDropdownText}
        activeColor={colors.grey400}
        selectedTextStyle={{fontSize: 14}}
      />
      <Row style={styles.statItem}>
        <Text>PR:</Text>
        <Text>105kg x 12</Text>
      </Row>
      <Row style={styles.statItem}>
        <Text>Volume:</Text>
        <Text>12440kg</Text>
      </Row>
      <Row style={styles.statItem}>
        <Text>Reps:</Text>
        <Text>2123</Text>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: colors.grey400,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
    borderRadius: 8,
  },
  dropdownContainer: {
    borderRadius: 8,
  },
  sortDropdown: {
    backgroundColor: colors.grey400,
    paddingHorizontal: 6,
    paddingVertical: 0,
    marginBottom: 6,
    borderRadius: 8,
  },
  sortDropdownContainer: { margin: 0, padding: 0 },
  sortDropdownText: {
    fontSize: 12,
    marginTop: -2,
    marginBottom: -4,
  },
  statItem: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 6,
  }
});

export default DetailedChartView;
