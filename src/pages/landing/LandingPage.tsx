import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Button from '../../components/button';
import Chip from '../../components/chip';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import {Row} from '../../components/Reusable/reusable';
import Spacer from '../../components/spacer';
import Session from '../../contexts/session';
import templates from '../../data/mock';
import {PostAuthTabs, RootStackParamList, Screens} from '../../data/navigation';
import {getRecentPRs, getRecentWorkouts} from '../../services/api/workout';
import {PR, Workout} from '../../types/workouts';
import {Styles} from '../../util/styles';
import colors from '../../util/styles/colors';
import ExerciseTemplates from './landingComponents/ExerciseTemplates';
import styles from './LandingPage.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'landing'>;

const LandingPage: React.FC<Props> = ({navigation}) => {
  const [recentWorksouts, setRecentWorkouts] = useState<Array<Workout>>([]);
  const [recentPRs, setRecentPRs] = useState<Array<PR>>([]);

  const session = useContext(Session);

  useEffect(() => {
    getRecentWorkouts(session!.username, session!.token, 2).then(workouts => {
      setRecentWorkouts(workouts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRecentPRs(session!.username, session!.token).then(prs => {
      setRecentPRs(prs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ClickStartNewWorkout = () => {
    navigation.navigate(Screens.NewWorkout);
  };

  const goToHistory = () => {
    navigation.navigate(PostAuthTabs.history as any);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Button
          color={colors.primary}
          bold
          fontSize={14}
          icon="plus"
          iconSize={14}
          iconColor={colors.white}
          padding={{p: 20}}
          onPress={ClickStartNewWorkout}>
          Start New Workout
        </Button>
        <Spacer size={2} />
        <View>
          <Text style={[Styles.textBold, Styles.textMd, {marginLeft: 5}]}>
            History
          </Text>
          <Spacer />
          {recentWorksouts.map((workout, index) => (
            <HistoryItem
              name={workout.title}
              exercises={workout.exercises}
              metrics={workout.metrics}
              key={workout.title + index}
            />
          ))}
        </View>
        <Spacer />
        {recentWorksouts.length > 0 ? (
          <Button
            color={colors.accent}
            fontSize={14}
            bold
            textAlign="center"
            onPress={goToHistory}>
            View History
          </Button>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              marginBottom: 12,
              color: colors.secondary,
            }}>
            No Workout History
          </Text>
        )}
        <Spacer size={2} />
        <View>
          <Row xAlign="flex-start">
            <Text style={[Styles.textBold, Styles.textMd, {marginLeft: 5}]}>
              Templates
            </Text>
          </Row>
          <Spacer />
          <ExerciseTemplates templates={templates} />
        </View>
        <Spacer size={3} />
        <View>
          <Text
            style={[
              Styles.textBold,
              Styles.textMd,
              {marginLeft: 5, marginBottom: 10},
            ]}>
            PRs
          </Text>
          <View>
            {recentPRs.length > 0 ? (
              recentPRs.map((pr, index) => (
                <Row
                  xAlign="space-between"
                  margin={{mb: 8}}
                  padding={{px: 4}}
                  key={pr.date_completed + ' ' + pr.name + index}>
                  <Text>{pr.date_completed}</Text>
                  <Text style={Styles.textBold}>{pr.name}</Text>
                  <Chip color={colors.accent}>
                    {pr.weight}kg x {pr.reps}
                  </Chip>
                </Row>
              ))
            ) : (
              <Text>No PRs</Text>
            )}
          </View>
          <Spacer size={2} />
          {/* <Row xAlign="space-between" margin={{mb: 8}}>
            <Text>10/10/22</Text>
            <Text style={Styles.textBold}>Bench Press (Paused)</Text>
            <Text style={Styles.textBold}>120kg x 10</Text>
          </Row>
          <Row xAlign="space-between">
            <Text>02/08/22</Text>
            <Text style={Styles.textBold}>Squat (Paused)</Text>
            <Text style={Styles.textBold}>180kg x 10</Text>
          </Row> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingPage;
