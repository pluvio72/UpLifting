import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Icon, Input, Row, Text} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../../constants/navigation';
import Session from '../../../contexts/session';
import {searchUsers} from '../../../services/api/user';

type Props = NativeStackScreenProps<RootStackParamList, 'friend_search'>;

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

  return (
    <Box p={3}>
      <Input
        borderRadius={8}
        onChangeText={setFilter}
        value={filter}
        defaultValue={route.params.filter}
        mb={2}
      />
      <ScrollView style={styles.scrollView}>
        {users &&
          users.map((user, index) => (
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
