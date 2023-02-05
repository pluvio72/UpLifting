import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Icon, Pressable} from 'native-base';
import React from 'react';
import {ViewStyle} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

import {Screens} from '../../../constants/navigation';

interface Props {
  link?: (typeof Screens)[keyof typeof Screens];
  onPress?: () => void;
  style?: ViewStyle;
}

const BackButton = ({link, onPress, style}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const onPressButton = () => {
    if (link) {
      navigation.navigate(link);
    } else if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      onPress={onPressButton}
      style={[{position: 'absolute', top: 0, left: 0, zIndex: 10}, style]}>
      <Icon as={Ionic} name="arrow-back" size={8} />
    </Pressable>
  );
};

export default BackButton;
