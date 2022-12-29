import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button';
import {TextInput} from '../../components/inputs/TextInput';
import {colors} from '../../util/styles';
import {styles} from './Friends.styles';

const Friends = () => {
  const [friendSearch, setFriendSearch] = useState('');

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
          <Icon color={colors.white} name="search" size={20} />
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
