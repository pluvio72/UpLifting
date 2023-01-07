import {Session} from '../../contexts/session';
import {ExerciseData, Template} from '../../types/workouts';
import {ExerciseSet, PR, WorkoutMetric} from '../../types/workouts';
import {Workout} from '../../types/workouts';
import {AuthenticatedRoute} from './api';

export const getExercises = async (session: Session) => {
  return await AuthenticatedRoute<{exercises: ExerciseData[]}>(
    session,
    'GET',
    '/workouts/exercises',
  );
};

export const getAllWorkouts = async (session: Session) => {
  return await AuthenticatedRoute<{workouts: Workout[]}>(
    session,
    'GET',
    `/workouts/${session.account.username}`,
  );
};

export const getRecentWorkouts = async (
  session: Session,
  limit: number = 3,
) => {
  return await AuthenticatedRoute<{workouts: Workout[]}>(
    session,
    'GET',
    `/workouts/${session.account.username}/recent/${limit}`,
  );
};

export const getRecentPRs = async (session: Session, limit = 5) => {
  return await AuthenticatedRoute<{prs: Array<PR>}>(
    session,
    'GET',
    `/workouts/${session.account.username}/prs/${limit}`,
  );
};

export const getTemplates = async (session: Session) => {
  return await AuthenticatedRoute<{templates: Array<Template>}>(
    session,
    'GET',
    `/workouts/${session.account.username}/templates`,
  );
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
    username: session.account.username,
    metrics,
    isTemplate,
  });
  return await AuthenticatedRoute(session, 'POST', '/workouts/new', body);
};
