export const Screens = {
  Landing: 'landing',
  NewWorkout: 'new_workout',
  History: 'history',
  Charts: 'charts',
  DetailedChartView: 'detailed_chart_view',
  ExerciseList: 'exercise_list',
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
};
