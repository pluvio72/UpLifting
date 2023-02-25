import {Gym} from './gyms';

export const UserAccountMetricsSettings = ['KG', 'LB'];

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  settings: {
    useKilos: boolean;
  };
  stats: {
    height?: {
      unit: 'cm' | 'ft';
      value: number;
    };
    weight?: {
      unit: 'kg' | 'lb';
      value: number;
    };
  };
  gym: Gym;
}

export interface UserAccount extends User {
  friends: Array<{user: User} & {pending: boolean}>;
}

export type Friend = UserAccount['friends'][number];
