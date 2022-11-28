import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../../util/styles';
import Button from '../../button';
import {TextInput} from '../../inputs/TextInput';
import {ModalProps} from '../modalProps';

interface Props extends ModalProps {}

const RequestAddGym: React.FC<Props> = ({show, onHide}) => {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');

  return (
    <Modal
      isVisible={show}
      animationIn="slideInUp"
      style={styles.container}
      backdropColor={colors.grey100}>
      <Text style={styles.header}>Add A Gym</Text>
      <TextInput
        style={styles.input}
        borderRadius={8}
        onChange={setBrand}
        value={brand}
        placeholder="Brand (e.g. Pure Gym)"
      />
      <TextInput
        style={styles.input}
        borderRadius={8}
        onChange={setName}
        value={name}
        placeholder="Name (e.g. Pure Gym Acton)"
      />
      <TextInput
        style={styles.input}
        borderRadius={8}
        onChange={setAddress}
        value={address}
        placeholder="Address (e.g. 12 Portchard Road)"
      />
      <TextInput
        style={[styles.input, styles.lastInput]}
        borderRadius={8}
        onChange={setPostCode}
        value={postCode}
        placeholder="Post Code (e.g. 5CD F45)"
      />
      <Button
        textAlign="center"
        bold
        color={colors.accent}
        margin={{mb: 4}}
        onPress={onHide}>
        Add
      </Button>
      <Button textAlign="center" color={colors.grey300} onPress={onHide}>
        Cancel
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey100,
  },
  header: {
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.white,
    padding: 4,
    marginBottom: 4,
  },
  lastInput: {
    marginBottom: 7,
  },
});

export default RequestAddGym;
