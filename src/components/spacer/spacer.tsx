import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  size?: 1 | 2 | 3 | 4;
}

const Spacer: React.FC<SpacerProps> = ({ size = 1 }) => {
  return (
    <View style={{
      width: '100%',
      height: size*10
    }}/>
  )
};

export default Spacer;