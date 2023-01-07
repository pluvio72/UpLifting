import React, {useState} from 'react';
import {ExerciseData} from '../types/workouts';

export const ExerciseContext = React.createContext<{
  exercises: ExerciseData[];
  onUpdate: (newExercises: ExerciseData[]) => void;
}>({
  exercises: [],
  onUpdate: () => {},
});

export const ExerciseProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [exercises, setExercises] = useState<ExerciseData[]>([]);

  return (
    <ExerciseContext.Provider value={{exercises, onUpdate: setExercises}}>
      {children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseContext;
