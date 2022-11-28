import React from 'react';

export type Session = {
  token: string;
};

const Session = React.createContext<Session | null>(null);

export default Session;
