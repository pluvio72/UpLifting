import { Exercise, Set } from "../data/exercises";

type Template = {
  name: string;
  exercises: Exercise[];
  maxs: Array<string>;
};

export type { Template };