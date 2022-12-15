import {Session} from '../../contexts/session';
import {Template} from '../../types';
import {ExerciseSet, PR, WorkoutMetric} from '../../types/workouts';
import {Workout} from '../../types/workouts';
import {AuthenticatedRoute} from './api';

export const getAllWorkouts: AuthenticatedRoute<
  Array<Workout>
> = async session => {
  return (
    await AuthenticatedRoute<{workouts: Workout[]}>(
      session,
      'GET',
      `/workouts/${session.username}`,
    )
  ).workouts;
};

export const getRecentWorkouts: AuthenticatedRoute<Array<Workout>> = async (
  session,
  limit: number = 3,
) => {
  return (
    await AuthenticatedRoute<{workouts: Workout[]}>(
      session,
      'GET',
      `/workouts/${session.username}/recent/${limit}`,
    )
  ).workouts;
};

export const getRecentPRs: AuthenticatedRoute<Array<PR>> = async (
  session,
  limit = 5,
) => {
  return (
    await AuthenticatedRoute<{prs: Array<PR>}>(
      session,
      'GET',
      `/workouts/${session.username}/prs/${limit}`,
    )
  ).prs;
};

export const getTemplates: AuthenticatedRoute<Array<Template>> = async (
  session,
): Promise<Array<Template>> => {
  const response = await AuthenticatedRoute<{templates: Array<Template>}>(
    session,
    'GET',
    `/workouts/${session.username}/templates`,
  );
  return response.templates;
};

export const saveNewWorkout = async (
  session: Session,
  title: string,
  workout: Array<ExerciseSet>,
  isTemplate: boolean,
  metrics: Array<WorkoutMetric>,
) => {
  const body = JSON.stringify({
    workout,
    title,
    username: session.username,
    metrics,
    isTemplate,
  });
  return await AuthenticatedRoute(session, 'POST', '/workouts/new', body);
};
