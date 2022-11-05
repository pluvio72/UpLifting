import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Color} from '../../util/styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    margin: 6,
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
}

const Chip: React.FC<PropsWithChildren<Props>> = ({
  children,
  color,
  onPress,
  text,
}) => (
  <TouchableHighlight
    onPress={onPress}
    style={[{backgroundColor: color}, styles.container]}>
    <Text style={[styles.text, {color: text}]}>{children}</Text>
  </TouchableHighlight>
);

export default Chip;
