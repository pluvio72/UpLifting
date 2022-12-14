import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ExerciseSet} from '../../types/workouts';
import {WorkoutMetric} from '../../types/workouts';
import {colors, Styles} from '../../util/styles';
import Button from '../button';
import Chip from '../chip';
import {Row} from '../Reusable/reusable';

const styles = StyleSheet.create({
  historySet: {
    backgroundColor: colors.grey,
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyWrapper: {
    borderRadius: 16,
    display: 'flex',
    padding: 10,
    backgroundColor: colors.secondary,
    marginBottom: 8,
  },
});

interface Props {
  name: string;
  exercises: ExerciseSet[];
  metrics: WorkoutMetric[];
}

const HistoryItem: React.FC<Props> = ({name, exercises, metrics}) => {
  if (exercises) {
    return (
      <View style={styles.historyWrapper}>
        <Text style={[Styles.textBold, Styles.textMd]}>{name}</Text>
        <Row style={{marginRight: 'auto'}}>
          <Chip color={colors.accent}>Total {metrics[0].value}</Chip>
          <Chip color={colors.accentDark} style={{margin: 6}}>
            Sets {exercises.reduce((total, cur) => total + cur.sets.length, 0)}
          </Chip>
        </Row>
        {exercises.map(exercise => {
          return (
            <View style={styles.historySet} key={exercise.name}>
              <Text style={Styles.textBold}>{exercise.name}</Text>
              <Text>
                Top Set: {exercise.sets[0].weight} x {exercise.sets[0].reps}
              </Text>
            </View>
          );
        })}
        <Button color={colors.primary} bold padding={{p: 8}} margin={{mt: 4}}>
          Click To View More...
        </Button>
      </View>
    );
  } else {
    return <></>;
  }
};

export default HistoryItem;
