import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../../components/button';
import Chart from '../../components/chart';
import {TextInput} from '../../components/inputs/TextInput';
import Spacer from '../../components/spacer';
import {Exercise, ExerciseNames} from '../../data/exercises';
import {RootStackParamList, Screens} from '../../data/navigation';

import {colors, MarginStylesheet, Styles} from '../../util/styles';
import styles from './Charts.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'charts'>;

const Charts: React.FC<Props> = ({navigation}) => {
  const [filter, setFilter] = useState('');

  const navigateToDetailedView = () =>
    navigation.navigate(Screens.DetailedChartView, {exerciseName: filter});

  return (
    <SafeAreaView>
      <ScrollView style={Styles.container}>
        <Text
          style={[
            Styles.textBold,
            Styles.textCenter,
            Styles.textLg,
            MarginStylesheet({mt: 8, mb: 4}),
          ]}>
          Charts
        </Text>
        <Dropdown
          data={ExerciseNames.map(e => ({name: e}))}
          search={true}
          labelField={'name'}
          valueField={'name'}
          onChange={newVal => setFilter(newVal.name)}
          inputSearchStyle={styles.chartDropdownInput}
          style={styles.chartDropdown}
          value={filter}
          searchPlaceholder="Enter exercise name..."
          placeholder="Seach specific exercise..."
        />
        <Button
          margin={{mb: 8}}
          bold
          onPress={navigateToDetailedView}
          color={colors.accentDark}>
          View
        </Button>
        <Spacer withDots padding={{pb: 16, pt: 8}} />
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
        />
        <Spacer size={2} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Charts;
