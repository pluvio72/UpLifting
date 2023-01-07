import {Gym} from '../../types/gyms';
import {UnauthenticatedRoute} from './api';

export const getGyms = async () => {
  return UnauthenticatedRoute<{gyms: Gym[]}>('GET', '/gyms');
};
