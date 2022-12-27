import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  TextInput as TextInputComponent,
  TextInputProps as TInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Margin} from '../../../types/styles';
import {Color, colors, MarginStylesheet} from '../../../util/styles';
import styles from './TextInput.styles';

export interface TextInputProps {
  autoCapitalize?: TInputProps['autoCapitalize'];
  autoComplete?: TInputProps['autoComplete'];
  autoCorrect?: boolean;
  autoFocus?: boolean;
  backgroundColor?: Color;
  borderRadius?: ViewStyle['borderRadius'];
  borderTopLeftRadius?: ViewStyle['borderRadius'];
  borderTopRightRadius?: ViewStyle['borderRadius'];
  borderBottomLeftRadius?: ViewStyle['borderRadius'];
  borderBottomRightRadius?: ViewStyle['borderRadius'];
  disabled?: boolean;
  defaultValue?: string;
  editable?: boolean;
  focusOnPress?: boolean;
  fontSize?: TextStyle['fontSize'];
  margin?: Margin;
  maxLength?: number;
  onChange: (newVal: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: StyleProp<TextStyle>;
  textArea?: boolean;
  textColor?: Color;
  type?: 'string' | 'number';
  underlineThickness?: 0 | 1 | 2 | 3 | 4;
  value?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  autoCapitalize,
  autoComplete,
  autoCorrect,
  autoFocus,
  backgroundColor = colors.grey,
  borderRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderTopLeftRadius,
  disabled,
  defaultValue,
  focusOnPress = false,
  fontSize,
  margin,
  maxLength,
  onChange,
  placeholder,
  secureTextEntry,
  style,
  textArea,
  textColor = colors.black,
  type = 'string',
  underlineThickness,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChangeValue = (newVal: string) => {
    setValue(newVal);
    onChange(newVal);
  };

  return (
    <TextInputComponent
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      editable={disabled ?? true}
      keyboardType={type === 'string' ? 'default' : 'number-pad'}
      maxLength={maxLength}
      onChangeText={onChangeValue}
      multiline={textArea}
      placeholder={placeholder ?? 'Value'}
      placeholderTextColor={colors.grey600}
      secureTextEntry={secureTextEntry}
      selectTextOnFocus={focusOnPress}
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        style,
        {color: textColor},
        {borderBottomWidth: underlineThickness},
        {borderRadius},
        {fontSize},
        MarginStylesheet(margin),
        {
          borderTopLeftRadius,
          borderBottomLeftRadius,
          borderTopRightRadius,
          borderBottomRightRadius,
        },
      ]}
      value={value}
    />
  );
};

export default TextInput;
