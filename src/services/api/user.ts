import {Session} from '../../contexts/session';
import {Gym} from '../../types/gyms';
import {AuthenticatedRoute, UnauthenticatedRoute} from './api';

export const signUp = async (
  username: string,
  password: string,
  email: string,
  gym_details: Gym,
) => {
  return (
    await UnauthenticatedRoute(
      'POST',
      '/users/sign-up',
      JSON.stringify({
        username: username,
        password: password,
        email: email,
        gym_details: {
          brand: gym_details.brand,
          name: gym_details.name,
          address: gym_details.address,
          post_code: gym_details.post_code,
        },
      }),
    )
  ).success;
};

export const signIn = async (username: string, password: string) => {
  return await UnauthenticatedRoute<{token: string}>(
    'POST',
    '/users/sign-in',
    JSON.stringify({
      username,
      password,
    }),
  );
};

export const updateUserSettings = async (
  session: Session,
  data: {useKilos: boolean},
) => {
  return (
    await AuthenticatedRoute(
      session,
      'POST',
      '/users/update/settings',
      JSON.stringify({
        username: session.username,
        data,
      }),
    )
  ).success;
};

export const updateUserStats = async (
  session: Session,
  data: {
    height: {
      unit: string;
      value: number;
    };
    weight: {
      unit: string;
      value: number;
    };
  },
) => {
  return (
    await AuthenticatedRoute(
      session,
      'POST',
      '/users/update/stats',
      JSON.stringify({
        username: session.username,
        data,
      }),
    )
  ).success;
};
