import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Row} from '../../components/Reusable/reusable';
import Session from '../../contexts/session';
import {colors} from '../../util/styles';
import UserSettings from './components/profilePages/userSettings';
import ProfilePicture from './components/profilePicture';
import styles from './Profile.styles';

const ProfileItem: React.FC<{
  text: string;
  subText: string;
  onPress: () => void;
}> = ({text, subText, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Row style={styles.profileItem}>
      <View style={{marginRight: 'auto'}}>
        <Text style={styles.profileItemText}>{text}</Text>
        <Text style={styles.profileItemSubText}>{subText}</Text>
      </View>
      <Icon name="arrow-forward" size={24} color={colors.white} />
    </Row>
  </TouchableOpacity>
);

type Pages = 'userSettings';

const Profile: React.FC = () => {
  const session = useContext(Session);

  const [currentView, setCurrentView] = useState<Pages>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <ProfilePicture />
        <Text style={styles.username}>{session!.username}</Text>
        <Text style={styles.underUsername}>The Gym Kensington</Text>
      </View>
      <View style={styles.detailsContainer}>
        {currentView === undefined && (
          <>
            <ProfileItem
              text={'Gym Progress'}
              subText={'Body measurements: weight, size etc.'}
              onPress={() => {}}
            />
            <ProfileItem
              text={'Account'}
              subText={'Change username / password etc..'}
              onPress={() => {}}
            />
            <ProfileItem
              text={'Gym Details'}
              subText={'Change gym, request add gym.'}
              onPress={() => {}}
            />
            <ProfileItem
              text={'Settings'}
              subText={'Kilos/Pounds'}
              onPress={() => setCurrentView('userSettings')}
            />
            {/* <TouchableOpacity>
                <Text>Log Out</Text>
              </TouchableOpacity> */}
          </>
        )}
        {currentView === 'userSettings' && <UserSettings />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
