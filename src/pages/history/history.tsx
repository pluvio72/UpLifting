import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import WorkoutHistoryModal from '../../components/modals/workoutHistoryModal';
import Session from '../../contexts/session';
import useStartup from '../../hooks/useStartup';
import {getAllWorkouts} from '../../services/api/workout';
import {Workout} from '../../types/workouts';
import {Styles} from '../../util/styles';

const History = () => {
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
  const session = useContext(Session);

  useStartup(() => {
    getAllWorkouts(session!).then(response => {
      setWorkouts(response.workouts);
    });
  });

  const openModal = (workout: Workout) => setSelectedWorkout(workout);
  const closeModal = () => setSelectedWorkout(undefined);

  return (
    <SafeAreaView>
      {selectedWorkout && (
        <WorkoutHistoryModal
          show={selectedWorkout !== undefined}
          workout={selectedWorkout}
          onHide={closeModal}
        />
      )}
      <ScrollView>
        <View style={{padding: 12}}>
          <Text
            style={[
              Styles.textBold,
              Styles.textLg,
              {marginBottom: 12, paddingLeft: 12},
            ]}>
            History
          </Text>
          {workouts.map((workout, index) => (
            <HistoryItem
              workout={workout}
              key={workout.title + ' ' + index}
              onPressShowMore={openModal}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
