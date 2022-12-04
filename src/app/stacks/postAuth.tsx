import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Screens, PostAuthTabs} from '../../data/navigation';
import Charts from '../../pages/charts';
import DetailedChartView from '../../pages/charts/detailedChartView';
import ExerciseList from '../../pages/exerciseList';
import History from '../../pages/history';
import LandingPage from '../../pages/landing';
import NewWorkout from '../../pages/newWorkout';

const HomeStackNav = createNativeStackNavigator();

const HomeStack = () => (
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
  </HomeStackNav.Navigator>
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
    <Tab.Navigator
      initialRouteName={Screens.Landing}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === PostAuthTabs.landing) {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === PostAuthTabs.history) {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === PostAuthTabs.charts) {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === PostAuthTabs.exercise_list) {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === PostAuthTabs.user_profile) {
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
        name={PostAuthTabs.history}
        component={History}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={PostAuthTabs.user_profile}
        component={History}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={PostAuthTabs.landing}
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={PostAuthTabs.charts}
        component={ChartStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={PostAuthTabs.exercise_list}
        component={ExerciseList}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default PostAuthStack;
