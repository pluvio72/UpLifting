import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  TextInput as TextInputComponent,
  TextInputProps as TInputProps,
  TextStyle,
} from 'react-native';
import { Margin } from '../../../types/styles';
import {Color, colors, MarginStylesheet} from '../../../util/styles';
import styles from './TextInput.styles';

export interface TextInputProps {
  autoCapitalize?: TInputProps['autoCapitalize'];
  autoComplete?: TInputProps['autoComplete'];
  autoCorrect?: boolean;
  backgroundColor?: Color;
  disabled?: boolean;
  defaultValue?: string;
  editable?: boolean;
  margin?: Margin;
  maxLength?: number;
  onChange: (newVal: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  textArea?: boolean;
  textColor?: Color;
  type?: 'string' | 'number';
  value?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  autoCapitalize,
  autoComplete,
  autoCorrect,
  backgroundColor = colors.grey,
  disabled,
  defaultValue,
  margin,
  maxLength = 10,
  onChange,
  placeholder,
  style,
  textArea,
  textColor = colors.black,
  type = 'string',
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue])

  const onChangeValue = (newVal: string) => {
    setValue(newVal);
    onChange(newVal);
  };

  return (
    <TextInputComponent
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      keyboardType={type === 'string' ? 'default' : 'number-pad'}
      value={value}
      onChangeText={onChangeValue}
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        style,
        {color: textColor},
        MarginStylesheet(margin)
      ]}
      placeholder={placeholder ?? 'Value'}
      editable={disabled ?? true}
      placeholderTextColor={colors.darkGrey}
      multiline={textArea}
    />
  );
};

TextInput.defaultProps = {
  backgroundColor: colors.white
};

export default TextInput;
