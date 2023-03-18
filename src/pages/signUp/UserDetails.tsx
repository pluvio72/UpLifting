import {Button, Center, Heading, Input} from 'native-base';
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView} from 'react-native';
import BackButton from '../../components/button/backButton';
import {CompositeScreenProps} from '@react-navigation/native';
import {
  PreAuthStackPL,
  SignUpScreens,
  SignUpStackPL,
} from '../../constants/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnSignUp} from '../../app/stacks/PreAuth/stacks/SignUp';

type Props = {
  onSubmit: (payload: OnSignUp) => Promise<boolean>;
};

type NavigationProps = CompositeScreenProps<
  NativeStackScreenProps<SignUpStackPL, 'user_details'>,
  NativeStackScreenProps<PreAuthStackPL>
>;

const UserDetails: React.FC<Props & NavigationProps> = ({
  navigation,
  route,
  onSubmit,
}) => {
  if (!route.params.email && !route.params.gym) {
    throw new Error('Incorrect route params.');
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submit = useCallback(async () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        const success = await onSubmit({
          username,
          password,
          email: route.params.email,
          gym: route.params.gym,
        });

        if (success) {
          navigation.navigate(SignUpScreens.Verify, {username, password});
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    confirmPassword,
    onSubmit,
    password,
    route.params.email,
    route.params.gym,
    username,
  ]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BackButton style={{left: 20}} />
        <Center p={2.5} h="100%">
          <Heading my={4}>Details</Heading>
          <Input
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            w={'100%'}
            mb={1}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="Enter Password"
            w={'100%'}
            mb={1}
            borderRadius={10}
            autoCapitalize={'none'}
            autoComplete={'password'}
            autoCorrect={false}
            secureTextEntry
          />
          <Input
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            style={{width: '100%'}}
            borderRadius={10}
            mb={3}
            autoCapitalize={'none'}
            autoComplete={'password'}
            autoCorrect={false}
            secureTextEntry
          />
          <Button width={'100%'} textAlign="center" onPress={submit}>
            Create
          </Button>
        </Center>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserDetails;
