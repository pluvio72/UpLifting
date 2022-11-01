import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../../util/styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    height: 25,
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    margin: 6,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  }
});

interface Props {
  color: Color;
}

const Chip: React.FC<PropsWithChildren<Props>> = ({ children, color }) => (
  <View style={[{backgroundColor: color}, styles.container]}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

export default Chip;
