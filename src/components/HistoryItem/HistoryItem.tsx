import {Text, Box, HStack, Pressable} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Workout} from '../../types/workouts';
import {formatWeightValue} from '../../util/format';

interface Props {
  workout: Workout;
  onPressShowMore: (workout: Workout) => void;
}

const HistoryItem: React.FC<Props> = ({workout, onPressShowMore}) => {
  if (workout) {
    return (
      <Box bg="muted.200" rounded="xl" mb={2}>
        <HStack alignItems={'center'} justifyContent={'center'} p={2}>
          <HStack bg="primary.300" px={3} py={1} rounded="xl">
            <Text>Total {workout.metrics[0].value}</Text>
          </HStack>
          <HStack bg="primary.300" px={3} ml={2} py={1} rounded="xl">
            <Text>
              Sets{' '}
              {workout.exercises.reduce(
                (total, cur) => total + cur.sets.length,
                0,
              )}
            </Text>
          </HStack>
          <Text textAlign={'center'} mx={'auto'} fontWeight="600" fontSize={16}>
            {workout.title}
          </Text>
        </HStack>
        {workout.exercises.map(exercise => {
          return (
            <HStack
              justifyContent={'space-between'}
              px={3}
              py={1.5}
              mb={0.5}
              bg="muted.500"
              key={exercise.name}>
              <Text fontWeight="500" color="muted.200">
                {exercise.name}
              </Text>
              <Text color="muted.200" fontWeight="400">
                Top Set: {formatWeightValue(exercise.sets[0].weight!)} x{' '}
                {exercise.sets[0].reps}
              </Text>
            </HStack>
          );
        })}
        <Pressable
          onPress={() => onPressShowMore(workout)}
          alignItems={'center'}
          pb={2}
          pt={1}>
          <HStack mx={'auto'} justifyContent={'center'}>
            <Icon color="grey" name="arrow-down" size={20} />
            <Text color="muted.500">View More</Text>
            <Icon color="grey" name="arrow-down" size={20} />
          </HStack>
        </Pressable>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default HistoryItem;
