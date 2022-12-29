import React, {useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import Button from '../../components/button';
import RequestAddExerciseModal from '../../components/modals/requestAddExercise';
import exercises from '../../constants/exercises';
import {colors, Styles} from '../../util/styles';
import styles from './ExerciseList.styles';

const ExerciseList = () => {
  const [showRequestNewExercise, setShowRequestNewExercise] = useState(false);
  const hideNewExerciseModal = () => setShowRequestNewExercise(false);
  const showNewExerciseModal = () => setShowRequestNewExercise(true);

  return (
    <SafeAreaView>
      <View style={Styles.container}>
        <RequestAddExerciseModal
          show={showRequestNewExercise}
          onHide={hideNewExerciseModal}
        />
        <Button
          fontSize={14}
          bold
          color={colors.primary}
          padding={{py: 14, px: 12}}
          onPress={showNewExerciseModal}>
          Request Add Exercise
        </Button>
        <FlatList
          data={exercises}
          renderItem={item => (
            <View style={styles.item}>
              <Text>{item.item.name}</Text>
              <Text style={styles.category}>{item.item.category[0]}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExerciseList;
