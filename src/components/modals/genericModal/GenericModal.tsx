import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {Color, colors} from '../../../util/styles';
import {Button} from 'native-base';

interface ModalAction {
  text: string;
  color: Color;
  onPress: () => void;
}

interface Props {
  isVisible: boolean;
  content: () => JSX.Element;
  onHide: () => void;
  firstAction: ModalAction;
  secondAction?: ModalAction;
}

const GenericModal: React.FC<Props> = ({
  content,
  isVisible,
  onHide,
  firstAction,
  secondAction,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={onHide}>
            <Icon name="close" size={20} />
          </TouchableOpacity>
        </View>
        {content()}
        <View style={styles.buttonContainer}>
          {secondAction && (
            <Button
              color={secondAction.color}
              onPress={secondAction.onPress}
              style={styles.button}
              mb={1.5}>
              {secondAction.text}
            </Button>
          )}
          <Button
            color={firstAction.color}
            style={styles.button}
            onPress={firstAction.onPress}>
            {firstAction.text}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
  },
  closeButtonContainer: {
    marginLeft: 'auto',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default GenericModal;
