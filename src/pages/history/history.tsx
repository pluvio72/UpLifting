import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import Session from '../../contexts/session';
import useStartup from '../../hooks/useStartup';
import {getAllWorkouts} from '../../services/api/workout';
import {Workout} from '../../types/workouts';
import {Styles} from '../../util/styles';

const History = () => {
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);
  const session = useContext(Session);

  useStartup(() => {
    getAllWorkouts(session!).then(_workouts => {
      setWorkouts(_workouts);
    });
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 20}}>
          <Text style={[Styles.textBold, Styles.textLg, {marginBottom: 12}]}>
            History
          </Text>
          {workouts.map((workout, index) => (
            <HistoryItem
              metrics={workout.metrics}
              name={workout.title}
              exercises={workout.exercises}
              key={workout.title + ' ' + index}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
