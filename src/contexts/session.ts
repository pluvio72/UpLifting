import React from 'react';
import {UserAccount} from '../types/user';

export type Session = {account: UserAccount} & {
  token: string;
};

const Session = React.createContext<Session | null>(null);

export default Session;
