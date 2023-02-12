import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Chip from '../../components/chip';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import WorkoutHistoryModal from '../../components/modals/workoutHistoryModal';
import Spacer from '../../components/spacer';
import Session from '../../contexts/session';
import {
  PostAuthStackPL,
  PostAuthTabs,
  WorkoutStackPL,
  WorkoutStackScreens,
} from '../../constants/navigation';
import useStartup from '../../hooks/useStartup';
import {
  getRecentPRs,
  getRecentWorkouts,
  getTemplates,
} from '../../services/api/workout';
import {Template} from '../../types/workouts';
import {PR, Workout} from '../../types/workouts';
import colors from '../../util/styles/colors';
import ExerciseTemplates from './landingComponents/ExerciseTemplates';
import styles from './LandingPage.styles';
import {
  Badge,
  Box,
  Button,
  Icon,
  Pressable,
  Row,
  ScrollView,
  Text,
} from 'native-base';
import Ionic from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type Props = CompositeScreenProps<
  NativeStackScreenProps<WorkoutStackPL, 'workout_stack_index'>,
  BottomTabScreenProps<PostAuthStackPL>
>;
const LandingPage: React.FC<Props> = ({navigation}) => {
  const [recentWorkouts, setRecentWorkouts] = useState<Array<Workout>>([]);
  const [recentPRs, setRecentPRs] = useState<Array<PR>>([]);
  const [templates, setTemplates] = useState<Array<Template>>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();

  const session = useContext(Session);
  console.log('Session:', session);

  useStartup(() => {
    getRecentWorkouts(session!, 2).then(response => {
      console.log('Recent Workouts:', response.workouts);
      setRecentWorkouts(response.workouts);
    });
  });

  useStartup(() => {
    getRecentPRs(session!).then(response => setRecentPRs(response.prs));
  });

  useStartup(() => {
    getTemplates(session!).then(response => setTemplates(response.templates));
  });

  const ClickStartNewWorkout = () => {
    navigation.navigate(WorkoutStackScreens.NewWorkout);
  };

  const goToHistory = () => {
    navigation.navigate(WorkoutStackScreens.History as any);
  };

  const openModal = (selected: Workout) => setSelectedWorkout(selected);
  const closeModal = () => setSelectedWorkout(undefined);

  const friendRequests = useCallback(
    () => session?.account.friends.filter(e => e.pending === true) || [],
    [session?.account.friends],
  );

  const goToFriendsPage = () =>
    navigation.navigate(PostAuthTabs.Friends, {
      screen: 'friend_stack_index',
    });

  return (
    <SafeAreaView>
      <WorkoutHistoryModal
        workout={selectedWorkout!}
        show={selectedWorkout !== undefined}
        onHide={closeModal}
      />
      <ScrollView style={styles.container}>
        <Button
          endIcon={<Icon as={Ionic} name="add" size={6} color={colors.white} />}
          px={20}
          py={4}
          shadow={5}
          onPress={ClickStartNewWorkout}>
          Start New Workout
        </Button>
        <Spacer size={2} />
        {friendRequests().length > 0 && (
          <Pressable
            bg="amber.500"
            onPress={goToFriendsPage}
            flexDir="row"
            mx={10}
            py={2}
            px={3}
            mb={4}
            borderRadius={8}
            justifyContent="center"
            alignItems="center">
            <Row alignItems="center" ml="auto">
              <Text fontWeight={500}>New friend request</Text>
              <Icon
                mt={0.5}
                as={Ionic}
                name="chevron-forward"
                size={5}
                color="black"
              />
            </Row>
            <Badge
              ml={'auto'}
              borderRadius={8}
              bg="black"
              _text={{color: 'white'}}>
              {friendRequests().length}
            </Badge>
          </Pressable>
        )}
        <Box>
          <Text fontWeight={600} fontSize={16}>
            We Go Jim
          </Text>
        </Box>
        <Spacer size={2} />
        <Box>
          <Text fontSize={16} fontWeight={600}>
            History
          </Text>
          <Spacer />
          {recentWorkouts &&
            recentWorkouts.map((workout, index) => (
              <HistoryItem
                workout={workout}
                onPressShowMore={openModal}
                key={workout.title + index}
              />
            ))}
        </Box>
        {recentWorkouts && recentWorkouts.length > 0 ? (
          <Button textAlign="center" onPress={goToHistory} bg="light.600">
            View History
          </Button>
        ) : (
          <Text textAlign="center" fontWeight={600} mb={3} color="gray.300">
            No Workout History
          </Text>
        )}
        <Spacer size={2} />
        <Box>
          <Row justifyContent="flex-start">
            <Text fontWeight={600} fontSize={16} ml={1}>
              Templates
            </Text>
          </Row>
          <Spacer />
          <ExerciseTemplates templates={templates} />
        </Box>
        <Spacer size={3} />
        <Box>
          <Text fontWeight={600} fontSize={16} ml={1} mb={2}>
            PRs
          </Text>
          <Box>
            {recentPRs && recentPRs.length > 0 ? (
              recentPRs.map((pr, index) => (
                <Row
                  justifyContent="space-between"
                  mb={2}
                  px={1}
                  key={pr.date_completed + ' ' + pr.name + index}>
                  <Text>{pr.date_completed}</Text>
                  <Text fontWeight={600}>{pr.name}</Text>
                  <Chip color={colors.accent}>
                    {pr.weight}kg x {pr.reps}
                  </Chip>
                </Row>
              ))
            ) : (
              <Text>No PRs</Text>
            )}
          </Box>
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
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingPage;
