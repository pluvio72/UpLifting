import React from 'react';
import {View, Text, StyleSheet, TextInput, TextStyle} from 'react-native';
import {Color, colors} from '../../../util/styles';
import {TextInputProps} from '../TextInput/TextInput';

interface Props extends TextInputProps {
  label: string | JSX.Element;
  width?: number;
  textInputStyle?: TextStyle;
  labelBackgroundColor?: Color;
}

const TextInputWithLabel = (props: Props) => {
  const Label =
    typeof props.label === 'string' ? (
      <View
        style={[
          styles.labelContainer,
          {
            borderTopLeftRadius: props.borderRadius,
            borderBottomLeftRadius: props.borderRadius,
            backgroundColor: props.labelBackgroundColor,
          },
        ]}>
        <Text
          style={{
            includeFontPadding: false,
            textAlign: 'center',
            color: props.textColor,
          }}>
          {props.label}
        </Text>
      </View>
    ) : (
      props.label
    );

  return (
    <View
      style={[
        {backgroundColor: props.backgroundColor},
        styles.container,
        props.style,
      ]}>
      {Label}
      <TextInput
        defaultValue={props.defaultValue}
        selectTextOnFocus={props.focusOnPress}
        onChangeText={props.onChange}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        style={[
          {
            textAlign: 'center',
            flexGrow: 1,
            color: props.textColor ?? colors.white,
          },
          props.textInputStyle,
        ]}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
  },
  labelContainer: {
    height: '100%',
    padding: 5,
    width: 30,
  },
});

export default TextInputWithLabel;
