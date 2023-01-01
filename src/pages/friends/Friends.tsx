import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button';
import {TextInput} from '../../components/inputs/TextInput';
import Spacer from '../../components/spacer';
import {RootStackParamList} from '../../constants/navigation';
import {colors} from '../../util/styles';
import {styles} from './Friends.styles';

type Props = NativeStackScreenProps<RootStackParamList, any>;

const Friends: React.FC<Props> = ({navigation}) => {
  const [friendSearch, setFriendSearch] = useState('');

  const onFindFriend = () => {
    navigation.navigate('friend_search', {filter: friendSearch});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.friendSearchContainer}>
        <TextInput
          borderBottomLeftRadius={8}
          borderTopLeftRadius={8}
          onChange={setFriendSearch}
          placeholder={'Search for friends...'}
          style={styles.friendSearch}
          value={friendSearch}
        />
        <View style={styles.friendSearchIcon}>
          <TouchableOpacity onPress={onFindFriend}>
            <Icon color={colors.white} name="search" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <Button
          style={styles.actionButton}
          color={colors.primary}
          margin={{mr: 2}}>
          My Friends
        </Button>
        <Button
          style={styles.actionButton}
          color={colors.primary}
          margin={{ml: 2}}>
          We Go Jim
        </Button>
      </View>
      <View style={styles.friendRequest}>
        <Text style={styles.friendRequestText}>@hermano</Text>
        <Icon name="person-add" size={24} />
        <Icon name="close-sharp" size={28} style={{marginLeft: 8}} />
      </View>
      <View style={styles.friendRequest}>
        <Text style={styles.friendRequestText}>@josh</Text>
        <Icon name="person-add" size={24} />
        <Icon name="close-sharp" size={28} style={{marginLeft: 8}} />
      </View>
      <View style={styles.friendRequest}>
        <Text style={styles.friendRequestText}>@cacey</Text>
        <Icon name="person-add" size={24} />
        <Icon name="close-sharp" size={28} style={{marginLeft: 8}} />
      </View>
      <Button margin={{m: 8, my: 4}} textAlign="center" color={colors.primary}>
        View Rest
      </Button>
      <Spacer size={2} />
      <Text style={styles.headerText}>Activity</Text>
      <View style={styles.activity}>
        <Text style={styles.activityUser}>@mac_demarco</Text>
        <View style={styles.activityWrapper}>
          <Text style={styles.activityTitle}>Chest & Back</Text>
          <View style={styles.activitySet}>
            <Text style={styles.activityText}>Bench Press</Text>
            <Text style={styles.activityText}>110kg x 4</Text>
          </View>
          <View style={styles.activitySet}>
            <Text style={styles.activityText}>Squat</Text>
            <Text style={styles.activityText}>110kg x 4</Text>
          </View>
          <View style={styles.activitySet}>
            <Text style={styles.activityText}>Overhead Press</Text>
            <Text style={styles.activityText}>110kg x 4</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Friends;
