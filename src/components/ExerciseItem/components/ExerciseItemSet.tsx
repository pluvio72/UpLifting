import React, {useRef} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../util/styles';
import {Row} from '../../Reusable/reusable';
import {TextInput} from '../../inputs/TextInput';
import TextInputWithLabel from '../../inputs/TextInputWithLabel';
import {onUpdate as OnUpdate} from '../ExerciseItem';
import styles from '../ExerciseItem.styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface SetRowProps {
  completed: boolean;
  index: number;
  onRemove: (setIndex: number) => void;
  onUpdate: OnUpdate;
  repValue: number | string;
  toggleComplete: (setIndex: number) => void;
  weightValue: number | string;
}

const TempPrevExercises = [
  {value: '52KG x 12'},
  {value: '48KG x 15'},
  {value: '48KG x 15'},
  {value: '42KG x 20'},
];

const ExerciseItemSet: React.FC<SetRowProps> = ({
  completed,
  index,
  onRemove,
  onUpdate,
  repValue,
  toggleComplete,
  weightValue,
}) => {
  const updateRef = useRef<Swipeable>(null);

  const SwipeItems = (progress, dragX: Animated.Value) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-100, 65],
    });

    return (
      <Animated.View
        style={[
          styles.swipeDeleteContainer,
          {
            transform: [{translateX: trans}],
          },
        ]}>
        <TouchableOpacity onPress={() => onRemove(index)}>
          <Icon name="trash" size={20} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={updateRef}
      renderLeftActions={SwipeItems}
      overshootLeft={false}>
      <Row
        xAlign="space-around"
        style={completed && {backgroundColor: colors.fadedGreen}}>
        {/* <Text style={styles.prevBest}>50KG x 10</Text> */}
        <Dropdown
          style={styles.prevBest}
          selectedTextStyle={styles.prevBestText}
          itemTextStyle={styles.prevBestDropdownText}
          itemContainerStyle={styles.prevBestDropdownItem}
          containerStyle={styles.prevBestDropdown}
          data={TempPrevExercises}
          value={TempPrevExercises[0]}
          activeColor={colors.grey200}
          valueField={'value'}
          labelField={'value'}
        />
        <TextInput
          style={styles.repInput}
          onChange={(val: string) => {
            onUpdate('reps', index, val ? parseInt(val, 10) : '');
          }}
          maxLength={2}
          placeholder={'Reps'}
          defaultValue={repValue.toString()}
          borderRadius={8}
          backgroundColor={completed ? 'transparent' : colors.white}
        />
        <TextInputWithLabel
          style={styles.weightInput}
          onChange={(val: string) =>
            onUpdate('weight', index, val ? parseInt(val, 10) : '')
          }
          maxLength={3}
          placeholder={'0'}
          backgroundColor={completed ? 'transparent' : colors.white}
          label="kg"
          defaultValue={weightValue.toString()}
        />
        <Icon
          onPress={() => toggleComplete(index + 1)}
          name={
            completed ? 'md-checkmark-circle' : 'md-checkmark-circle-outline'
          }
          style={completed === false ? styles.notDone : styles.done}
          size={26}
        />

        {/* <Pressable onPress={() => onRemove(index + 1)}>
              <Text>RM</Text>
            </Pressable> */}
      </Row>
    </Swipeable>
  );
};

export default ExerciseItemSet;
