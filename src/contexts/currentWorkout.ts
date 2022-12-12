import {createContext} from 'react';
import {Workout} from '../types/workouts';

type CurrentWorkout = Workout & {isTemplate: boolean};

export const CurrentWorkout = createContext<
  CurrentWorkout & {
    onChange: <T extends keyof CurrentWorkout>(
      key: T,
      value: CurrentWorkout[T],
    ) => void;
  }
>({
  title: 'New Workout',
  exercises: [],
  metrics: [{name: 'Volume', value: '0kg'}],
  isTemplate: false,
  onChange: () => {},
});
