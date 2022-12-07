import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Padding} from '../../types/styles';
import {Color, PaddingStylesheet} from '../../util/styles';
import {Row} from '../Reusable/reusable';

interface SpacerProps {
  size?: 1 | 2 | 3 | 4;
  withDots?: boolean;
  padding?: Padding;
  color?: Color;
}

const Spacer: React.FC<SpacerProps> = ({
  size = 1,
  withDots = false,
  padding,
  color,
}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height: withDots ? 'auto' : size * 10,
        },
        PaddingStylesheet(padding),
      ]}>
      {withDots && (
        <Row xAlign="center">
          <Icon name="circle" size={10} style={styles.dots} color={color} />
          <Icon name="circle" size={10} style={styles.dots} color={color} />
          <Icon name="circle" size={10} style={styles.dots} color={color} />
        </Row>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    marginHorizontal: 4,
  },
});

export default Spacer;
