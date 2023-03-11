import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../util/styles';
import {Button, Icon, Input, Row, Text, Modal, Pressable} from 'native-base';
import {ModalProps} from '../modalProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Session from '../../../contexts/session';
import Spacer from '../../spacer';

interface Props extends ModalProps {}

const WeGoJimRequest: React.FC<Props> = ({show, onHide}) => {
  const session = useContext(Session);

  return (
    <Modal isOpen={show} animationPreset="slide" px={2} size="full">
      <Modal.Content p={2} pt={3}>
        <Text textAlign="center">We Go Jim</Text>
        <Row>
          <Text>@joseph wants to go jim</Text>
        </Row>
        <Button colorScheme="gray" onPress={onHide}>
          Cancel
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default WeGoJimRequest;
