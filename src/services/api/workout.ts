import {Template} from '../../types';
import {ExerciseSet, PR, WorkoutMetric} from '../../types/workouts';
import {Workout} from '../../types/workouts';
import {AuthenticatedRoute, GenericResponse} from './api';

export const getAllWorkouts: AuthenticatedRoute<Array<Workout>> = async (
  username,
  token,
) => {
  return (
    await AuthenticatedRoute<{workouts: Workout[]}>(
      username,
      token,
      'GET',
      `/workouts/${username}`,
    )
  ).workouts;
};

export const getRecentWorkouts: AuthenticatedRoute<Array<Workout>> = async (
  username,
  token,
  limit: number = 3,
) => {
  return (
    await AuthenticatedRoute<{workouts: Workout[]}>(
      username,
      token,
      'GET',
      `/workouts/${username}/recent/${limit}`,
    )
  ).workouts;
};

export const getRecentPRs: AuthenticatedRoute<Array<PR>> = async (
  username,
  token,
  limit = 5,
) => {
  return (
    await AuthenticatedRoute<{prs: Array<PR>}>(
      username,
      token,
      'GET',
      `/workouts/${username}/prs/${limit}`,
    )
  ).prs;
};

export const getTemplates: AuthenticatedRoute<Array<Template>> = async (
  username,
  token,
): Promise<Array<Template>> => {
  const response = await AuthenticatedRoute<{templates: Array<Template>}>(
    username,
    token,
    'GET',
    `/workouts/${username}/templates`,
  );
  return response.templates;
};

export const saveNewWorkout: AuthenticatedRoute<GenericResponse> = async (
  username,
  token,
  title: string,
  workout: Array<ExerciseSet>,
  metrics: Array<WorkoutMetric>,
) => {
  const body = JSON.stringify({
    workout,
    title,
    username,
    metrics,
  });
  return await AuthenticatedRoute(
    username,
    token,
    'POST',
    '/workouts/new',
    body,
  );
};
