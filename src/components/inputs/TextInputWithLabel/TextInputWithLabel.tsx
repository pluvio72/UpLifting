import React from 'react';
import {Text, View} from 'react-native';
import TextInput, {TextInputProps} from '../TextInput/TextInput';

interface Props extends TextInputProps {
  label: string;
}

const TextInputWithLabel = (props: Props) => (
  <View
    style={[
      props.style,
      {
        backgroundColor: props.backgroundColor,
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center',
      },
    ]}>
    <Text>{props.label}</Text>
    <TextInput {...props} />
  </View>
);

export default TextInputWithLabel;
