import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import Button from '../../../components/button';
import {TextInput} from '../../../components/inputs/TextInput';
import Spacer from '../../../components/spacer';
import registrationContext from '../../../contexts/registration';
import {Screens} from '../../../constants/navigation';
import {colors, Styles} from '../../../util/styles';
import styles from '../signUp.styles';

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
    navigation.navigate(Screens.SignIn);
  };

  return (
    <View style={styles.inputWrapper}>
      <Text style={[Styles.textBold, Styles.textLg, styles.title]}>
        Sign Up
      </Text>
      <TextInput
        onChange={setEmail}
        value={email}
        placeholder="Enter E-Mail"
        borderRadius={8}
        autoCapitalize={'none'}
        style={{width: '100%', paddingVertical: 10}}
        margin={{mb: 6}}
      />
      <Button
        width="100%"
        color={colors.accent}
        textAlign="center"
        padding={{p: 7}}
        icon="arrow-right"
        iconColor={colors.white}
        iconSize={12}
        onPress={submit}>
        Next
      </Button>
      <Spacer withDots padding={{py: 16}} />
      <Button
        color={colors.primary}
        width={'100%'}
        textAlign="center"
        icon="apple"
        iconColor={colors.white}
        margin={{mb: 4}}
        borderRadius={20}>
        Apple
      </Button>
      <Button
        color={colors.green}
        width={'100%'}
        textAlign="center"
        icon="google"
        iconColor={colors.black}
        borderRadius={20}>
        Google
      </Button>
      <Spacer size={3} />
      <Text style={styles.alreadyHaveAccount} onPress={goToSignIn}>
        Already have an account? Sign In
      </Text>
    </View>
  );
};

export default InitialSignUp;
