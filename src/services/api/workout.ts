import {ExerciseSet, WorkoutMetric} from '../../types/workouts';
import {Workout} from '../../types/workouts';
import {uri} from './api';

export const getAllWorkouts = async (
  username: string,
  token: string,
): Promise<Array<Workout>> => {
  try {
    const response = await fetch(uri(`/workouts/${username}`), {
      method: 'GET',
      headers: {
        authorization: `${token} ${username}`,
      },
    });
    const json: any = await response.json();
    return json.workouts;
  } catch (error: any) {
    console.warn(`Error in getAllWorkouts, ${error.message}.`);
    return [];
  }
};

export const getRecentWorkouts = async (
  username: string,
  token: string,
  limit: number = 3,
): Promise<Array<Workout>> => {
  try {
    const response = await fetch(uri(`/workouts/${username}/recent/${limit}`), {
      method: 'GET',
      headers: {
        authorization: `${token} ${username}`,
      },
    });
    const json: any = await response.json();
    return json.workouts;
  } catch (error: any) {
    console.warn(`Error in getRecentWorkouts, ${error.message}.`);
    return [];
  }
};

export const saveNewWorkout = async (
  username: string,
  token: string,
  title: string,
  workout: Array<ExerciseSet>,
  metrics: Array<WorkoutMetric>,
) => {
  try {
    const response = await fetch(uri('/workouts/new'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token} ${username}`,
      },
      body: JSON.stringify({
        workout,
        title,
        username,
        metrics,
      }),
    });
    return await response.json();
  } catch (error: any) {
    console.warn(`Error in saveNewWorkout, ${error.message}.`);
  }
};
