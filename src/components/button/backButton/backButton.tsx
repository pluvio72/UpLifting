import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Icon, Pressable} from 'native-base';
import React from 'react';
import {ViewStyle} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

interface Props {
  link?: string;
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
      position="absolute"
      top={0}
      left={0}
      zIndex={10}
      style={style}>
      <Icon as={Ionic} name="arrow-back" size={8} />
    </Pressable>
  );
};

export default BackButton;
