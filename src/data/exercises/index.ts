import exercises, {ExerciseCategories, ExerciseNames} from './exercises';

export type Exercise = typeof ExerciseNames[number];
export type ExerciseData = {name: Exercise; category: ExerciseCategories[]};

export {exercises, ExerciseCategories, ExerciseNames};

export type ExerciseSet = {
  name: Exercise;
  data: Set[];
  metric: {
    name: Metrics;
    value: string;
  };
};

export type Metrics = 'Max Weight' | 'Volume' | 'Reps' | 'Volume Increase';

export type Set = {
  reps: number | string;
  weight: number | string;
  completed: boolean;
};

export default exercises;
