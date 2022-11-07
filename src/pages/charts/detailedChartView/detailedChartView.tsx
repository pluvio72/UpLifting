import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import Chart from '../../../components/chart';
import { RootStackParamList } from '../../../data/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'detailed_chart_view'>;

const DetailedChartView: React.FC<Props> = ({ route }) => {
  const { exerciseName } = route.params;

  return (
    <View>
      <Text>{exerciseName}</Text>
    </View>
  )
};

export default DetailedChartView;