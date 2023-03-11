import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreens, SignUpStackPL} from '../../../../constants/navigation';
import {
  GymSelect,
  InitialSignUp,
  UserDetails,
  VerifySignUp,
} from '../../../../pages/signUp';
import {Gym} from '../../../../types/gyms';
import {Auth} from 'aws-amplify';

const Stack = createNativeStackNavigator<SignUpStackPL>();
export type OnSignUp = {
  username: string;
  password: string;
  email: string;
  gym: Gym;
};
export type OnVerify = {
  username: string;
  code: string;
};

const SignUpStack = () => {
  const onVerify = async (payload: OnVerify) => {
    const {code, username} = payload;

    try {
      await Auth.confirmSignUp(username, code);
      console.log(`User ${username} succesfully verified.`);
      return true;
    } catch (error) {
      console.log(`Error in verification code: ${error}`);
      return false;
    }
  };

  const onSignUp = async (payload: OnSignUp) => {
    const {username, password, email, gym} = payload;

    try {
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
        clientMetadata: {
          gym: JSON.stringify(gym),
        },
      });
      console.log(`Sign up: ${user}`);
      return true;
    } catch (error: any) {
      // if username exists show verification code error
      // waht if user is already verified?
      if (error.name === 'UsernameExistsException') {
        return true;
      }
      console.log(`Sign up error: ${error}`);
      return false;
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={SignUpScreens.Initial}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SignUpScreens.Initial} component={InitialSignUp} />
      <Stack.Screen name={SignUpScreens.GymSelect} component={GymSelect} />
      <Stack.Screen name={SignUpScreens.UserDetails}>
        {props => <UserDetails onSubmit={onSignUp} {...props} />}
      </Stack.Screen>
      <Stack.Screen name={SignUpScreens.Verify}>
        {props => <VerifySignUp onSubmit={onVerify} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SignUpStack;
