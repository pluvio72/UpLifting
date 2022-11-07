import exercises, {ExerciseCategories, ExerciseNames} from "./exercises";

export type Exercise = typeof ExerciseNames[number];
export type ExerciseData = { name: Exercise, category: ExerciseCategories[] };

export { exercises, ExerciseCategories, ExerciseNames };

export type ExerciseSet = {
  name: Exercise;
  data: Set[]
};

export type Metrics = 'Weight' | 'Volume' | 'Reps';

export type Set = {
  reps: number | string;
  weight: number | string;
  completed: boolean;
};

export default exercises;