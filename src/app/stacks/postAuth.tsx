import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {CurrentWorkoutProvider} from '../../contexts/currentWorkout';
import {Screens, PostAuthTabs} from '../../constants/navigation';
import Charts from '../../pages/charts';
import DetailedChartView from '../../pages/charts/detailedChartView';
// import ExerciseList from '../../pages/exerciseList';
// import History from '../../pages/history';
import LandingPage from '../../pages/landing';
import NewWorkout from '../../pages/newWorkout';
import Profile from '../../pages/profile';
import Gym from '../../pages/gym';
import Friends from '../../pages/friends';
import FriendSearch from '../../pages/friends/friendsPages/friendSearch';
import History from '../../pages/history';
import {ExerciseProvider} from '../../contexts/exercises';

const HomeStackNav = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <CurrentWorkoutProvider>
      <HomeStackNav.Navigator>
        <HomeStackNav.Screen
          name={Screens.Landing}
          component={LandingPage}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNav.Screen
          name={Screens.NewWorkout}
          component={NewWorkout}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNav.Screen name={Screens.History} component={History} />
      </HomeStackNav.Navigator>
    </CurrentWorkoutProvider>
  );
};

const FriendsStack = createNativeStackNavigator();
const FriendStack = () => (
  <FriendsStack.Navigator>
    <FriendsStack.Screen
      options={{
        headerShown: false,
      }}
      name={PostAuthTabs.Gym}
      component={Friends}
    />
    <FriendsStack.Screen
      options={{headerTitle: 'Search'}}
      name={Screens.FriendSearch}
      component={FriendSearch}
    />
  </FriendsStack.Navigator>
);

const ChartsStack = createNativeStackNavigator();
const ChartStack = () => (
  <ChartsStack.Navigator>
    <ChartsStack.Screen
      name={Screens.Charts}
      component={Charts}
      options={{headerShown: false}}
    />
    <ChartsStack.Screen
      name={Screens.DetailedChartView}
      component={DetailedChartView}
      options={{headerTitle: 'Detailed View'}}
    />
  </ChartsStack.Navigator>
);

const Tab = createBottomTabNavigator();
const PostAuthStack = () => {
  return (
    <ExerciseProvider>
      <Tab.Navigator
        initialRouteName={PostAuthTabs.Landing}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;

            if (route.name === PostAuthTabs.Landing) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === PostAuthTabs.Gym) {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === PostAuthTabs.Charts) {
              iconName = focused ? 'pie-chart' : 'pie-chart-outline';
            } else if (route.name === PostAuthTabs.Friends) {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === PostAuthTabs.Profile) {
              iconName = focused ? 'person' : 'person-outline';
            }
            return (
              <Icon
                name={iconName as string}
                size={focused ? 26 : 20}
                color={focused ? 'black' : 'grey'}
              />
            );
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name={PostAuthTabs.Profile}
          component={Profile}
          options={{headerShown: false, unmountOnBlur: true}}
        />
        <Tab.Screen
          name={PostAuthTabs.Charts}
          component={ChartStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name={PostAuthTabs.Landing}
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name={PostAuthTabs.Gym}
          component={Gym}
          options={{headerShown: false, unmountOnBlur: true}}
        />
        <Tab.Screen
          name={PostAuthTabs.Friends}
          component={FriendStack}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </ExerciseProvider>
  );
};

export default PostAuthStack;
