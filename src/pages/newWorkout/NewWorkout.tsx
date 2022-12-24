import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
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
import {colors} from '../../util/styles';
import styles from './NewWorkout.styles';
import {CurrentWorkout} from '../../contexts/currentWorkout';
import GenericModal from '../../components/modals/genericModal';

const NewWorkout = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showExerciseSelect, setShowExerciseSelect] = useState(false);
  const toggleExerciseSelect = () => setShowExerciseSelect(!showExerciseSelect);

  const session = useContext(Session);
  const currentWorkout = useContext(CurrentWorkout);

  const navigate = useNavigation<NavigationProp<any, any>>();
  const goBack = () => {
    navigate.navigate(Screens.Landing);
  };

  const addExercise = (name: Exercise) => {
    currentWorkout.onChange('exercises', [
      ...currentWorkout.exercises,
      {
        sets: [{weight: 0, reps: 0, completed: false}],
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
    let value = [...currentWorkout.exercises];
    if (type === 'completed') {
      value[exerciseIndex].sets[setIndex!].completed =
        !value[exerciseIndex].sets[setIndex!].completed;
    } else if (type === 'reps' || type === 'weight') {
      value[exerciseIndex].sets[setIndex!][type] = newValue as number;
    } else if (type === 'note') {
      value[exerciseIndex].note = newValue as string;
    } else {
      value[exerciseIndex].metric = newValue as ExerciseSet['metric'];
    }
    currentWorkout.onChange('exercises', value);
  };

  const addSet = (exerciseIndex: number) => {
    let value = [...currentWorkout.exercises];
    value[exerciseIndex].sets.push({
      weight: 0,
      reps: 0,
      completed: false,
    });
    console.log('Value:', value);
    currentWorkout.onChange('exercises', value);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    let selectedExerciseSet = currentWorkout.exercises[exerciseIndex].sets;
    let value: ExerciseSet[] = [];

    // if set only has one remove the exercise
    if (selectedExerciseSet.length === 1) {
      value = [
        ...currentWorkout.exercises.slice(0, exerciseIndex),
        ...currentWorkout.exercises.slice(exerciseIndex + 1),
      ];
    } else {
      value = [...currentWorkout.exercises];
      currentWorkout.exercises[exerciseIndex].sets = [
        ...selectedExerciseSet.slice(0, setIndex),
        ...selectedExerciseSet.slice(setIndex + 1),
      ];
    }
    currentWorkout.onChange('exercises', value);
  };

  const removeExercise = (exerciseIndex: number) => {
    let value: ExerciseSet[] = [];
    for (let i = 0; i < currentWorkout.exercises.length; i += 1) {
      if (i !== exerciseIndex) {
        value.push(currentWorkout.exercises[i]);
      }
    }
    currentWorkout.onChange('exercises', value);
  };

  const cancelWorkout = () => {
    currentWorkout.clear();
    navigate.navigate(Screens.Landing);
  };

  const showModal = () => setShowConfirmModal(true);
  const hideModal = () => setShowConfirmModal(false);

  const saveAsTemplate = () => {
    currentWorkout.onChange('isTemplate', true);
    save();
  };
  const save = () => {
    const metrics = [
      {
        name: 'Volume',
        value:
          currentWorkout.exercises
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
      session!,
      currentWorkout.title,
      currentWorkout.exercises,
      currentWorkout.isTemplate,
      metrics,
    );
    hideModal();
  };

  const onChangeTitle = (newVal: string) =>
    currentWorkout.onChange('title', newVal);

  const confirmSave = () => (
    <View>
      <Text style={{fontSize: 18, fontWeight: '600'}}>Confirm Save?</Text>
    </View>
  );

  let confirmModalContent = confirmSave;

  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <KeyboardAvoidingView>
          <GenericModal
            isVisible={showConfirmModal}
            onHide={hideModal}
            content={confirmModalContent}
            firstAction={{
              color: colors.green,
              text: 'Save',
              onPress: save,
            }}
            secondAction={{
              color: colors.grey400,
              text: 'Save as Template',
              onPress: saveAsTemplate,
            }}
          />
          <Row style={styles.container}>
            <TouchableOpacity
              style={styles.backArrowContainer}
              onPress={goBack}>
              <Icon name="arrow-back-circle" size={32} />
            </TouchableOpacity>
            <TextInput
              onChange={onChangeTitle}
              placeholder="New Workout"
              style={styles.titleInput}
              backgroundColor={colors.grey400}
              underlineThickness={0}
              fontSize={16}
              maxLength={30}
              borderRadius={8}
              value={currentWorkout.title}
            />
          </Row>
          <View style={styles.container}>
            <Spacer size={1} />
            <Button bold color={colors.primary} onPress={toggleExerciseSelect}>
              Add Exercise
            </Button>
          </View>
          <ScrollView style={styles.exercisesWrapper}>
            <View>
              {currentWorkout.exercises.map((exercise, index) => (
                <ExerciseItem
                  key={exercise.name}
                  addSet={() => addSet(index)}
                  name={exercise.name}
                  onUpdate={(type, setIndex, newValue) =>
                    updateSet(index, type, setIndex, newValue)
                  }
                  data={exercise.sets}
                  onRemove={setIndex => removeSet(index, setIndex)}
                  onRemoveExercise={() => removeExercise(index)}
                />
              ))}
            </View>
          </ScrollView>
          <View style={styles.workoutActionsContainer}>
            {currentWorkout.exercises.length > 0 && (
              <Button
                color={colors.accent}
                bold
                margin={{mt: 8}}
                fontSize={16}
                textAlign="center"
                onPress={showModal}>
                Finish
              </Button>
            )}
            <Button
              color={colors.grey300}
              bold
              margin={{mt: 8}}
              onPress={cancelWorkout}>
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
    </View>
  );
};

export default NewWorkout;
