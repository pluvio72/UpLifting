import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScreenProps} from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';
import Chip from '../../components/chip';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import {Row} from '../../components/Reusable/reusable';
import Spacer from '../../components/spacer';
import templates from '../../data/mock';
import {RootStackParamList, Screens} from '../../data/navigation';
import {Styles} from '../../util/styles';
import colors from '../../util/styles/colors';
import ExerciseTemplates from './landingComponents/ExerciseTemplates';
import styles from './LandingPage.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'landing'>;

const LandingPage: React.FC<Props> = ({navigation}) => {
  const ClickStartNewWorkout = () => {
    navigation.navigate(Screens.NewWorkout);
  };

  return (
    <ScrollView style={styles.container}>
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
        <Text style={[Styles.textBold, Styles.textMd, {marginLeft: 5}]}>
          History
        </Text>
        <Spacer />
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
      <Spacer />
      <Button color={colors.accent} fontSize={14} bold textAlign="center">
        View History
      </Button>
      <Spacer size={2} />
      <View>
        <Row xAlign="flex-start">
          <Text style={[Styles.textBold, Styles.textMd, {marginLeft: 5}]}>
            Templates
          </Text>
        </Row>
        <Spacer />
        <ExerciseTemplates templates={templates} />
      </View>
      <Spacer size={3} />
      <View>
        <Text
          style={[
            Styles.textBold,
            Styles.textMd,
            {marginLeft: 5, marginBottom: 10},
          ]}>
          PRs
        </Text>
        <Row xAlign="space-between" margin={{mb: 8}}>
          <Text>10/10/22</Text>
          <Text style={Styles.textBold}>Bench Press (Paused)</Text>
          <Text style={Styles.textBold}>120kg x 10</Text>
        </Row>
        <Row xAlign="space-between">
          <Text>02/08/22</Text>
          <Text style={Styles.textBold}>Squat (Paused)</Text>
          <Text style={Styles.textBold}>180kg x 10</Text>
        </Row>
      </View>
    </ScrollView>
  );
};

export default LandingPage;
