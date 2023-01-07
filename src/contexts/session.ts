import React from 'react';
import {UserAccount} from '../types/user';

export type onUpdateSession = <T extends keyof UserAccount>(
  key: T,
  value: UserAccount[T],
) => void;

export type Session = {
  account: UserAccount;
  logOut: () => void;
  token: string;
  update: onUpdateSession;
};

const Session = React.createContext<Session | null>(null);

export default Session;
