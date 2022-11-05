import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ExerciseSet } from '../../data/exercises';
import { colors, Styles } from '../../util/styles';
import Button from '../button';
import Chip from '../chip';
import { Row } from '../Reusable/reusable';

const styles = StyleSheet.create({
  historySet: {
    backgroundColor: colors.grey,
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  historyWrapper: {
    borderRadius: 16,
    display: 'flex',
    padding: 10,
    backgroundColor: colors.secondary,
  },
});

interface Props {
  name: string,
  sets: ExerciseSet[],
  total: number,
}

const HistoryItem: React.FC<Props> = ({
  name,
  sets,
  total,
}) => {
  return (
    <View style={styles.historyWrapper}>
      <Text style={[Styles.textBold, Styles.textMd]}>{name}</Text>
      <Row style={{marginRight: 'auto'}}>
        <Chip color={colors.accent}>Total {total} kg</Chip>
        <Chip color={colors.accentDark}>Sets {sets.length}</Chip>
      </Row>
      {sets.map(set => (
        <View style={styles.historySet}>
          <Text style={Styles.textBold}>{set.name}</Text>
          <Text>Top Set: {set.data[0].weight} x {set.data[0].reps}</Text>
        </View>
      ))}
      <Button color={colors.primary} bold padding={{p: 8}} margin={{mt: 4}}>
        Click To View More...
      </Button>
    </View>
  );
};

export default HistoryItem;
