import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';
import Chip from '../../components/chip';
import Spacer from '../../components/spacer';
import {RootStackParamList, Screens} from '../../data/navigation';
import {Styles} from '../../util/styles';
import colors from '../../util/styles/colors';
import styles from './LandingPage.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'landing'>;

const LandingPage: React.FC<Props> = ({navigation}) => {
  const ClickStartNewWorkout = () => {
    navigation.navigate(Screens.NewWorkout);
  };

  return (
    <View style={styles.container}>
      <Button
        color={colors.primary}
        elevated
        bold
        fontSize={14}
        icon="plus"
        iconSize={14}
        iconColor={colors.white}
        padding={{p: 20}}
        onPress={ClickStartNewWorkout}>
        Start New Workout
      </Button>
      <Spacer size={2} />
      <View>
        <Text style={[Styles.textBold, Styles.textMd]}>History</Text>
        <View style={styles.historyWrapper}>
          <Chip color={colors.accent}>Total 7549 kg</Chip>
        </View>
      </View>
    </View>
  );
};

export default LandingPage;
