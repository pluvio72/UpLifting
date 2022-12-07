import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button';
import ExerciseItem from '../../components/ExerciseItem';
import {TextInput} from '../../components/inputs/TextInput';
import ExerciseSelectModal from '../../components/modals/exerciseSelect';
import {Row} from '../../components/Reusable/reusable';
import Spacer from '../../components/spacer';
import Session from '../../contexts/session';
import {Exercise, ExerciseSet} from '../../types/workouts';
import {Screens} from '../../data/navigation';
import {saveNewWorkout} from '../../services/api/workout';
import {colors, Styles} from '../../util/styles';
import styles from './NewWorkout.styles';

const NewWorkout = () => {
  const [title, setTitle] = useState('New Workout');
  const [exercises, setExercises] = useState<Array<ExerciseSet>>([]);

  const [showExerciseSelect, setShowExerciseSelect] = useState(false);
  const toggleExerciseSelect = () => setShowExerciseSelect(!showExerciseSelect);

  const session = useContext(Session);

  const navigate = useNavigation<NavigationProp<any, any>>();
  const goBack = () => {
    navigate.navigate(Screens.Landing);
  };

  const addExercise = (name: Exercise) => {
    setExercises(prev => [
      ...prev,
      {
        sets: [{weight: '', reps: '', completed: false}],
        name,
        metric: {name: 'Reps', value: '0'},
      },
    ]);
  };

  const updateSet = (
    exerciseIndex: number,
    type: keyof ExerciseSet['sets'][number] | 'metric' | 'note',
    setIndex?: number,
    newValue?: string | number | ExerciseSet['metric'],
  ) => {
    setExercises(prev => {
      let newSet = [...prev];
      // if its completed field which is being updated
      // toggle the value
      if (type === 'completed') {
        newSet[exerciseIndex].sets[setIndex!].completed =
          !newSet[exerciseIndex].sets[setIndex!].completed;
      } else if (type === 'reps' || type === 'weight') {
        newSet[exerciseIndex].sets[setIndex!][type] = newValue as number;
      } else if (type === 'note') {
        newSet[exerciseIndex].note = newValue as string;
      } else {
        newSet[exerciseIndex].metric = newValue as ExerciseSet['metric'];
      }
      return newSet;
    });
  };

  const addSet = (exerciseIndex: number) => {
    setExercises(prev => {
      let newSet = [...prev];
      newSet[exerciseIndex].sets.push({
        weight: '',
        reps: '',
        completed: false,
      });
      return newSet;
    });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setExercises(prev => {
      let selectedExerciseSet = prev[exerciseIndex].sets;
      let newSet: ExerciseSet[];

      // if set only has one remove the exercise
      if (selectedExerciseSet.length === 1) {
        newSet = [
          ...prev.slice(0, exerciseIndex),
          ...prev.slice(exerciseIndex + 1),
        ];
      } else {
        newSet = [...prev];
        newSet[exerciseIndex].sets = [
          ...selectedExerciseSet.slice(0, setIndex),
          ...selectedExerciseSet.slice(setIndex + 1),
        ];
      }

      return [...newSet];
    });
  };

  const finishWorkout = () => {
    const metrics = [
      {
        name: 'Volume',
        value:
          exercises
            .reduce((total, cur) => {
              return (
                total +
                cur.sets.reduce((subTotal, subCur) => {
                  return (
                    subTotal +
                    (subCur.reps as number) * (subCur.weight as number)
                  );
                }, 0)
              );
            }, 0)
            .toString() + 'kg',
      },
    ];

    saveNewWorkout(
      session?.username!,
      session?.token!,
      title,
      exercises,
      metrics,
    );
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={Styles.container}>
        <Row>
          <TouchableOpacity style={styles.backArrowContainer} onPress={goBack}>
            <Icon name="arrow-back-circle" size={32} />
          </TouchableOpacity>
          <TextInput
            onChange={setTitle}
            placeholder="New Workout"
            style={styles.titleInput}
            backgroundColor={colors.grey400}
            underlineThickness={0}
            fontSize={16}
            maxLength={30}
          />
        </Row>
        <Spacer size={1} />
        <Button bold color={colors.primary} onPress={toggleExerciseSelect}>
          Add Exercise
        </Button>
        <ScrollView style={styles.exercisesWrapper}>
          <View>
            {exercises.map((exercise, index) => (
              <ExerciseItem
                key={exercise.name}
                addSet={() => addSet(index)}
                name={exercise.name}
                onUpdate={(type, setIndex, newValue) =>
                  updateSet(index, type, setIndex, newValue)
                }
                data={exercise.sets}
                onRemove={setIndex => removeSet(index, setIndex)}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.workoutActionsContainer}>
          {exercises.length > 0 && (
            <Button
              color={colors.accent}
              bold
              margin={{mt: 8}}
              fontSize={16}
              textAlign="center"
              onPress={finishWorkout}>
              Finish
            </Button>
          )}
          <Button color={colors.grey300} bold margin={{mt: 8}}>
            Cancel Workout
          </Button>
        </View>
        <ExerciseSelectModal
          show={showExerciseSelect}
          onHide={toggleExerciseSelect}
          onSelect={addExercise}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewWorkout;
