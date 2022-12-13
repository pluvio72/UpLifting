import {NavigationContainer} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import SessionContext, {Session} from '../contexts/session';
import {PostAuthStack, PreAuthStack} from './stacks';
import EncryptedStorage from 'react-native-encrypted-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const USER_SESSION = 'user_session';

const App: FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function retrieveUserSession() {
      try {
        const _session = await EncryptedStorage.getItem(USER_SESSION);

        if (_session !== null) {
          const data = JSON.parse(_session) as unknown as Session;
          onLogin(data.token, data.username);
        }
      } catch (error) {
        // There was an error on the native side
      }
    }
    retrieveUserSession();
  }, []);

  const onLogin = async (token: string, username: string) => {
    setSession({token, username});
    try {
      await EncryptedStorage.setItem(
        USER_SESSION,
        JSON.stringify({
          token,
          username,
        }),
      );
    } catch (error: any) {
      console.warn(
        `Error storing session data in local storage, ${error.message}.`,
      );
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SessionContext.Provider value={session}>
        <NavigationContainer>
          {session ? <PostAuthStack /> : <PreAuthStack onLogin={onLogin} />}
        </NavigationContainer>
      </SessionContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
