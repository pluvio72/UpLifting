import {Button, Heading, Input} from 'native-base';
import React, {useContext, useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, View} from 'react-native';
import BackButton from '../../../components/button/backButton';
import registrationContext from '../../../contexts/registration';
import styles from '../signUp.styles';

interface Props {
  goBack: () => void;
  onSubmit: (username: string, password: string) => void;
}

const UserDetails = ({goBack, onSubmit}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {onChange} = useContext(registrationContext);

  const submit = () => {
    console.log('Submitting');
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        onChange({username, password});
        onSubmit(username, password);
      }
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <BackButton onPress={goBack} style={{left: 20}} />
        <View style={styles.detailsWrapper}>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserDetails;
