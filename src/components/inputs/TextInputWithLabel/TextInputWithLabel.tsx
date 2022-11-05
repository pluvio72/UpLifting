import React from 'react';
import {Text, View} from 'react-native';
import TextInput, {TextInputProps} from '../TextInput/TextInput';

interface Props extends TextInputProps {
  label: string | JSX.Element;
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
    {typeof props.label === 'string' ?
      (
        <>
          <Text>{props.label}</Text>
          <TextInput {...props} />
        </>
      ):
      <>
        {props.label}
        <TextInput {...props} />
      </>
    }
  </View>
);

export default TextInputWithLabel;
