import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Screens} from '../../../data/navigation';

interface Props {
  link?: typeof Screens[keyof typeof Screens];
  onPress?: () => void;
}

const BackButton = ({link, onPress}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const onPressButton = () => {
    console.log('ON PRESS');
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
      style={{position: 'absolute', top: 0, left: 0, zIndex: 10}}>
      <Icon name="arrow-left" size={24} />
    </Pressable>
  );
};

export default BackButton;
