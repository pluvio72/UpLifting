import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import BarChart from './components/barChart';
import {Row} from '../../components/Reusable/reusable';
import {colors} from '../../util/styles';
import {styles} from './gym.styles';
import Spacer from '../../components/spacer';

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
      <Spacer size={2} />
      <Text style={styles.header}>Latest PRs</Text>
      <Spacer size={1} />
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
      <Spacer size={3} />
      <Row yAlign="center" xAlign="center">
        <Text style={[styles.header, {marginRight: 'auto'}]}>
          Strength Comparison
        </Text>
        <Text style={styles.headerInfo}>(What is this?)</Text>
      </Row>
      <View style={styles.chartWrapper}>
        <BarChart
          data={[
            {centile: 10, people: 20},
            {centile: 20, people: 28},
            {centile: 30, people: 33},
            {centile: 40, people: 40},
            {centile: 50, people: 58},
            {centile: 60, people: 60},
            {centile: 70, people: 40},
            {centile: 80, people: 42},
            {centile: 90, people: 19},
          ]}
          tickFormat={[
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
          tickValues={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
          x={'centile'}
          y={'people'}
        />
      </View>
      <Spacer size={3} />
      <Row>
        <Text style={[styles.bottomText]}>Visits this month</Text>
        <Text style={[styles.bottomText]}>Percentile</Text>
      </Row>
      <Row>
        <Text style={[styles.largeText]}>15</Text>
        <Text style={styles.largeText}>63%</Text>
      </Row>
    </SafeAreaView>
  );
};

export default Gym;
