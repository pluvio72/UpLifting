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
  const [bodyWeight, setBodyWeight] = useState<number>();
  const [height, setHeight] = useState<number>();

  const [metrics, setMetrics] = useState<{
    weight: typeof WeightMetrics[number];
    height: typeof HeightMetrics[number];
  }>({weight: 'kg', height: 'cm'});

  const session = useContext(Session);

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
              style={styles.input}
              type={'number'}
              borderTopRightRadius={8}
              borderBottomRightRadius={8}
              onChange={newVal => setHeight(parseInt(newVal, 10))}
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
              style={styles.input}
              type={'number'}
              borderTopRightRadius={8}
              borderBottomRightRadius={8}
              onChange={newVal => setBodyWeight(parseInt(newVal, 10))}
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
