import {Gym} from '../../types/gyms';
import {uri} from './api';

export const getGyms = async () => {
  try {
    const response = await fetch(uri('/gyms'));
    const json = await response.json();
    return json.gyms as Array<Gym>;
  } catch (error: any) {
    console.warn(`Error fetching gyms, ${error.message}.`);
  }
};
