import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  ParamListBase,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Gym} from '../types/gyms';

// !PRE AUTH NAVIGATION TYPES
export const PreAuthScreens = {
  SignUp: 'sign_up',
  SignIn: 'sign_in',
} as const;
export type PreAuthStackPL = {
  [PreAuthScreens.SignUp]: undefined;
  [PreAuthScreens.SignIn]: undefined;
};
export const SignUpScreens = {
  Initial: 'initial_preauth',
  GymSelect: 'gym_select',
  UserDetails: 'user_details',
} as const;
export type SignUpStackPL = {
  [SignUpScreens.Initial]: undefined;
  [SignUpScreens.GymSelect]: {email: string};
  [SignUpScreens.UserDetails]: {email: string; gym: Gym};
};

// !POST AUTH NAVIGATION TYPES
export const PostAuthTabs = {
  Profile: 'profile',
  Charts: 'charts',
  Landing: 'landing',
  Gym: 'gym',
  Friends: 'friends',
} as const;
export type PostAuthStackPL = {
  [PostAuthTabs.Profile]: undefined;
  [PostAuthTabs.Gym]: undefined;
  [PostAuthTabs.Charts]: NavigatorScreenParams<ChartStackPL>;
  [PostAuthTabs.Landing]: NavigatorScreenParams<WorkoutStackPL>;
  [PostAuthTabs.Friends]: NavigatorScreenParams<FriendStackPL>;
};

export const WorkoutStackScreens = {
  Index: 'workout_stack_index',
  NewWorkout: 'new_workout',
  History: 'history',
} as const;
export type WorkoutStackPL = {
  [WorkoutStackScreens.Index]: undefined;
  [WorkoutStackScreens.NewWorkout]: undefined;
  [WorkoutStackScreens.History]: undefined;
};

export const FriendStackScreens = {
  Index: 'friend_stack_index',
  FriendSearch: 'friend_search',
} as const;
export type FriendStackPL = {
  [FriendStackScreens.Index]: undefined;
  [FriendStackScreens.FriendSearch]: {filter: string};
};

export const ChartStackScreens = {
  Index: 'chart_stack_index',
  DetailedChartView: 'detailed_chart_view',
} as const;
export type ChartStackPL = {
  [ChartStackScreens.Index]: undefined;
  [ChartStackScreens.DetailedChartView]: {exerciseName: string};
};

export type SubScreen<
  T extends string,
  K extends ParamListBase,
> = CompositeScreenProps<
  NativeStackScreenProps<K, T>,
  BottomTabScreenProps<PostAuthStackPL>
>;
