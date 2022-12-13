import React from 'react';
import {View, Text, StyleSheet, TextInput, TextStyle} from 'react-native';
import {TextInputProps} from '../TextInput/TextInput';

interface Props extends TextInputProps {
  label: string | JSX.Element;
  width?: number;
  textInputStyle?: TextStyle;
}

const TextInputWithLabel = (props: Props) => {
  const Label =
    typeof props.label === 'string' ? (
      <Text style={{includeFontPadding: false}}>{props.label}</Text>
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
        style={[
          {
            textAlign: 'center',
            flexGrow: 1,
          },
          props.textInputStyle,
        ]}
        maxLength={3}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value}
        onChangeText={props.onChange}
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
});

export default TextInputWithLabel;
