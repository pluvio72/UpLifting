import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Icon, Input, Row, Text} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Pressable} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {FriendStackPL, PostAuthStackPL} from '../../../constants/navigation';
import Session from '../../../contexts/session';
import {searchUsers, sendFriendRequest} from '../../../services/api/user';

type Props = CompositeScreenProps<
  NativeStackScreenProps<FriendStackPL, 'friend_search'>,
  BottomTabScreenProps<PostAuthStackPL>
>;

const FriendSearch: React.FC<Props> = ({route}) => {
  const [filter, setFilter] = useState(route.params.filter);
  const [users, setUsers] = useState<
    Awaited<ReturnType<typeof searchUsers>>['users']
  >([]);
  const session = useContext(Session);

  useEffect(() => {
    searchUsers(session!, filter).then(response => setUsers(response.users));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const sendRequest = async (username: string) => {
    const res = await sendFriendRequest(session!, username);
    if (!res) console.log('Friend request failed');
    console.log('Friend request response:', res);
  };

  return (
    <Box p={3} flex={1}>
      <Row height={10} mb={4}>
        <Input
          borderBottomLeftRadius={8}
          borderTopLeftRadius={8}
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          onChangeText={setFilter}
          value={filter}
          defaultValue={route.params.filter}
          flex={1}
        />
        <Box
          bg="primary.500"
          borderBottomRightRadius={8}
          borderTopRightRadius={8}
          justifyContent="center"
          px={3}>
          <Pressable onPress={() => {}}>
            <Icon as={Ionic} color={'white'} name="search" size={6} />
          </Pressable>
        </Box>
      </Row>
      <ScrollView style={styles.scrollView}>
        {users &&
          users.map((user, index) => (
            <Pressable onPress={() => sendRequest(user.username)}>
              <Row
                justifyContent="space-between"
                alignItems="center"
                bg="gray.200"
                px={3}
                py={2}
                mb={2}
                borderRadius={8}
                key={index}>
                <Text fontSize={16} fontWeight={500}>
                  {user.username}
                </Text>
                <Icon as={Ionic} name="person-add" size={6} />
              </Row>
            </Pressable>
          ))}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 30,
  },
});

export default FriendSearch;
