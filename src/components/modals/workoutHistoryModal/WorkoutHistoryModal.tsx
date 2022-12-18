import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Workout} from '../../../types/workouts';
import {Row} from '../../Reusable/reusable';
import {ModalProps} from '../modalProps';
import styles from './WorkoutHistoryModal.styles';

interface Props {
  workout?: Workout;
}

const WorkoutHistoryModal: React.FC<ModalProps & Props> = ({
  onHide,
  show,
  workout,
}) => {
  return (
    <Modal isVisible={show} onBackdropPress={onHide}>
      <View style={styles.container}>
        <Text style={styles.header}>{workout?.title}</Text>
        {workout?.exercises.map(exercise => {
          return (
            <View style={styles.exerciseContainer}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              {exercise.sets.map(set => (
                <Row xAlign="space-between" style={styles.set}>
                  <Text style={styles.setText}>{set.reps}</Text>
                  <Text style={styles.setText}>x</Text>
                  <Text style={styles.setText}>{set.weight}kg</Text>
                </Row>
              ))}
            </View>
          );
        })}
      </View>
    </Modal>
  );
};

export default WorkoutHistoryModal;
