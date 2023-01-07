import {Gym} from './gyms';

export interface UserAccount {
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
