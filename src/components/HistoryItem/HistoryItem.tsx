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
    backgroundColor: colors.grey100,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    paddingTop: 12,
    paddingBottom: 6,
  },
  historyWrapper: {
    display: 'flex',
    backgroundColor: 'rgba(150,150,150,0.4)',
    marginBottom: 16,
  },
  detailsWrapper: {
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingBottom: 4,
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
        <Text
          style={[
            Styles.textBold,
            Styles.textMd,
            Styles.textCenter,
            styles.title,
          ]}>
          {workout.title}
        </Text>
        <Row style={styles.detailsWrapper}>
          <Chip color={colors.grey200}>Total {workout.metrics[0].value}</Chip>
          <Chip color={colors.grey200} style={{margin: 6}}>
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
          color={colors.secondary}
          fontSize={12}
          bold
          padding={{p: 8}}
          margin={{m: 8, mt: 4, mb: 14}}
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
