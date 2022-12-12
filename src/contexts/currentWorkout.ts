import {createContext} from 'react';
import {Workout} from '../types/workouts';

export const CurrentWorkout = createContext<Workout>({
  exercises: [],
  metrics: [{name: 'Volume', value: '0kg'}],
  title: 'New Workout',
});
