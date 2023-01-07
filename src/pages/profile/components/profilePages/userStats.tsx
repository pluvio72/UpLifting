import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../../../../components/button';
import {TextInput} from '../../../../components/inputs/TextInput';
import {Row} from '../../../../components/Reusable/reusable';
import {HeightMetrics, WeightMetrics} from '../../../../constants/misc';
import Session from '../../../../contexts/session';
import {updateUserStats} from '../../../../services/api/user';
import {colors} from '../../../../util/styles';

const UserStats = () => {
  const session = useContext(Session);
  const [bodyWeight, setBodyWeight] = useState<number>(
    session?.account.stats.weight?.value ?? 0,
  );
  const [height, setHeight] = useState<number>(
    session?.account.stats.height?.value ?? 0,
  );

  const [metrics, setMetrics] = useState<{
    weight: typeof WeightMetrics[number];
    height: typeof HeightMetrics[number];
  }>({
    weight: session?.account.stats.weight?.unit ?? 'kg',
    height: session?.account.stats.height?.unit ?? 'cm',
  });

  const onChangeMetric = (item: {
    name: typeof WeightMetrics[number] | typeof HeightMetrics[number];
  }) => {
    if (WeightMetrics.includes(item.name as any))
      setMetrics(prev => ({...prev, weight: item.name as any}));
    else setMetrics(prev => ({...prev, height: item.name as any}));
  };

  const onSave = () => {
    if (height && bodyWeight) {
      const data = {
        height: {
          unit: metrics.height,
          value: height,
        },
        weight: {
          unit: metrics.weight,
          value: bodyWeight,
        },
      };
      updateUserStats(session!, data).then(success => {});
    }
  };

  return (
    <View style={styles.container}>
      <Row>
        <View style={styles.w50}>
          <Text style={styles.inputLabel}>Height</Text>
          <Row>
            <Dropdown
              data={HeightMetrics.map(e => ({name: e}))}
              labelField={'name'}
              valueField={'name'}
              onChange={onChangeMetric}
              style={styles.metricsDropdown}
              containerStyle={styles.metricsDropdownContainer}
              placeholder={metrics.height}
              value={metrics.height}
            />
            <TextInput
              backgroundColor={colors.white}
              borderBottomRightRadius={8}
              borderTopRightRadius={8}
              defaultValue={height.toString()}
              onChange={newVal => setHeight(parseInt(newVal, 10))}
              type={'number'}
              style={styles.input}
              value={height.toString()}
            />
          </Row>
        </View>
        <View style={styles.w50}>
          <Text style={styles.inputLabel}>Weight</Text>
          <Row>
            <Dropdown
              data={WeightMetrics.map(e => ({name: e}))}
              labelField={'name'}
              valueField={'name'}
              onChange={onChangeMetric}
              style={styles.metricsDropdown}
              containerStyle={styles.metricsDropdownContainer}
              placeholder={metrics.weight}
              value={metrics.weight}
            />
            <TextInput
              backgroundColor={colors.white}
              borderBottomRightRadius={8}
              borderTopRightRadius={8}
              defaultValue={bodyWeight.toString()}
              onChange={newVal => setBodyWeight(parseInt(newVal, 10))}
              style={styles.input}
              type={'number'}
              value={bodyWeight.toString()}
            />
          </Row>
        </View>
      </Row>
      <Button margin={{mt: 10}} color={colors.accent} onPress={onSave}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 8,
  },
  input: {
    width: '70%',
    marginRight: 'auto',
  },
  w50: {
    width: '50%',
  },
  inputTextInput: {
    padding: 6,
    paddingHorizontal: 8,
  },
  metricsDropdown: {
    width: 50,
    backgroundColor: colors.white,
    height: 33,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 8,
  },
  metricsDropdownContainer: {
    width: 100,
    left: 50,
    borderRadius: 8,
  },
});

export default UserStats;
