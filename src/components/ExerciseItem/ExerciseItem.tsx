import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MetricsItems, Settings} from '../../constants/workout';
import {CurrentWorkout} from '../../contexts/currentWorkout';
import {ExerciseSet, Set} from '../../types/workouts';
import {colors, Styles} from '../../util/styles';
import Button from '../button';
import {TextInput} from '../inputs/TextInput';
import {Row} from '../Reusable/reusable';
import Spacer from '../spacer';
import ExerciseItemSet from './components/ExerciseItemSet';
import styles from './ExerciseItem.styles';

const SettingsItems = Settings.map(e => ({name: e}));

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
    <View style={styles.exerciseItem}>
      <Row yAlign="center" padding={{pb: 6, px: 12, pt: 12}}>
        <Dropdown
          style={styles.settingsDropdown}
          placeholderStyle={styles.settingsDropdownText}
          containerStyle={styles.settingsDropdownMenu}
          itemTextStyle={styles.settingsDropdownMenuItem}
          selectedTextStyle={styles.settingsDropdownText}
          renderRightIcon={() => (
            <Row>
              <Icon
                name="cog"
                size={16}
                color={colors.white}
                style={styles.settingsDropdownIcon}
              />
              <Icon name="caret-down" size={16} color={colors.white} />
            </Row>
          )}
          data={SettingsItems}
          labelField={'name'}
          valueField={'name'}
          onChange={newVal => onPressSettingsItem(newVal.name)}
        />
        <Dropdown
          style={styles.metricsDropdown}
          placeholderStyle={styles.metricsDropdownPlaceholder}
          containerStyle={styles.metricsDropdownMenu}
          itemTextStyle={styles.metricsDropdownText}
          selectedTextStyle={styles.metricsDropdownButtonText}
          itemContainerStyle={styles.metricsDropdownItemContainer}
          renderRightIcon={() => (
            <Icon
              name="caret-down"
              size={16}
              color={colors.black}
              style={styles.metricsDropdownIcon}
            />
          )}
          data={MetricsItems}
          labelField={'value'}
          valueField={'value'}
          onChange={newVal => onUpdateMetric(newVal)}
          placeholder="Metric"
        />
        <Text style={[styles.exerciseName, Styles.textCenter]}>{name}</Text>
      </Row>
      {showNotes && (
        <TextInput
          textArea
          autoFocus
          maxLength={150}
          onChange={newVal => onUpdateNote(newVal)}
          backgroundColor={colors.grey}
          style={styles.note}
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
        color={colors.primary}
        padding={{px: 8, py: 4}}
        margin={{mx: 12, mb: 12, mt: 8}}
        bold={true}
        textAlign="center"
        borderRadius={6}
        onPress={addSet}>
        Add Set
      </Button>
    </View>
  );
};

export default ExerciseItem;
