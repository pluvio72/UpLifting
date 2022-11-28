import React from 'react';
import {Pressable, Text, TextStyle, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Margin, Padding} from '../../types/styles';
import {Styles, PaddingStylesheet, MarginStylesheet} from '../../util/styles';
import {Color, getTextColor} from '../../util/styles/colors';
import styles from './button.styles';

interface ButtonProps {
  bold?: boolean;
  borderRadius?: ViewStyle['borderRadius'];
  color: Color;
  disabled?: boolean;
  elevated?: boolean;
  fontSize?: TextStyle['fontSize'];
  icon?: string;
  iconColor?: Color;
  iconSize?: number;
  iconType?: 'fontAwesome' | 'ionic';
  margin?: Margin;
  onPress?: () => void;
  padding?: Padding;
  style?: ViewStyle;
  textAlign?: ViewStyle['justifyContent'];
  width?: ViewStyle['width'];
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  bold = true,
  borderRadius = 10,
  children,
  color,
  disabled,
  elevated,
  icon,
  iconColor,
  iconSize,
  iconType = 'fontAwesome',
  fontSize = 14,
  margin,
  onPress,
  padding,
  style,
  textAlign,
  width,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: color},
        elevated && Styles.dropShadow,
        MarginStylesheet(margin),
        PaddingStylesheet(padding),
        {borderRadius},
        {justifyContent: textAlign},
        {width},
        style,
      ]}
      disabled={disabled}>
      <Text
        style={[
          {color: getTextColor(color)},
          styles.text,
          {fontWeight: bold ? '800' : '400'},
          {fontSize},
        ]}>
        {children}
      </Text>
      {icon && iconType === 'fontAwesome' ? (
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      ) : (
        <Ionicon
          name={icon!}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
};

export default Button;
