import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Screens} from '../../../data/navigation';

interface Props {
  link?: typeof Screens[keyof typeof Screens];
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
      <Icon name="arrow-back" size={24} />
    </Pressable>
  );
};

export default BackButton;
