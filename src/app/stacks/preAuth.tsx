import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Screens} from '../../constants/navigation';
import SignUp from '../../pages/signUp';
import registrationContext, {Registration} from '../../contexts/registration';
import SignIn from '../../pages/signIn/SignIn';
import {onLogin as OnLogin} from '../App';

interface Props {
  onLogin: OnLogin;
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
        <Stack.Screen name={Screens.SignUp} options={{headerShown: false}}>
          {props => (
            <SignUp route={props.route} navigation={props.navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen name={Screens.SignIn} options={{headerShown: false}}>
          {() => <SignIn onLogin={onLogin} />}
        </Stack.Screen>
      </Stack.Navigator>
    </registrationContext.Provider>
  );
};

export default PreAuthStack;
