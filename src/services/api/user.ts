import {Session} from '../../contexts/session';
import {Gym} from '../../types/gyms';
import {User, UserAccount} from '../../types/user';
import {AuthenticatedRoute, UnauthenticatedRoute} from './api';

export const searchUsers = async (session: Session, filter: string) => {
  return await AuthenticatedRoute<{
    users: Array<{
      firstName: string;
      lastName: string;
      username: string;
    }>;
  }>(session, 'POST', '/users/', JSON.stringify({filter}));
};

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

export const sendFriendRequest = async (
  session: Session,
  newFriendUsername: string,
) => {
  return await AuthenticatedRoute<{friend: User}>(
    session,
    'POST',
    '/users/friend/request',
    JSON.stringify({
      username: session.account.username,
      newFriendUsername,
    }),
  );
};

export const acceptFriendRequest = async (
  session: Session,
  newFriendUsername: string,
) => {
  return await AuthenticatedRoute(
    session,
    'POST',
    '/users/friend/request/accept',
    JSON.stringify({
      username: session.account.username,
      friendUsername: newFriendUsername,
    }),
  );
};

export const signIn = async (username: string, password: string) => {
  return await UnauthenticatedRoute<{token: string; account: UserAccount}>(
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
        username: session.account.username,
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
        username: session.account.username,
        data,
      }),
    )
  ).success;
};

export const updateUserAccount = async (
  session: Session,
  data: {
    firstName: string;
    lastName: string;
  },
) => {
  return (
    await AuthenticatedRoute(
      session,
      'POST',
      '/users/update/account',
      JSON.stringify({
        username: session.account.username,
        data,
      }),
    )
  ).success;
};

export const getUserAccount = async (session: Session) => {
  return (
    await AuthenticatedRoute<{user: UserAccount}>(
      session,
      'GET',
      '/users/account',
    )
  ).user;
};

export const validateJWT = async (session: Session) => {
  return (await AuthenticatedRoute(session, 'GET', '/users/validate-jwt'))
    .success;
};
