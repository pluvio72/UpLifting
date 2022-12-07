import React, {CSSProperties} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Margin, Padding} from '../../types/styles';
import {
  colors,
  MarginStylesheet,
  PaddingStylesheet,
  Styles,
} from '../../util/styles';

interface Props {
  backgroundColor?: CSSProperties['color'];
  data: number[];
  height?: number;
  labels: string[];
  margin?: Margin;
  padding?: Padding;
  smooth?: boolean;
  strokeColor?: CSSProperties['color'];
  strokeWidth?: number;
  title: string;
  yAxisSuffix?: string;
  yAxisInterval?: number;
}

const Chart: React.FC<Props> = ({
  backgroundColor = colors.accent,
  data,
  height = 225,
  labels,
  margin,
  padding,
  smooth = true,
  strokeColor = colors.white,
  strokeWidth = 2,
  title,
  yAxisSuffix,
  yAxisInterval = 1,
}) => {
  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 12,
        marginBottom: 8,
      }}>
      <Text
        style={[
          Styles.textBold,
          Styles.textCenter,
          {paddingVertical: 10},
          {color: colors.white},
        ]}>
        {title}
      </Text>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={height}
        yAxisSuffix={yAxisSuffix}
        yAxisInterval={yAxisInterval} // optional, defaults to 1
        chartConfig={{
          labels: ['hi'],
          backgroundColor: backgroundColor,
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: '3',
            strokeWidth,
            stroke: strokeColor,
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        bezier={smooth}
        style={{
          borderRadius: 12,
          ...MarginStylesheet(margin),
          ...PaddingStylesheet(padding),
        }}
      />
    </View>
  );
};

export default Chart;
