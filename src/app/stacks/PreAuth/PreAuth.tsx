import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PreAuthScreens, PreAuthStackPL} from '../../../constants/navigation';
import SignIn from '../../../pages/signIn/SignIn';
import {onLogin as OnLogin} from '../../App';
import {SignUpStack} from './stacks';

interface Props {
  onLogin: OnLogin;
}

const PreAuthStack: React.FC<Props> = ({onLogin}) => {
  const Stack = createNativeStackNavigator<PreAuthStackPL>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PreAuthScreens.SignUp}
        options={{headerShown: false}}
        component={SignUpStack}
      />
      <Stack.Screen name={PreAuthScreens.SignIn} options={{headerShown: false}}>
        {props => <SignIn onLogin={onLogin} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PreAuthStack;
