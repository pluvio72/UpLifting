export const Screens = {
  Landing: 'landing',
  NewWorkout: 'new_workout',
  History: 'history',
} as const;

export type RootStackParamList = {
  [Screens.Landing]: undefined,
  [Screens.NewWorkout]: undefined,
  [Screens.History]: undefined,
};