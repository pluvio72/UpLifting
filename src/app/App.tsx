import {NavigationContainer} from '@react-navigation/native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import SessionContext, {onUpdateSession, Session} from '../contexts/session';
import {PostAuthStack, PreAuthStack} from './stacks';
import EncryptedStorage from 'react-native-encrypted-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserAccount} from '../types/user';
import {isValidJWT} from '../util/api';
import {validateJWT} from '../services/api/user';
import Theme from '../util/styles/theme';

// load amplify config file
import {Amplify} from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const USER_SESSION = 'user_session';
export type onLogin = (token: string, account: UserAccount) => Promise<void>;

const App: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  // EncryptedStorage.removeItem(USER_SESSION);

  useEffect(() => {
    async function retrieveUserSession() {
      try {
        const _session = await EncryptedStorage.getItem(USER_SESSION);

        if (_session !== null) {
          const data = JSON.parse(_session) as unknown as Session;

          validateJWT(data).then(async valid => {
            if (isValidJWT(data.token) && valid) {
              onLogin(data.token, data.account);
            } else {
              console.warn('JWT out of date. Log in again.');
              await EncryptedStorage.removeItem(USER_SESSION);
            }
          });
        }
      } catch (error) {
        // There was an error on the native side
      }
    }
    retrieveUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = () => {
    EncryptedStorage.removeItem(USER_SESSION).then(() => {
      setSession(null);
    });
  };

  const updateSession: onUpdateSession = (key, value) =>
    setSession(prev => {
      const newAccountValue = {...prev?.account, [key]: value};
      return {
        ...prev,
        account: newAccountValue,
      } as Session;
    });

  const onLogin: onLogin = useCallback(async (token, account) => {
    console.log('Account:', account);
    setSession({token, account, logOut: onLogout, update: updateSession});
    try {
      await EncryptedStorage.setItem(
        USER_SESSION,
        JSON.stringify({
          token,
          account,
        }),
      );
    } catch (error: any) {
      console.warn(
        `Error storing session data in local storage, ${error.message}.`,
      );
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SessionContext.Provider value={session}>
        <Theme>
          <NavigationContainer>
            {session ? <PostAuthStack /> : <PreAuthStack onLogin={onLogin} />}
          </NavigationContainer>
        </Theme>
      </SessionContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
