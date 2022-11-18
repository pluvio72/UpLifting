import React, {useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Styles} from '../../util/styles';
import InitialSignUp from './subSignUpPages';
import UserDetails from './subSignUpPages/userDetails';

const SignUp = () => {
  const [loginStep, setLoginStep] = useState<1 | 2>(1);

  const proceedToDetails = () => setLoginStep(2);
  const goBackToInitial = () => {
    setLoginStep(1);
    console.log('Go Back');
  };
  console.log(loginStep);

  return (
    <KeyboardAvoidingView style={Styles.container}>
      {loginStep === 1 ? (
        <InitialSignUp onNext={proceedToDetails} />
      ) : (
        <UserDetails goBack={goBackToInitial} />
      )}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
