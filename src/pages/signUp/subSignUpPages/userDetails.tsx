import React, {useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import Button from '../../../components/button';
import BackButton from '../../../components/button/backButton';
import {TextInput} from '../../../components/inputs/TextInput';
import {colors} from '../../../util/styles';
import styles from '../signUp.styles';

interface Props {
  goBack: () => void;
}

const UserDetails = ({goBack}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <KeyboardAvoidingView>
      <BackButton onPress={goBack} />
      <View style={styles.detailsWrapper}>
        <TextInput
          onChange={setUsername}
          value={username}
          placeholder="Username"
          style={{width: '100%'}}
          margin={{mb: 8}}
          borderRadius={10}
        />
        <TextInput
          onChange={setPassword}
          value={password}
          placeholder="Enter Password"
          style={{width: '100%'}}
          margin={{mb: 8}}
          borderRadius={10}
        />
        <TextInput
          onChange={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          style={{width: '100%'}}
          borderRadius={10}
          margin={{mb: 8}}
        />
        <Button width={'100%'} textAlign="center" bold color={colors.accent}>
          Create
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserDetails;
