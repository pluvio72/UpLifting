import {Gym} from '../../types/gyms';
import {uri} from './api';

export const signUp = async (
  username: string,
  password: string,
  email: string,
  gym_details: Gym,
): Promise<{success: boolean; token: string}> => {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await fetch(uri('/users/sign-up'), {
      method: 'POST',
      headers,
      body: JSON.stringify({
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
    });
    const json = await response.json();
    return json;
  } catch (error: any) {
    console.warn(`Error signing up, ${error.message}.`);
    return {success: false, token: ''};
  }
};

export const signIn = async (
  username: string,
  password: string,
): Promise<{success: boolean; token: string}> => {
  try {
    const response = await fetch(uri('/users/sign-in'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error: any) {
    console.warn(`Error signing in, ${error.message}.`);
    return {success: false, token: ''};
  }
};
