import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreens, SignUpStackPL} from '../../../../constants/navigation';
import {GymSelect, InitialSignUp, UserDetails} from '../../../../pages/signUp';
import {Gym} from '../../../../types/gyms';

const Stack = createNativeStackNavigator<SignUpStackPL>();
export type OnSignUp = {
  username: string;
  password: string;
  email: string;
  gym: Gym;
};

const SignUpStack = () => {
  const onSignUp = (payload: OnSignUp) => {
    console.log({payload});
  };

  return (
    <Stack.Navigator initialRouteName={SignUpScreens.Initial}>
      <Stack.Screen name={SignUpScreens.Initial} component={InitialSignUp} />
      <Stack.Screen name={SignUpScreens.GymSelect} component={GymSelect} />
      <Stack.Screen name={SignUpScreens.UserDetails}>
        {props => <UserDetails onSubmit={onSignUp} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SignUpStack;
