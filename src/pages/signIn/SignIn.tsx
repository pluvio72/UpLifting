import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/button';
import BackButton from '../../components/button/backButton';
import {TextInput} from '../../components/inputs/TextInput';
import {Screens} from '../../data/navigation';
import {signIn} from '../../services/api/user';
import {colors} from '../../util/styles';
import {onLogin as OnLogin} from '../../app/App';

interface Props {
  onLogin: OnLogin;
}

const SignIn: React.FC<Props> = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProp<any, any>>();

  const goBack = () => {
    navigation.navigate(Screens.SignUp);
  };

  const submit = async () => {
    const result = await signIn(username, password);
    console.log('Result:', result);
    if (result.success) {
      onLogin(result.token, result.account);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton onPress={goBack} style={{marginLeft: 20}} />
        <Text style={styles.header}>Sign-In</Text>
        <TextInput
          onChange={setUsername}
          value={username}
          autoCapitalize="none"
          autoComplete="off"
          borderRadius={8}
          margin={{mb: 6}}
          placeholder="Username"
        />
        <TextInput
          onChange={setPassword}
          value={password}
          autoCapitalize="none"
          autoComplete="off"
          borderRadius={8}
          margin={{mb: 6}}
          placeholder="Password"
          secureTextEntry
        />
        <Button textAlign="center" color={colors.accent} onPress={submit}>
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 12,
  },
});

export default SignIn;
