import React from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../../util/styles';

const History = () => {
  return (
    <View style={Styles.container}>
      <Text style={[Styles.textBold, Styles.textLg]}>History</Text>
    </View>
  )
};

export default History;