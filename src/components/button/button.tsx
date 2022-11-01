import React from 'react';
import {Pressable, StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Margin, Padding} from '../../types/styles';
import {Styles, PaddingStylesheet, MarginStylesheet} from '../../util/styles';
import {Color, getTextColor} from '../../util/styles/colors';
import styles from './button.styles';

interface ButtonProps {
  bold?: boolean;
  borderRadius?: ViewStyle['borderRadius'];
  color: Color;
  elevated?: boolean;
  fontSize?: TextStyle['fontSize'];
  icon?: string;
  iconColor?: Color;
  iconSize?: number;
  margin?: Margin;
  onPress?: () => void;
  padding?: Padding;
  textAlign?: ViewStyle['justifyContent'];
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  bold,
  borderRadius = 10,
  children,
  color,
  elevated,
  icon,
  iconColor,
  iconSize,
  fontSize = 12,
  margin,
  onPress,
  padding,
  textAlign,
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
        { justifyContent: 'center' }
      ]}>
      <Text
        style={[
          {color: getTextColor(color)},
          styles.text,
          {fontWeight: bold ? '600' : '400'},
          {fontSize},
        ]}>
        {children}
      </Text>
      {icon && (
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
};

export default Button;
