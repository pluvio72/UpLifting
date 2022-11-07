import React from 'react';
import { Text, View } from 'react-native';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import { Styles } from '../../util/styles';

const History = () => {
  return (
    <View style={{ padding: 20}}>
      <Text style={[Styles.textBold, Styles.textLg, { marginBottom: 12 }]}>History</Text>
      <HistoryItem
        total={7549}
        name={'Chest & Back'}
        sets={[{
          name: 'Bench Press (Barbell)',
          data: [{
            reps: 8,
            weight: 90,
            completed: true,
          }]
        }]}
      />
    </View>
  )
};

export default History;