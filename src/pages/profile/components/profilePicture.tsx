import React from 'react';
import {Image, ImageURISource, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../util/styles';

interface Props {
  src?: ImageURISource;
}

const ProfilePicture: React.FC<Props> = ({src}) => {
  if (src) {
    return <Image source={src} style={styles.image} />;
  } else {
    return (
      <View style={styles.defaultImage}>
        <Icon name={'user'} size={72} color={colors.white} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  defaultImage: {
    backgroundColor: colors.primary,
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfilePicture;
