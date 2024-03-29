import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {ExerciseCategories} from '../constants/exercises';
import {getExerciseHistory} from '../services/api/workout';

export type Exercise = string;
export type ExerciseData = {name: Exercise; category: ExerciseCategories[]};
export type Metrics = 'Max Weight' | 'Volume' | 'Reps' | 'Volume Increase';

export interface Metric {
  name: Metrics;
  value: string;
}

export interface WorkoutMetric extends Omit<Metric, 'name'> {
  name: string;
}

export type ExerciseSet = {
  name: Exercise;
  sets: Set[];
  metric: Metric;
  note?: string;
  media?: PhotoIdentifier['node'];
  pastSets?: Awaited<ReturnType<typeof getExerciseHistory>>['info'];
};

export type PR = {
  name: Exercise;
  reps: string;
  weight: string;
  date_completed: string;
};

export type Template = {
  name: string;
  exercises: Exercise[];
  maxs: Array<string>;
};

export type Set = {
  reps?: number;
  weight?: number;
  completed: boolean;
};

export type Workout = {
  title: string;
  exercises: ExerciseSet[];
  metrics: WorkoutMetric[];
};
