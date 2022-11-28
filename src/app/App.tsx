import {NavigationContainer} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import SessionContext, {Session} from '../contexts/session';
import AppStyles from './App.styles';
import {PostAuthStack, PreAuthStack} from './stacks';

const App: FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  const onLogin = (token: string) => {
    setSession({token});
  };

  return (
    <SessionContext.Provider value={session}>
      <NavigationContainer>
        {session ? <PostAuthStack /> : <PreAuthStack onLogin={onLogin} />}
      </NavigationContainer>
    </SessionContext.Provider>
  );
};

export default App;
