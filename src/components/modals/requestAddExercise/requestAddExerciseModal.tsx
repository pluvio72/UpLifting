import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../../util/styles';
import Button from '../../button';
import {TextInput} from '../../inputs/TextInput';
import {ModalProps} from '../modalProps';

interface Props extends ModalProps {}

const RequestAddExerciseModal: React.FC<Props> = ({show, onHide}) => {
  const [name, setName] = useState('');

  return (
    <Modal
      isVisible={show}
      animationIn="slideInUp"
      style={styles.container}
      onBackdropPress={onHide}>
      <TextInput
        onChange={setName}
        value={name}
        backgroundColor={colors.grey800}
        borderRadius={6}
        style={styles.input}
        textColor={colors.white}
        placeholder="Enter exercise name..."
      />
      <Button onPress={onHide} color={colors.primary} style={styles.button}>
        Request
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.white,
    marginVertical: '90%',
    padding: 20,
  },
  input: {
    marginBottom: 4,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

export default RequestAddExerciseModal;
