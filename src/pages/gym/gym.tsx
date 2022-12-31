import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Chart, {BarChart} from '../../components/chart';
import {Row} from '../../components/Reusable/reusable';
import {colors} from '../../util/styles';
import {styles} from './gym.styles';

const Gym = () => {
  return (
    <SafeAreaView>
      <Row xAlign="flex-start" style={styles.wrapper}>
        <Text style={styles.gymBrand}>The Gym Group</Text>
        <Text style={styles.gymName}>(Kingston)</Text>
      </Row>
      <Row xAlign="flex-start" style={styles.wrapper}>
        <Text>You have </Text>
        <Text style={styles.bold}>31</Text>
        <Text> workouts at this gym.</Text>
      </Row>
      <Text style={styles.header}>Latest PRs</Text>
      <Row style={styles.latestPR}>
        <Text style={styles.prText}>@arriana</Text>
        <Text style={[styles.prText, styles.bold]}>140 x 12kg</Text>
        <Text style={styles.prText}>Hip Thrusts</Text>
      </Row>
      <Row style={styles.latestPR}>
        <Text style={styles.prText}>@josff</Text>
        <Text style={[styles.prText, styles.bold]}>1 x 120kg</Text>
        <Text style={styles.prText}>Bench Press</Text>
      </Row>
      <Text style={styles.header}>Strength Comparison</Text>
      <BarChart
        title=""
        data={[0, 10, 18, 20, 42, 45, 50, 43, 25, 22]}
        labels={[
          '10th',
          '20th',
          '30th',
          '40th',
          '50th',
          '60th',
          '70th',
          '80th',
          '90th',
        ]}
        yAxisLabel={''}
        activeBarColor={colors.secondary}
        activeBarIndex={2}
      />
    </SafeAreaView>
  );
};

export default Gym;
