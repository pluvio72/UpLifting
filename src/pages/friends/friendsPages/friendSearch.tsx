import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from '../../../components/inputs/TextInput';
import {RootStackParamList} from '../../../constants/navigation';
import Session from '../../../contexts/session';
import {searchUsers} from '../../../services/api/user';
import {colors} from '../../../util/styles';

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
    <View style={styles.container}>
      <TextInput
        borderRadius={8}
        onChange={setFilter}
        value={filter}
        defaultValue={route.params.filter}
        style={styles.input}
      />
      <ScrollView style={styles.scrollView}>
        {users &&
          users.map((user, index) => (
            <View style={styles.friend} key={index}>
              <Text style={styles.friendText}>{user.username}</Text>
              <Icon name="person-add" size={24} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  input: {
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 30,
  },
  friend: {
    backgroundColor: colors.grey200,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 6,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default FriendSearch;
