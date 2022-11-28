import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Screens} from '../../data/navigation';
import SignUp from '../../pages/signUp';
import registrationContext, {Registration} from '../../contexts/registration';
import SignIn from '../../pages/signIn/SignIn';

interface Props {
  onLogin: (token: string) => void;
}

const PreAuthStack: React.FC<Props> = ({onLogin}) => {
  const Stack = createNativeStackNavigator();

  const [registrationDetails, setRegistrationDetails] = useState<Registration>({
    username: undefined,
    password: undefined,
    email: undefined,
    gym_details: undefined,
  });

  const updateRegistrationDetails = ({
    email,
    username,
    password,
    gym_details,
  }: Registration) => {
    const newDetails = {
      email: email ?? registrationDetails.email,
      username: username ?? registrationDetails.username,
      password: password ?? registrationDetails.password,
      gym_details: gym_details ?? registrationDetails.gym_details,
    };
    setRegistrationDetails(newDetails);
  };

  return (
    <registrationContext.Provider
      value={{
        details: registrationDetails,
        onChange: updateRegistrationDetails,
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.SignUp}
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Screens.SignIn}
          component={() => <SignIn onLogin={onLogin} />}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </registrationContext.Provider>
  );
};

export default PreAuthStack;
