import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import Session from '../../contexts/session';
import {getAllWorkouts} from '../../services/api/workout';
import {Workout} from '../../types/workouts';
import {Styles} from '../../util/styles';

const History = () => {
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);
  const session = useContext(Session);

  useEffect(() => {
    getAllWorkouts(session!.username, session!.token).then(_workouts => {
      setWorkouts(_workouts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 20}}>
        <Text style={[Styles.textBold, Styles.textLg, {marginBottom: 12}]}>
          History
        </Text>
        {workouts.map(workout => (
          <HistoryItem
            metrics={workout.metrics}
            name={workout.title}
            exercises={workout.exercises}
          />
        ))}
        {/* <HistoryItem
          total={7549}
          name={'Chest & Back'}
          sets={[
            {
              name: 'Bench Press (Barbell)',
              data: [
                {
                  reps: 8,
                  weight: 90,
                  completed: true,
                },
              ],
            },
          ]}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default History;
