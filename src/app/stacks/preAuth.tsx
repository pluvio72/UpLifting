import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Screens} from '../../data/navigation';
import SignUp from '../../pages/signUp';

const PreAuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Group>
      <Stack.Screen name={Screens.SignUp} component={SignUp} />
    </Stack.Group>
  );
};

export default PreAuthStack;
