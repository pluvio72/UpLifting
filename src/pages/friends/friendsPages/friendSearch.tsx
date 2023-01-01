import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from '../../../components/inputs/TextInput';
import {RootStackParamList} from '../../../constants/navigation';
import Session from '../../../contexts/session';
import {searchUsers} from '../../../services/api/user';

type Props = NativeStackScreenProps<RootStackParamList, 'friend_search'>;

const FriendSearch: React.FC<Props> = ({route}) => {
  const [filter, setFilter] = useState(route.params.filter);
  const [users, setUsers] = useState<Awaited<ReturnType<typeof searchUsers>>>(
    [],
  );
  const session = useContext(Session);

  useEffect(() => {
    searchUsers(session!, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <View style={styles.container}>
      <TextInput
        borderRadius={8}
        onChange={setFilter}
        value={filter}
        defaultValue={route.params.filter}
      />
      {users &&
        users.map((user, index) => (
          <View>
            <Text>{user.username}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});

export default FriendSearch;
