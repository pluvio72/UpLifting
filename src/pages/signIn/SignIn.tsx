import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import BackButton from '../../components/button/backButton';
import {PreAuthScreens, PreAuthStackPL} from '../../constants/navigation';
import {onLogin as OnLogin} from '../../app/App';
import {Button, Heading, Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {Auth} from 'aws-amplify';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props {
  onLogin: OnLogin;
}

type NavigationProps = NativeStackScreenProps<PreAuthStackPL, 'sign_in'>;

const SignIn: React.FC<Props & NavigationProps> = ({
  onLogin,
  navigation,
  route,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(true);

  const goBack = () => {
    navigation.navigate(PreAuthScreens.SignUp);
  };

  useLayoutEffect(() => {
    (async function () {
      if (route.params.username && route.params.password) {
        setUsername(route.params.username);
        setPassword(route.params.password);
        await submit();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.password, route.params.username]);

  const submit = async () => {
    try {
      const user = await Auth.signIn(username, password);
      console.log(`Signing in user: ${user}`);
    } catch (error) {
      console.log(`Signing in error: ${error}`);
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
