import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  Text,
  Pressable,
  Heading,
  Input,
} from 'native-base';
import React, {useContext, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {MetricsItems, Settings} from '../../constants/workout';
import {CurrentWorkout} from '../../contexts/currentWorkout';
import {ExerciseSet, Set} from '../../types/workouts';
import {colors} from '../../util/styles';
import Spacer from '../spacer';
import ExerciseItemSet from './components/ExerciseItemSet';

interface ExerciseItemProps {
  data: Set[];
  exerciseIndex: number;
  name: string;
  pastSets: ExerciseSet['pastSets'];
  addSet: () => void;
  onRemoveExercise: () => void;
  onSelectAddMedia: (exerciseIndex: number) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  data,
  exerciseIndex,
  name,
  pastSets,
  addSet,
  onRemoveExercise,
  // onSelectAddMedia,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const currentWorkout = useContext(CurrentWorkout);

  const toggleCompleted = (setIndex: number) => {
    let newExercises = [...currentWorkout.exercises];
    newExercises[exerciseIndex].sets[setIndex].completed =
      !newExercises[exerciseIndex].sets[setIndex].completed;
    currentWorkout.onChange('exercises', newExercises);
  };

  const updateMetricsValues = () => {
    MetricsItems[0].value =
      data
        .reduce((total, curVal) => {
          return total + (curVal.reps as number);
        }, 0)
        .toString() + ' Reps';

    MetricsItems[1].value =
      data
        .reduce((total, curVal) => {
          if (curVal.reps && curVal.weight) {
            return total + (curVal.reps as number) * (curVal.weight as number);
          }
          return total;
        }, 0)
        .toString() + 'kg';

    // TODO:
    // last exercise vol
    MetricsItems[2].value = '+NA';

    MetricsItems[3].value =
      data
        .reduce((total, curVal) => {
          if (curVal.weight) {
            return total > curVal.weight ? total : (curVal.weight as number);
          } else {
            return total;
          }
        }, 0)
        .toString() + 'kg';
  };

  const onPressSettingsItem = (item: (typeof Settings)[number]) => {
    switch (item) {
      case 'Add Notes':
        setShowNotes(true);
        break;
      case 'Remove Notes':
        setShowNotes(false);
        break;
      case 'Remove Exercise':
        onRemoveExercise();
        break;
      // case 'Add Photo/Video':
      //   onSelectAddMedia(exerciseIndex);
      //   break;
    }
  };

  const onUpdateMetric = (newVal: ExerciseSet['metric']) => {
    let newExercises = [...currentWorkout.exercises];
    newExercises[exerciseIndex].metric = {
      name: newVal.name,
      value: newVal.value,
    };
    currentWorkout.onChange('exercises', newExercises);
  };

  const onUpdateNote = (newVal: string) => {
    let newExercises = [...currentWorkout.exercises];
    newExercises[exerciseIndex].note = newVal;
    currentWorkout.onChange('exercises', newExercises);
  };

  const onUpdateRepsOrWeight = (
    type: 'reps' | 'weight',
    setIndex: number,
    newValue?: number,
  ) => {
    let newExercises = [...currentWorkout.exercises];
    newExercises[exerciseIndex].sets[setIndex][type] = newValue;
    currentWorkout.onChange('exercises', newExercises);
    updateMetricsValues();
  };

  const onRemoveSet = (setIndex: number) => {
    let newExercises = [...currentWorkout.exercises];
    if (newExercises[exerciseIndex].sets.length > 1) {
      newExercises[exerciseIndex].sets = newExercises[
        exerciseIndex
      ].sets.splice(setIndex, 1);
      currentWorkout.onChange('exercises', newExercises);
    } else {
      onRemoveExercise();
    }
  };

  return (
    <Box bg="muted.200" mb={2} shadow={4}>
      <HStack
        alignItems="center"
        justifyContent="space-evenly"
        pb={2}
        px={3}
        pt={3}>
        <Menu trigger={SettingsMenuButton}>
          {Settings.map(setting => (
            <Menu.Item onPress={() => onPressSettingsItem(setting)}>
              {setting}
            </Menu.Item>
          ))}
        </Menu>
        <Menu w="100%" trigger={MetricsMenuButton}>
          {MetricsItems.map(metric => (
            <Menu.Item onPress={() => onUpdateMetric(metric as any)}>
              {metric.name}
            </Menu.Item>
          ))}
        </Menu>
        <Heading w="50%" size="xs">
          {name}
        </Heading>
      </HStack>
      {showNotes && (
        <Input
          multiline
          autoFocus
          borderWidth={0}
          borderBottomWidth={1}
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          maxLength={150}
          onChangeText={newVal => onUpdateNote(newVal)}
          backgroundColor={colors.grey}
          placeholder="Add notes..."
        />
      )}
      <Spacer />
      {data.map((item, index) => (
        <ExerciseItemSet
          key={index}
          index={index}
          repValue={data[index].reps}
          weightValue={data[index].weight}
          onUpdate={(type, index2, newVal) =>
            onUpdateRepsOrWeight(type, index, newVal)
          }
          completed={item.completed}
          toggleComplete={() => toggleCompleted(index)}
          onRemove={() => onRemoveSet(index)}
          pastSets={pastSets}
        />
      ))}
      <Button
        bg={'muted.400'}
        _pressed={{
          bg: 'muted.500',
        }}
        px={2}
        py={1}
        mx={3}
        mb={3}
        mt={2}
        textAlign="center"
        onPress={addSet}>
        Add Set
      </Button>
    </Box>
  );
};

const SettingsMenuButton = (triggerProps: any) => (
  <Pressable {...triggerProps}>
    <Icon size={6} as={FontAwesome} name="cog" />
  </Pressable>
);

const MetricsMenuButton = (triggerProps: any) => (
  <Pressable
    {...triggerProps}
    backgroundColor="primary.400"
    px={2}
    py={1}
    alignItems="center"
    borderRadius={4}>
    <Text fontWeight={'bold'}>Metric</Text>
  </Pressable>
);

export default ExerciseItem;
