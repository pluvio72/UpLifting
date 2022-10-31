import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';
import { RootStackParamList, Screens } from '../../data/navigation';
import colors from '../../util/styles/colors';
import styles from './LandingPage.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'landing'>;

const LandingPage: React.FC<Props> = ({ navigation }) => {

  const ClickStartNewWorkout = () => { navigation.navigate(Screens.NewWorkout) };

  return (
    <View style={styles.container}>
      <Button color={colors.primary} elevated padding={{p: 20}} onPress={ClickStartNewWorkout}>
        Start New Workout
        <Icon name='plus' size={16}/>
      </Button>
    </View>
  )
};

export default LandingPage;