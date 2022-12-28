import {Gym} from './gyms';

export interface UserAccount {
  firstName: string;
  lastName: string;
  username: string;
  gym: Gym;
}
