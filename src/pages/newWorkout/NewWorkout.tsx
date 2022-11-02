import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import Button from '../../components/button';
import ExerciseItem from '../../components/ExerciseItem';
import {TextInput} from '../../components/inputs/TextInput';
import ExerciseSelectModal from '../../components/modals/exerciseSelect';
import Spacer from '../../components/spacer';
import {Exercise, ExerciseData, ExerciseSet} from '../../data/exercises';
import {colors, Styles} from '../../util/styles';
import styles from './NewWorkout.styles';

const NewWorkout = () => {
  const [title, setTitle] = useState('New Workout');
  const [exercises, setExercises] = useState<Array<ExerciseSet>>([]);

  const [showExerciseSelect, setShowExerciseSelect] = useState(false);

  const toggleExerciseSelect = () => setShowExerciseSelect(!showExerciseSelect);

  // console.log(exercises[0] ? exercises[0]['data'] : 'empt');

  const addExercise = (name: Exercise) => {
    setExercises(prev => [
      ...prev,
      {data: [{weight: '', reps: '', completed: false}], name},
    ]);
  };

  const updateSet = (
    exerciseIndex: number,
    type: 'reps' | 'weight' | 'completed',
    setIndex: number,
    newValue?: string | number,
  ) => {
    setExercises(prev => {
      let newSet = [...prev];
      // if its completed field which is being updated
      // toggle the value
      if (type === 'completed')
        newSet[exerciseIndex]['data'][setIndex]['completed'] =
          !newSet[exerciseIndex]['data'][setIndex]['completed'];
      else newSet[exerciseIndex]['data'][setIndex][type] = newValue as number;
      return newSet;
    });
  };

  const addSet = (exerciseIndex: number) => {
    setExercises(prev => {
      let newSet = [...prev];
      newSet[exerciseIndex]['data'].push({
        weight: '',
        reps: '',
        completed: false,
      });
      return newSet;
    });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setExercises(prev => {
      let selectedExerciseSet = prev[exerciseIndex]['data'];
      let newSet: ExerciseSet[];

      // if set only has one remove the exercise
      if (selectedExerciseSet.length === 1) {
        newSet = [
          ...prev.slice(0, exerciseIndex),
          ...prev.slice(exerciseIndex + 1),
        ];
      } else {
        newSet = [...prev];
        newSet[exerciseIndex]['data'] = [
          ...selectedExerciseSet.slice(0, setIndex),
          ...selectedExerciseSet.slice(setIndex + 1),
        ];
      }

      return [...newSet];
    });
  };

  const finishWorkout = () => {};

  return (
    <KeyboardAvoidingView style={Styles.container}>
      <TextInput onChange={setTitle} defaultValue="New Workout" />
      <Spacer size={1} />
      <Button bold color={colors.primary} onPress={toggleExerciseSelect}>
        Add Exercise
      </Button>
      <View style={styles.exercisesWrapper}>
        {exercises.map((exercise, index) => (
          <ExerciseItem
            addSet={() => addSet(index)}
            name={exercise.name}
            onUpdate={(type, setIndex, newValue) =>
              updateSet(index, type, setIndex, newValue)
            }
            data={exercise.data}
            onRemove={setIndex => removeSet(index, setIndex)}
          />
        ))}
      </View>
      {exercises.length > 0 && (
        <Button
          color={colors.green}
          bold
          fontSize={16}
          textAlign="center"
          onPress={finishWorkout}>
          Finish
        </Button>
      )}
      <ExerciseSelectModal
        show={showExerciseSelect}
        onHide={toggleExerciseSelect}
        onSelect={addExercise}
      />
    </KeyboardAvoidingView>
  );
};

export default NewWorkout;
