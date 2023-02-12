import React from 'react';
import BarChart from './components/barChart';
import Spacer from '../../components/spacer';
import {SafeAreaView} from 'react-native';
import {Box, Row, Text} from 'native-base';

const Gym = () => {
  return (
    <SafeAreaView>
      <Row justifyContent="flex-start" mx={3} mb={2}>
        <Text fontWeight={800} fontSize={26}>
          The Gym Group
        </Text>
        <Text fontWeight={400} fontSize={26}>
          (Kingston)
        </Text>
      </Row>
      <Row justifyContent="flex-start" mx={3} mb={2}>
        <Text>You have </Text>
        <Text fontWeight={600}>31</Text>
        <Text> workouts at this gym.</Text>
      </Row>
      <Spacer size={2} />
      <Text fontSize={18} fontWeight={600} ml={3}>
        Latest PRs
      </Text>
      <Spacer size={1} />
      <Row bg="gray.200" py={2}>
        <Text w="33%" textAlign="center">
          @arriana
        </Text>
        <Text fontWeight={600} w="33%" textAlign="center">
          140 x 12kg
        </Text>
        <Text w="33%" textAlign="center">
          Hip Thrusts
        </Text>
      </Row>
      <Row bg="gray.200" py={2}>
        <Text w="33%" textAlign="center">
          @josff
        </Text>
        <Text w="33%" textAlign="center" fontWeight={600}>
          1 x 120kg
        </Text>
        <Text w="33%" textAlign="center">
          Bench Press
        </Text>
      </Row>
      <Spacer size={3} />
      <Row alignItems="center">
        <Text mr={'auto'} fontSize={18} fontWeight={600} ml={3}>
          Strength Comparison
        </Text>
        <Text mr={3} textDecorationLine="underline">
          (What is this?)
        </Text>
      </Row>
      <Box m={3}>
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
      </Box>
      <Spacer size={3} />
      <Row>
        <Text w="50%" textAlign="center">
          Visits this month
        </Text>
        <Text w="50%" textAlign="center">
          Percentile
        </Text>
      </Row>
      <Row>
        <Text w="50%" fontSize={60} fontWeight={800} textAlign="center">
          15
        </Text>
        <Text w="50%" fontSize={60} fontWeight={800} textAlign="center">
          63%
        </Text>
      </Row>
    </SafeAreaView>
  );
};

export default Gym;
