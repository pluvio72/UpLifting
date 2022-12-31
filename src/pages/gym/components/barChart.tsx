import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Color, colors} from '../../../util/styles';
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';

interface Props {
  activeBarIndex?: number;
  activeBarColor?: Color;
  backgroundColor?: Color;
  barColor?: Color;
  data: Record<string, number>[];
  tickFormat: (string | number)[];
  tickValues: (string | number)[];
  x: string;
  y: string;
}

const BarChart: React.FC<Props> = ({
  activeBarColor,
  activeBarIndex,
  backgroundColor = colors.grey300,
  barColor = colors.primary,
  data,
  tickFormat,
  tickValues,
  x,
  y,
}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <VictoryChart
        width={useWindowDimensions().width - 40}
        height={250}
        domainPadding={{x: 30}}
        padding={{left: 0, right: 0, bottom: 30, top: 10}}
        theme={VictoryTheme.material}>
        <VictoryAxis
          style={{grid: {stroke: 'transparent'}}}
          tickFormat={tickFormat}
          tickValues={tickValues}
        />
        <VictoryBar
          alignment="middle"
          barRatio={1}
          cornerRadius={{top: 2}}
          data={data}
          labelComponent={<VictoryLabel dy={20} />}
          labels={({datum}) => datum[y]}
          style={{
            data: {
              fill: val => {
                if (activeBarIndex !== undefined) {
                  return val.index === activeBarIndex
                    ? activeBarColor!
                    : barColor!;
                } else {
                  return barColor;
                }
              },
            },
            labels: {fill: 'white'},
          }}
          x={x}
          y={y}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 10,
  },
});

export default BarChart;
