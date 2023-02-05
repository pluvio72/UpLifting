import {Box, Center, Icon, Image} from 'native-base';
import React from 'react';
import {ImageURISource} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

interface Props {
  src?: ImageURISource;
}

const ProfilePicture: React.FC<Props> = ({src}) => {
  if (src) {
    return <Image source={src} width={80} height={80} borderRadius={16} />;
  } else {
    return (
      <Center backgroundColor="gray.600" borderRadius={80} p={4}>
        <Icon as={Ionic} name={'person'} size={60} color={'white'} />
      </Center>
    );
  }
};

export default ProfilePicture;
