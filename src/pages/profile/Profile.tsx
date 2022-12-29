import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Row} from '../../components/Reusable/reusable';
import Session from '../../contexts/session';
import {colors} from '../../util/styles';
import UserAccount from './components/profilePages/userAccount';
import UserSettings from './components/profilePages/userSettings';
import UserStats from './components/profilePages/userStats';
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

type Pages = 'settings' | 'stats' | 'account';

const Profile: React.FC = () => {
  const session = useContext(Session);

  const [currentView, setCurrentView] = useState<Pages>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <ProfilePicture />
        <Text style={styles.username}>{session!.account.username}</Text>
        <Text style={styles.underUsername}>The Gym Kensington</Text>
      </View>
      <View style={styles.detailsContainer}>
        {currentView === undefined ? (
          <>
            <ProfileItem
              text={'Stats'}
              subText={'Body measurements: weight, size etc.'}
              onPress={() => setCurrentView('stats')}
            />
            <ProfileItem
              text={'Account'}
              subText={'Change username / password etc..'}
              onPress={() => setCurrentView('account')}
            />
            <ProfileItem
              text={'Gym Details'}
              subText={'Change gym, request add gym.'}
              onPress={() => {}}
            />
            <ProfileItem
              text={'Settings'}
              subText={'Kilos/Pounds'}
              onPress={() => setCurrentView('settings')}
            />
            <TouchableOpacity
              style={styles.logOutButton}
              onPress={session!.logOut}>
              <Text style={styles.logOutButtonText}>Log Out</Text>
              <Icon
                name="log-out"
                size={24}
                color={colors.white}
                style={styles.logOutIcon}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => setCurrentView(undefined)}>
            <Icon
              name="arrow-back"
              color={colors.white}
              size={26}
              style={styles.backIcon}
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentView === 'settings' && <UserSettings />}
        {currentView === 'stats' && <UserStats />}
        {currentView === 'account' && <UserAccount />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
