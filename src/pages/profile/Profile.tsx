import {Box, Pressable, Row, Text, Icon, Column} from 'native-base';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Session from '../../contexts/session';
import UserAccount from './components/profilePages/userAccount';
import UserSettings from './components/profilePages/userSettings';
import UserStats from './components/profilePages/userStats';
import ProfilePicture from './components/profilePicture';

const ProfileItem: React.FC<{
  text: string;
  subText: string;
  onPress: () => void;
}> = ({text, subText, onPress}) => (
  <Pressable onPress={onPress} mb={4}>
    <Row justifyContent={'space-between'}>
      <Box>
        <Text fontSize={20} fontWeight={500} color="white">
          {text}
        </Text>
        <Text fontSize={13} fontWeight={300} color="white">
          {subText}
        </Text>
      </Box>
      <Icon name="arrow-forward" size={8} color={'white'} as={Ionic} />
    </Row>
  </Pressable>
);

type Pages = 'settings' | 'stats' | 'account';

const Profile: React.FC = () => {
  const session = useContext(Session);

  const [currentView, setCurrentView] = useState<Pages>();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box flexGrow={1} justifyContent="flex-end" alignItems="center">
        <ProfilePicture />
        <Text fontSize={28} fontWeight={500}>
          {session!.account.username}
        </Text>
        <Text fontSize={14} fontWeight={300} mb={2}>
          The Gym Kensington
        </Text>
      </Box>
      <Column w="100%" flexGrow={3} backgroundColor="gray.600" p={6} pt={8}>
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
            <Pressable
              mt="auto"
              ml="auto"
              mr="auto"
              flexDir="row"
              alignItems={'center'}
              justifyContent="center"
              onPress={session!.logOut}>
              <Text color="white" fontWeight={600} fontSize={18}>
                Log Out
              </Text>
              <Icon as={Ionic} name="log-out" size={6} color={'white'} ml={2} />
            </Pressable>
          </>
        ) : (
          <Pressable
            mb={3}
            flexDir="row"
            alignItems="center"
            onPress={() => setCurrentView(undefined)}>
            <Icon
              name="arrow-back"
              color={'white'}
              size={30}
              my={'auto'}
              as={Ionic}
            />
            <Text color="white" fontSize={16} my={'auto'}>
              Back
            </Text>
          </Pressable>
        )}
        {currentView === 'settings' && <UserSettings />}
        {currentView === 'stats' && <UserStats />}
        {currentView === 'account' && <UserAccount />}
      </Column>
    </SafeAreaView>
  );
};

export default Profile;
