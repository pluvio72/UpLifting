import {uri} from './api';

export const getAllWorkouts = async (username: string, token: string) => {
  try {
    const response = await fetch(uri(`/workouts/${username}`), {
      method: 'GET',
      headers: {
        authorization: `${token} ${username}`,
      },
    });
    return await response.json();
  } catch (error: any) {
    console.warn(`Error in getAllWorkouts, ${error.message}.`);
  }
};
