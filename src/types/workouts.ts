import {ExerciseCategories, ExerciseNames} from '../data/exercises/exercises';

export type Exercise = typeof ExerciseNames[number];
export type ExerciseData = {name: Exercise; category: ExerciseCategories[]};

export type WorkoutMetric = {
  name: string;
  value: string;
};

export type Metric = {
  name: Metrics;
  value: string;
};

export type ExerciseSet = {
  name: Exercise;
  sets: Set[];
  metric: Metric;
  note?: string;
};

export type Metrics = 'Max Weight' | 'Volume' | 'Reps' | 'Volume Increase';

export type PR = {
  name: Exercise;
  reps: string;
  weight: string;
  date_completed: string;
};

export type Set = {
  reps?: number;
  weight?: number;
  completed: boolean;
};

export type Workout = {
  title: string;
  exercises: ExerciseSet[];
  metrics: [WorkoutMetric];
};
