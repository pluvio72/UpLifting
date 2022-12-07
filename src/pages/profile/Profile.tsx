import React, {useContext} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Row} from '../../components/Reusable/reusable';
import Spacer from '../../components/spacer';
import Session from '../../contexts/session';
import {colors} from '../../util/styles';
import ProfilePicture from './components/profilePicture';
import styles from './Profile.styles';

const ProfileItem: React.FC<{text: string; subText: string}> = ({
  text,
  subText,
}) => (
  <TouchableOpacity>
    <Row style={styles.profileItem}>
      <View style={{marginRight: 'auto'}}>
        <Text style={styles.profileItemText}>{text}</Text>
        <Text style={styles.profileItemSubText}>{subText}</Text>
      </View>
      <Icon name="arrow-forward" size={24} color={colors.white} />
    </Row>
  </TouchableOpacity>
);

const Profile: React.FC = () => {
  const session = useContext(Session);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <ProfilePicture />
        <Text style={styles.username}>{session!.username}</Text>
        <Text style={styles.underUsername}>The Gym Kensington</Text>
      </View>
      <View style={styles.detailsContainer}>
        <ProfileItem
          text={'Account Details'}
          subText={'Change username / password etc..'}
        />
        <ProfileItem text={'Gym'} subText={'Change gym, request add gym.'} />
        {/* <TouchableOpacity>
          <Text>Log Out</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
