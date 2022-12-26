import React, {createContext, PropsWithChildren, useState} from 'react';
import {Workout} from '../types/workouts';

export type CurrentWorkout = Workout & {isTemplate: boolean};

export const CurrentWorkout = createContext<
  CurrentWorkout & {
    onChange: <T extends keyof CurrentWorkout>(
      key: T,
      value: CurrentWorkout[T],
    ) => void;
    clear: () => void;
  }
>({
  title: '',
  exercises: [],
  metrics: [{name: 'Volume', value: '0kg'}],
  isTemplate: false,
  onChange: () => {},
  clear: () => {},
});

export const CurrentWorkoutProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentWorkout, setCurrentWorkout] = useState<CurrentWorkout>({
    exercises: [],
    isTemplate: false,
    metrics: [{name: 'Volume', value: '0kg'}],
    title: '',
  });

  return (
    <CurrentWorkout.Provider
      value={{
        ...currentWorkout,
        onChange: (key, value) => {
          console.log('Key:', key);
          console.log('Value:', value);
          setCurrentWorkout(prev => ({
            ...prev,
            [key]: value,
          }));
        },
        clear: () =>
          setCurrentWorkout({
            exercises: [],
            metrics: [{name: 'Volume', value: '0kg'}],
            isTemplate: false,
            title: '',
          }),
      }}>
      {children}
    </CurrentWorkout.Provider>
  );
};
