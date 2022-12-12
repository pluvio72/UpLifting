import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableHighlight, ViewStyle} from 'react-native';
import {Color} from '../../util/styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
});

interface Props {
  color: Color;
  onPress?: () => void;
  text?: Color;
  style?: ViewStyle;
}

const Chip: React.FC<PropsWithChildren<Props>> = ({
  children,
  color,
  onPress,
  text,
  style,
}) => (
  <TouchableHighlight
    onPress={onPress}
    style={[{backgroundColor: color}, styles.container, style]}>
    <Text style={[styles.text, {color: text}]}>{children}</Text>
  </TouchableHighlight>
);

export default Chip;
