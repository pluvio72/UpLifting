export const Screens = {
  Landing: 'landing',
  NewWorkout: 'new_workout',
  History: 'history',
  Charts: 'charts',
  DetailedChartView: 'detailed_chart_view',
  ExerciseList: 'exercise_list',
  SignUp: 'sign_up',
  SignIn: 'sign_in',
  Profile: 'user_profile',
} as const;

export type RootStackParamList = {
  [Screens.Landing]: undefined;
  [Screens.NewWorkout]: undefined;
  [Screens.History]: undefined;
  [Screens.Charts]: undefined;
  [Screens.DetailedChartView]: {
    exerciseName: string;
  };
  [Screens.ExerciseList]: undefined;
  [Screens.SignUp]: undefined;
  [Screens.SignIn]: undefined;
};

// tabs should be
// profile
// charts
// landing
// gym
// friends

export const PostAuthTabs = {
  Landing: 'Start',
  Charts: 'Charts',
  Profile: 'Profile',
  Gym: 'Gym',
  Friends: 'Friends',
};
