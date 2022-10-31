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

  const addExercise = (name: Exercise) => {
    setExercises(prev => [
      ...prev,
      {data: [{weight: 0, reps: 0, completed: false}], name},
    ]);
  };

  const updateSet = (
    exerciseIndex: number,
    type: 'reps' | 'weight' | 'completed',
    setIndex: number,
    newValue: number | boolean,
  ) => {
    setExercises(prev => {
      let newSet = [...prev];
      newSet[exerciseIndex]['data'][setIndex][type] = _newValue;
      return newSet;
    });
  };

  const addSet = (exerciseIndex: number) => {
    setExercises(prev => {
      let newSet = [...prev];
      newSet[exerciseIndex]['data'].push({
        weight: 0,
        reps: 0,
        completed: false,
      });
      return newSet;
    })
  }

  return (
    <KeyboardAvoidingView style={Styles.container}>
      <TextInput onChange={setTitle} defaultValue="New Workout" />
      <Spacer size={2} />
      <Button color={colors.primary} onPress={toggleExerciseSelect}>
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
          />
        ))}
      </View>
      <ExerciseSelectModal
        show={showExerciseSelect}
        onHide={toggleExerciseSelect}
        onSelect={addExercise}
      />
    </KeyboardAvoidingView>
  );
};

export default NewWorkout;
