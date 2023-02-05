import {Box, Button, Input, Row, Text} from 'native-base';
import React, {useContext, useState} from 'react';
import Session from '../../../../contexts/session';
import {updateUserAccount} from '../../../../services/api/user';
import {colors} from '../../../../util/styles';

const UserAccount = () => {
  const session = useContext(Session);
  const [firstName, setFirstName] = useState<string>(
    session?.account.firstName ?? '',
  );
  const [lastName, setLastName] = useState<string>(
    session?.account.lastName ?? '',
  );

  const onChangeFirstName = (newVal: string) => setFirstName(newVal);
  const onChangeLastName = (newVal: string) => setLastName(newVal);

  const onSave = () => {
    if (firstName && lastName) {
      updateUserAccount(session!, {firstName, lastName});
      session?.update('firstName', firstName);
      session?.update('lastName', lastName);
    }
  };

  return (
    <>
      <Row>
        <Box w="50%">
          <Text fontSize={15} fontWeight={500} textAlign="center" mb={1.5}>
            First Name
          </Text>
          <Input
            borderRadius={8}
            defaultValue={firstName}
            onChangeText={onChangeFirstName}
            p={1}
            value={firstName}
          />
        </Box>
        <Box w="50%">
          <Text fontSize={15} fontWeight={500} textAlign="center" mb={1.5}>
            Last Name
          </Text>
          <Input
            borderRadius={8}
            defaultValue={lastName}
            onChangeText={onChangeLastName}
            p={1}
            ml={1.5}
            value={lastName}
          />
        </Box>
      </Row>
      <Button mt={2.5} w={'100%'} onPress={onSave}>
        Save
      </Button>
    </>
  );
};

export default UserAccount;
