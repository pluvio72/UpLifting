import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Padding} from '../../types/styles';
import { PaddingStylesheet } from '../../util/styles';
import {Row} from '../Reusable/reusable';

interface SpacerProps {
  size?: 1 | 2 | 3 | 4;
  withDots?: boolean;
  padding?: Padding;
}

const Spacer: React.FC<SpacerProps> = ({
  size = 1,
  withDots = false,
  padding,
}) => {
  return (
    <View
      style={[{
        width: '100%',
        height: withDots ? 'auto' : size * 10,
      }, PaddingStylesheet(padding)]}>
      {withDots && (
        <Row xAlign="center">
          <Icon name="circle" size={10} style={styles.dots} />
          <Icon name="circle" size={10} style={styles.dots} />
          <Icon name="circle" size={10} style={styles.dots} />
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
