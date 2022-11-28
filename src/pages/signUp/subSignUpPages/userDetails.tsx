import React, {useContext, useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, Text, View} from 'react-native';
import Button from '../../../components/button';
import BackButton from '../../../components/button/backButton';
import {TextInput} from '../../../components/inputs/TextInput';
import registrationContext from '../../../contexts/registration';
import {colors} from '../../../util/styles';
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
          <Text style={styles.detailsHeader}>Details</Text>
          <TextInput
            onChange={setUsername}
            value={username}
            placeholder="Username"
            style={{width: '100%'}}
            margin={{mb: 4}}
            borderRadius={10}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <TextInput
            onChange={setPassword}
            value={password}
            placeholder="Enter Password"
            style={{width: '100%'}}
            margin={{mb: 4}}
            borderRadius={10}
            autoCapitalize={'none'}
            autoComplete={'password'}
            autoCorrect={false}
            secureTextEntry
          />
          <TextInput
            onChange={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            style={{width: '100%'}}
            borderRadius={10}
            margin={{mb: 8}}
            autoCapitalize={'none'}
            autoComplete={'password'}
            autoCorrect={false}
            secureTextEntry
          />
          <Button
            width={'100%'}
            textAlign="center"
            bold
            color={colors.accent}
            onPress={submit}>
            Create
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserDetails;
