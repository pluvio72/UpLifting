import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import registrationContext from '../../contexts/registration';
import {PreAuthStackPL, PreAuthScreens} from '../../constants/navigation';
import {signUp} from '../../services/api/user';
import {Styles} from '../../util/styles';
import InitialSignUp from './subSignUpPages';
import GymSelect from './subSignUpPages/gymSelect';
import UserDetails from './subSignUpPages/userDetails';

type Props = NativeStackScreenProps<PreAuthStackPL, 'sign_up'>;

const SignUp = ({navigation}: Props) => {
  const {email, gym_details} = useContext(registrationContext).details;

  const [loginStep, setLoginStep] = useState<1 | 2 | 3>(1);

  const proceed = () => {
    setLoginStep((loginStep + 1) as 1 | 2 | 3);
  };

  const goBack = () => {
    setLoginStep((loginStep - 1) as 1 | 2 | 3);
  };

  const submit = async (_username: string, _password: string) => {
    const result = await signUp(_username!, _password!, email!, gym_details!);
    if (result) {
      navigation.navigate(PreAuthScreens.SignIn);
    }
  };

  return (
    <KeyboardAvoidingView style={Styles.container}>
      {loginStep === 1 && <InitialSignUp onNext={proceed} />}
      {loginStep === 2 && <GymSelect onBack={goBack} onNext={proceed} />}
      {loginStep === 3 && <UserDetails goBack={goBack} onSubmit={submit} />}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
