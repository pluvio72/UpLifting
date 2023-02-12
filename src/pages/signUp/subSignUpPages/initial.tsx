import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View} from 'react-native';
// import {TextInput} from '../../../components/inputs/TextInput';
import Spacer from '../../../components/spacer';
import registrationContext from '../../../contexts/registration';
import {PreAuthScreens} from '../../../constants/navigation';
import {colors} from '../../../util/styles';
import styles from '../signUp.styles';

import {Button, Heading, Input, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onNext: () => void;
}

const InitialSignUp: React.FC<Props> = ({onNext}) => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation<NavigationProp<any, any>>();

  const {onChange} = useContext(registrationContext);

  const submit = () => {
    if (email) {
      onChange({email});
      onNext();
    }
  };

  const goToSignIn = () => {
    navigation.navigate(PreAuthScreens.SignIn);
  };

  return (
    <View style={styles.inputWrapper}>
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
    </View>
  );
};

export default InitialSignUp;
