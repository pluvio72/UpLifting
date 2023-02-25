import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import BackButton from '../../components/button/backButton';
import {PreAuthScreens} from '../../constants/navigation';
import {signIn} from '../../services/api/user';
import {onLogin as OnLogin} from '../../app/App';
import {Button, Heading, Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onLogin: OnLogin;
}

const SignIn: React.FC<Props> = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(true);

  const navigation = useNavigation<NavigationProp<any, any>>();

  const goBack = () => {
    navigation.navigate(PreAuthScreens.SignUp);
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
        <Heading textAlign={'center'} mb={4}>
          Sign In
        </Heading>
        <Input
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          placeholder="Username"
          InputLeftElement={
            <Icon
              name="ios-person"
              size={20}
              color={'gray'}
              style={{marginLeft: 8}}
            />
          }
          mb={1}
        />
        <Input
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          autoComplete="off"
          mb={3}
          InputRightElement={
            <Icon
              name={showPassword ? 'ios-eye' : 'ios-eye-off'}
              size={20}
              color={'gray'}
              style={{marginRight: 12}}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          placeholder="Password"
          secureTextEntry={showPassword}
        />
        <Button textAlign="center" colorScheme={'primary'} onPress={submit}>
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
});

export default SignIn;
