import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from '../../components/inputs/TextInput';
import {styles} from './gym.styles';

const Gym = () => {
  const [searchFilter, setSearchFilter] = useState('');

  return (
    <View>
      <TextInput
        onChange={setSearchFilter}
        value={searchFilter}
        autoComplete="off"
        autoCorrect={false}
        borderRadius={8}
        style={styles.searchFilter}
      />
    </View>
  );
};

export default Gym;
