import {CompositeScreenProps} from '@react-navigation/native';
import React, {useState} from 'react';
// import {TextInput} from '../../../components/inputs/TextInput';
import Spacer from '../../components/spacer';
import {
  PreAuthScreens,
  PreAuthStackPL,
  SignUpScreens,
  SignUpStackPL,
} from '../../constants/navigation';
import {colors} from '../../util/styles';

import {Button, Center, Heading, Input, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  NativeStackScreenProps<SignUpStackPL, 'initial_preauth'>,
  NativeStackScreenProps<PreAuthStackPL>
>;

const InitialSignUp: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');

  const submit = () => {
    if (email) {
      navigation.navigate(SignUpScreens.GymSelect, {email});
    }
  };

  const goToSignIn = () => {
    navigation.navigate(PreAuthScreens.SignIn);
  };

  return (
    <Center p={2.5} h="100%">
      <Heading my={2}>Sign Up</Heading>
      <Input
        onChangeText={setEmail}
        value={email}
        autoCapitalize={'none'}
        placeholder="E-Mail"
        mx="3"
        w="100%"
        my={1}
      />
      <Button
        w="100%"
        onPress={submit}
        endIcon={<Icon name="ios-arrow-forward" size={20} color="white" />}>
        Next
      </Button>
      <Spacer withDots padding={{py: 16}} />
      <Button
        colorScheme="light"
        w="100%"
        mb={1}
        endIcon={<Icon name="ios-logo-apple" size={20} color="white" />}>
        Apple
      </Button>
      <Button
        colorScheme="dark"
        _text={{color: colors.black}}
        w="100%"
        endIcon={<Icon name="ios-logo-google" size={20} color="black" />}>
        Google
      </Button>
      <Spacer size={3} />
      <Text color={colors.blue} fontWeight="500" onPress={goToSignIn}>
        Already have an account? Sign In
      </Text>
    </Center>
  );
};

export default InitialSignUp;
