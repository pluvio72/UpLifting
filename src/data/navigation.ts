export const Screens = {
  Landing: 'landing',
  NewWorkout: 'new_workout',
} as const;

export type RootStackParamList = {
  [Screens.Landing]: undefined,
  [Screens.NewWorkout]: undefined
};