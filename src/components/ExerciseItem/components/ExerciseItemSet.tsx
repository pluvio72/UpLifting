import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../util/styles';
import {Row} from '../../Reusable/reusable';
import {TextInput} from '../../inputs/TextInput';
import TextInputWithLabel from '../../inputs/TextInputWithLabel';
import {onUpdate as OnUpdate} from '../ExerciseItem';
import styles from '../ExerciseItem.styles';

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
  return (
    <Row margin={{mb: 8}} xAlign="space-around">
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
        borderRadius={6}
        backgroundColor={colors.white}
      />
      <TextInputWithLabel
        style={styles.weightInput}
        onChange={(val: string) =>
          onUpdate('weight', index, val ? parseInt(val, 10) : '')
        }
        maxLength={2}
        placeholder={'0'}
        backgroundColor={colors.white}
        label="kg"
        defaultValue={weightValue.toString()}
      />
      {completed === false ? (
        <Icon
          onPress={() => toggleComplete(index + 1)}
          name="circle"
          style={styles.notDone}
          size={20}
        />
      ) : (
        <Icon
          onPress={() => toggleComplete(index + 1)}
          name="check"
          style={styles.done}
          size={24}
        />
      )}
      {/* <Pressable onPress={() => onRemove(index + 1)}>
        <Text>RM</Text>
      </Pressable> */}
    </Row>
  );
};

export default ExerciseItemSet;
