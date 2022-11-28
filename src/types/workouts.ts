import {Exercise, ExerciseSet} from '../data/exercises';

export type Workout = {
  exerciseName: Exercise;
  sets: ExerciseSet[];
  note?: String;
  measurementMetric?: String;
};
