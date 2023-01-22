import React from 'react';
import {View} from 'react-native';

export interface ChartProps {}

const Chart: React.FC<ChartProps> = ({}) => {
  return (
    <View
      style={{
        borderRadius: 12,
        marginBottom: 8,
      }}
    />
  );
};

export default Chart;
