import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../../components/button';
import Chart from '../../components/chart';
import Spacer from '../../components/spacer';
import Session from '../../contexts/session';
import {ExerciseNames} from '../../data/exercises';
import {RootStackParamList, Screens} from '../../data/navigation';
import {getRecentWorkouts} from '../../services/api/workout';
import {Workout} from '../../types/workouts';

import {colors, MarginStylesheet, Styles} from '../../util/styles';
import styles from './Charts.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'charts'>;

const Charts: React.FC<Props> = ({navigation}) => {
  const [filter, setFilter] = useState('');

  const navigateToDetailedView = () =>
    navigation.navigate(Screens.DetailedChartView, {exerciseName: filter});

  const session = useContext(Session);
  const [recentWorkouts, setRecentWorkouts] = useState<Array<Workout>>([]);

  useEffect(() => {
    getRecentWorkouts(session!.username, session!.token).then(workouts => {
      setRecentWorkouts(workouts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {recentWorkouts.map(workout => (
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
        ))}
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
