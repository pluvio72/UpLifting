import React, { useState } from 'react';
import {ScrollView, Text, View} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Chart from '../../components/chart';
import { TextInput } from '../../components/inputs/TextInput';
import Spacer from '../../components/spacer';
import { ExerciseNames } from '../../data/exercises';

import {MarginStylesheet, Styles} from '../../util/styles';
import styles from './Charts.styles';

const Charts = () => {
  const [filter, setFilter] = useState('');

  return (
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
        data={ExerciseNames.map(e => ({ name: e }))}
        search={true}
        labelField={"name"}
        valueField={"name"}
        onChange={setFilter}
        inputSearchStyle={styles.chartDropdownInput}
        style={styles.chartDropdown}
        searchPlaceholder='Enter exercise name...'
        placeholder='Seach specific exercise...'
      />
      <Chart
        data={[
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]}
        labels={["January", "February", "March", "April", "May", "June"]}
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
          Math.random() * 100
        ]}
        labels={["January", "February", "March", "April", "May", "June"]}
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
          Math.random() * 100
        ]}
        labels={["January", "February", "March", "April", "May", "June"]}
        yAxisInterval={10}
      />
      <Spacer size={2}/>
    </ScrollView>
  );
};

export default Charts;
