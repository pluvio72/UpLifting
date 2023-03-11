import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../util/styles';
import {Button, Icon, Input, Row, Text, Modal, Pressable} from 'native-base';
import {ModalProps} from '../modalProps';
import {useFriendManager} from '../../../hooks/useFriendManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Session from '../../../contexts/session';
import DateInput from '../../inputs/DateInput';
import Spacer from '../../spacer';
import {Friend} from '../../../types/user';

interface Props extends ModalProps {}

const WeGoJim: React.FC<Props> = ({show, onHide}) => {
  const session = useContext(Session);
  const {friends} = useFriendManager(session!);
  const [filter, setFilter] = useState('');
  const [suggestedDate, setSuggestedDate] = useState(new Date());
  const [selectedFriends, setSelectedFriends] = useState<Array<string>>([]);

  const selectFriend = useCallback(
    (friend: Friend) => {
      const index = selectedFriends.findIndex(e => e === friend.user.username);
      if (index === -1) {
        setSelectedFriends(prev => {
          const newVal = [...prev];
          newVal.push(friend.user.username);
          return newVal;
        });
      } else {
        setSelectedFriends(prev => {
          const firstHalf = prev.slice(0, index);
          const secondHalf = prev.slice(index + 1);
          return [...firstHalf, ...secondHalf];
        });
      }
    },
    [selectedFriends],
  );

  const submit = () => {
    // sendEvent('weGoJim', {
    //   friends: selectedFriends,
    //   date_suggested: suggestedDate,
    // });
    // onHide();
  };

  return (
    <Modal isOpen={show} animationPreset="slide" px={2} size="full">
      <Modal.Content p={2} pt={3}>
        <Text style={styles.header}>We Go Jim</Text>
        <DateInput
          value={suggestedDate}
          onChangeValue={newVal => setSuggestedDate(newVal)}
        />
        <Input
          value={filter}
          onChangeText={setFilter}
          autoCapitalize="none"
          autoComplete="off"
          placeholder="Search friends..."
          mb={2}
          mt={1}
        />
        {friends
          .slice(0, 6)
          .filter(e =>
            e.user.username.toLowerCase().includes(filter.toLowerCase()),
          )
          .map(friend => {
            const isSelected = selectedFriends.find(
              e => e === friend.user.username,
            );

            return (
              <Pressable onPress={() => selectFriend(friend)}>
                <Row
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  py={1}
                  px={1}>
                  <Text fontWeight={isSelected ? '600' : '500'}>
                    @{friend.user.username}
                  </Text>
                  <Icon
                    as={Ionicons}
                    name="checkmark-circle"
                    size={6}
                    color={isSelected ? 'primary.400' : 'gray.400'}
                  />
                </Row>
              </Pressable>
            );
          })}
        <Spacer />
        <Button textAlign="center" onPress={submit} mt={2}>
          We Go
        </Button>
        <Button textAlign="center" bg="gray.400" onPress={onHide} mt={1}>
          Cancel
        </Button>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default WeGoJim;
