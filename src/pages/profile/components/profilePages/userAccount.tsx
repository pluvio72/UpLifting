import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../../../components/button';
import {TextInput} from '../../../../components/inputs/TextInput';
import {Row} from '../../../../components/Reusable/reusable';
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
    }
  };

  return (
    <>
      <Row>
        <View style={styles.firstLastNameWrapper}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            borderRadius={8}
            defaultValue={firstName}
            onChange={onChangeFirstName}
            style={styles.input}
            value={firstName}
          />
        </View>
        <View style={styles.firstLastNameWrapper}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            borderRadius={8}
            defaultValue={lastName}
            onChange={onChangeLastName}
            style={[styles.input, {marginLeft: 6}]}
            value={lastName}
          />
        </View>
      </Row>
      <Button
        margin={{mt: 10}}
        width={'100%'}
        onPress={onSave}
        color={colors.accent}>
        Save
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6,
  },
  input: {
    padding: 4,
  },
  firstLastNameWrapper: {
    width: '50%',
  },
});

export default UserAccount;
