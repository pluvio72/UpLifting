import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Workout} from '../../types/workouts';
import {formatWeightValue} from '../../util/format';
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
  workout: Workout;
  onPressShowMore: (workout: Workout) => void;
}

const HistoryItem: React.FC<Props> = ({workout, onPressShowMore}) => {
  if (workout) {
    return (
      <View style={styles.historyWrapper}>
        <Text style={[Styles.textBold, Styles.textMd, Styles.textCenter]}>
          {workout.title}
        </Text>
        <Row style={{marginRight: 'auto'}}>
          <Chip color={colors.accent}>Total {workout.metrics[0].value}</Chip>
          <Chip color={colors.accentDark} style={{margin: 6}}>
            Sets{' '}
            {workout.exercises.reduce(
              (total, cur) => total + cur.sets.length,
              0,
            )}
          </Chip>
        </Row>
        {workout.exercises.map(exercise => {
          return (
            <View style={styles.historySet} key={exercise.name}>
              <Text style={Styles.textBold}>{exercise.name}</Text>
              <Text>
                Top Set: {formatWeightValue(exercise.sets[0].weight)} x{' '}
                {exercise.sets[0].reps}
              </Text>
            </View>
          );
        })}
        <Button
          color={colors.primary}
          fontSize={12}
          bold
          padding={{p: 8}}
          margin={{mt: 4}}
          onPress={() => onPressShowMore(workout)}>
          Click To View More...
        </Button>
      </View>
    );
  } else {
    return <></>;
  }
};

export default HistoryItem;
