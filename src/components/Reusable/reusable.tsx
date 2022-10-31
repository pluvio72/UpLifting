import React, {PropsWithChildren} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import { Margin, Padding } from '../../types/styles';
import { MarginStylesheet, PaddingStylesheet } from '../../util/styles';

interface Props {
  margin?: Margin,
  padding?: Padding,
  style?: StyleProp<ViewStyle>;
  xAlign?: ViewStyle['justifyContent'];
  yAlign?: ViewStyle['alignItems'];
}

const Row: React.FC<PropsWithChildren<Props>> = ({
  children,
  margin,
  padding,
  style,
  xAlign,
  yAlign,
}) => (
  <View
    style={[
      style,
      {
        flexDirection: 'row',
        alignItems: yAlign ?? 'center',
        justifyContent: xAlign ?? 'space-evenly',
      },
      PaddingStylesheet(padding),
      MarginStylesheet(margin)
    ]}>
    {children}
  </View>
);

export {Row};
