import React, {useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {
  Color,
  colors,
  MarginStylesheet,
  PaddingStylesheet,
  Styles,
} from '../../util/styles';
import {ChartProps} from './chart';
import {BarChart as BarChartRN} from 'react-native-chart-kit';

interface Props extends ChartProps {
  xAxisLabel?: string;
  yAxisLabel?: string;
  barColor: Color;
  activeBarColor?: Color;
  activeBarIndex?: number;
}

const BarChart: React.FC<Props> = ({
  backgroundColor = colors.accent,
  data,
  barColor = colors.primary,
  activeBarColor,
  activeBarIndex,
  height = 225,
  labels,
  margin,
  padding,
  title,
  xAxisLabel,
  yAxisLabel,
  yAxisSuffix,
  yAxisInterval = 1,
}) => {
  let barColors: Array<() => string> = new Array(data.length).fill(
    () => barColor,
  );
  if (activeBarIndex) barColors[activeBarIndex] = () => activeBarColor!;

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
      <BarChartRN
        data={{
          labels,
          datasets: [
            {
              data,
              colors: barColors,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={height}
        yAxisSuffix={yAxisSuffix!}
        yAxisInterval={yAxisInterval} // optional, defaults to 1
        yAxisLabel={yAxisLabel ?? ''}
        xAxisLabel={xAxisLabel}
        flatColor={true}
        withCustomBarColorFromData={true}
        showBarTops={false}
        withInnerLines={false}
        chartConfig={{
          backgroundColor: backgroundColor,
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `#FFFFFF`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          barPercentage: 0.28,
          style: {
            borderRadius: 10,
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        style={{
          borderRadius: 12,
          ...MarginStylesheet(margin),
          ...PaddingStylesheet(padding),
        }}
      />
    </View>
  );
};

export default BarChart;
