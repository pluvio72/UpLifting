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
    backgroundColor: colors.primary,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginHorizontal: 8,
    borderRadius: 8
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  historyWrapper: {
    display: 'flex',
    backgroundColor: colors.secondary,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.15
  },
  detailsWrapper: {
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 6,
  },
  text: {
    color: colors.grey200,
  }
});

interface Props {
  workout: Workout;
  onPressShowMore: (workout: Workout) => void;
}

const HistoryItem: React.FC<Props> = ({workout, onPressShowMore}) => {
  if (workout) {
    return (
      <View style={styles.historyWrapper}>
        <Row style={styles.detailsWrapper}>
          <Chip color={colors.grey200}>Total {workout.metrics[0].value}</Chip>
          <Chip color={colors.grey200} style={{margin: 6}}>
            Sets{' '}
            {workout.exercises.reduce(
              (total, cur) => total + cur.sets.length,
              0,
            )}
          </Chip>
          <Text
            style={[
              Styles.textBold,
              Styles.textMd,
              Styles.textCenter,
              styles.title,
            ]}>
            {workout.title}
          </Text>
        </Row>
        {workout.exercises.map(exercise => {
          return (
            <View style={styles.historySet} key={exercise.name}>
              <Text style={[Styles.textBold, styles.text]}>{exercise.name}</Text>
              <Text style={styles.text}>
                Top Set: {formatWeightValue(exercise.sets[0].weight)} x{' '}
                {exercise.sets[0].reps}
              </Text>
            </View>
          );
        })}
        <Button
          color={colors.grey600}
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
