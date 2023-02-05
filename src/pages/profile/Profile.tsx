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
  <Pressable
    onPress={onPress}
    bg="primary.500"
    mb={1.5}
    py={2}
    px={4}
    borderRadius={12}>
    <Row justifyContent={'space-between'}>
      <Box>
        <Text fontSize={20} fontWeight={500}>
          {text}
        </Text>
        <Text fontSize={13} fontWeight={300}>
          {subText}
        </Text>
      </Box>
      <Icon
        my={'auto'}
        name="arrow-forward"
        size={8}
        color="black"
        as={Ionic}
      />
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
        <Text fontSize={28} fontWeight={500} mb={-1}>
          {session!.account.username}
        </Text>
        <Text fontSize={14} fontWeight={300} mb={2}>
          The Gym Kensington
        </Text>
      </Box>
      <Column w="100%" flexGrow={3} p={3} pt={8}>
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
              <Text fontWeight={600} fontSize={18}>
                Log Out
              </Text>
              <Icon color="black" as={Ionic} name="log-out" size={6} ml={2} />
            </Pressable>
          </>
        ) : (
          <Pressable
            mb={3}
            flexDir="row"
            alignItems="center"
            justifyContent={'center'}
            onPress={() => setCurrentView(undefined)}>
            <Icon
              name="arrow-back"
              size={5}
              color="black"
              my={'auto'}
              as={Ionic}
            />
            <Text fontSize={16}>Back</Text>
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
