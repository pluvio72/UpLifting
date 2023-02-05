import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ExerciseItem from '../../components/ExerciseItem';
import ExerciseSelectModal from '../../components/modals/exerciseSelect';
import Session from '../../contexts/session';
import {Exercise, ExerciseSet} from '../../types/workouts';
import {Screens} from '../../constants/navigation';
import {getExerciseHistory, saveNewWorkout} from '../../services/api/workout';
import {colors} from '../../util/styles';
import {CurrentWorkout} from '../../contexts/currentWorkout';
import GenericModal from '../../components/modals/genericModal';
import CameraRollModal from '../../components/modals/cameraRollModal';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {
  Box,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Row,
  Text,
  Button,
  ScrollView,
} from 'native-base';

const NewWorkout = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showExerciseSelect, setShowExerciseSelect] = useState(false);

  const [showPhotoSelect, setShowPhotoSelect] = useState(false);
  const [exerciseToAddPhotoTo, setExerciseToAddPhotoTo] = useState<number>();

  const toggleExerciseSelect = () => setShowExerciseSelect(!showExerciseSelect);

  const session = useContext(Session);
  const currentWorkout = useContext(CurrentWorkout);

  const navigate = useNavigation<NavigationProp<any, any>>();
  const goBack = () => {
    navigate.navigate(Screens.Landing);
  };

  const onAddPhoto = (item: PhotoIdentifier['node']) => {
    let newExercises = [...currentWorkout.exercises];
    newExercises[exerciseToAddPhotoTo!].media = item;
    currentWorkout.onChange('exercises', newExercises);
  };

  const addExercise = async (name: Exercise) => {
    const exerciseHistory = await (
      await getExerciseHistory(session!, name)
    ).info;

    currentWorkout.onChange('exercises', [
      ...currentWorkout.exercises,
      {
        sets: [{weight: 0, reps: 0, completed: false}],
        name,
        metric: {name: 'Reps', value: '0'},
        pastSets: exerciseHistory,
      },
    ]);
  };

  const addSet = (exerciseIndex: number) => {
    let value = [...currentWorkout.exercises];
    value[exerciseIndex].sets.push({
      weight: undefined,
      reps: undefined,
      completed: false,
    });
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
    <Box>
      <Text style={{fontSize: 18, fontWeight: '600'}}>Confirm Save?</Text>
    </Box>
  );

  let confirmModalContent = confirmSave;

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView>
        <CameraRollModal
          onSelect={onAddPhoto}
          onHide={() => {
            setShowPhotoSelect(false);
          }}
          show={showPhotoSelect}
        />
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
        <Row px={2}>
          <Pressable mr={1} onPress={goBack}>
            <Icon as={Ionicon} size={10} name="arrow-back-circle" />
          </Pressable>
          <Input
            onChangeText={onChangeTitle}
            flexGrow={1}
            textAlign="center"
            placeholder="New Workout"
            fontSize={16}
            borderRadius={8}
            value={currentWorkout.title}
          />
        </Row>
        <Box px={2} mt={1} mb={2}>
          <Button onPress={toggleExerciseSelect}>Add Exercise</Button>
        </Box>
        <ScrollView h="100%">
          <Box>
            {currentWorkout.exercises.map((exercise, index) => (
              <ExerciseItem
                addSet={() => addSet(index)}
                data={exercise.sets}
                pastSets={exercise.pastSets ?? []}
                exerciseIndex={index}
                key={exercise.name + index}
                name={exercise.name}
                onRemoveExercise={() => removeExercise(index)}
                onSelectAddMedia={exerciseIndex => {
                  setShowPhotoSelect(true);
                  setExerciseToAddPhotoTo(exerciseIndex);
                }}
              />
            ))}
          </Box>
        </ScrollView>
        <Box mt={'auto'} px={1} pb={1}>
          {currentWorkout.exercises.length > 0 && (
            <Button mt={8} mb={1} textAlign="center" onPress={showModal}>
              Finish
            </Button>
          )}
          <Button colorScheme={'gray'} onPress={cancelWorkout}>
            Cancel Workout
          </Button>
        </Box>
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
