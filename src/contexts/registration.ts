import {createContext} from 'react';
import {Gym} from '../types/gyms';

export type Registration = {
  email?: string;
  username?: string;
  password?: string;
  gym_details?: Gym;
};

export const registrationContext = createContext<{
  details: Registration;
  onChange: ({username, password, email, gym_details}: Registration) => void;
}>({
  details: {
    email: undefined,
    username: undefined,
    password: undefined,
    gym_details: undefined,
  },
  onChange: () => {},
});

export default registrationContext;
