import {CompositeScreenProps} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Input,
  KeyboardAvoidingView,
  Text,
} from 'native-base';
import React, {useCallback, useState} from 'react';
import {PreAuthStackPL, SignUpStackPL} from '../../constants/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BackButton from '../../components/button/backButton';
import {SafeAreaView} from 'react-native';
import {OnVerify} from '../../app/stacks/PreAuth/stacks/SignUp';

type NavigationProps = CompositeScreenProps<
  NativeStackScreenProps<SignUpStackPL, 'sign_up_verify'>,
  NativeStackScreenProps<PreAuthStackPL>
>;

type Props = {
  onSubmit: (payload: OnVerify) => Promise<boolean>;
};

const VerifySignUp: React.FC<Props & NavigationProps> = ({route, onSubmit}) => {
  if (!route.params.username) {
    throw new Error('Verify page error');
  }

  const [code, setCode] = useState('');

  const handleOnSubmit = useCallback(async () => {
    if (code) {
      await onSubmit({username: route.params.username, code});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, route.params.username]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Center p={2.5} h="100%">
          <BackButton style={{left: 20}} />
          <Box>
            <Text fontSize={16} mb={1.5} bold textAlign="center">
              Verification Code
            </Text>
            <Input
              placeholder="Verification code"
              mb={1.5}
              width="100%"
              onChangeText={setCode}
              value={code}
            />
            <Button onPress={handleOnSubmit}>Submit</Button>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifySignUp;
