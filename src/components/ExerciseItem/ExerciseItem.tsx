import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ExerciseData, Set} from '../../data/exercises';
import {colors} from '../../util/styles';
import Button from '../button';
import {TextInput} from '../inputs/TextInput';
import TextInputWithLabel from '../inputs/TextInputWithLabel';
import {Row} from '../Reusable/reusable';
import styles from './ExerciseItem.styles';

interface SetRowProps {
  completed: boolean;
  index: number;
  onUpdate: (
    type: 'reps' | 'weight',
    setIndex: number,
    newValue: number,
  ) => void;
  repPlaceholder: string;
  toggleComplete: (setIndex: number) => void;
  weightPlaceholder: string;
}

const SetRow: React.FC<SetRowProps> = ({
  completed,
  index,
  onUpdate,
  repPlaceholder,
  toggleComplete,
  weightPlaceholder,
}) => {
  return (
    <Row margin={{mb: 8}} xAlign="space-around">
      <View style={{height: 10, width: '55%'}} />
      <TextInput
        style={styles.repInput}
        onChange={(val: string) => onUpdate('reps', index, parseInt(val, 10))}
        maxLength={2}
        placeholder={repPlaceholder}
      />
      <TextInputWithLabel
        style={styles.weightInput}
        onChange={(val: string) => onUpdate('weight', index, parseInt(val, 10))}
        maxLength={2}
        placeholder={weightPlaceholder}
        backgroundColor={colors.white}
        label="kg"
      />
      {completed === false ?
          <Icon onPress={() => toggleComplete(index)} name="close" style={styles.notDone} size={24}/>:
          <Icon onPress={() => toggleComplete(index)} name="check" style={styles.done} size={24} />
        }
    </Row>
  );
};

interface ExerciseItemProps {
  addSet: () => void;
  data: Set[];
  name: string;
  onUpdate: (
    type: 'reps' | 'weight',
    setIndex: number,
    newValue: number,
  ) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  addSet,
  data,
  name,
  onUpdate,
}) => {
  return (
    <View style={styles.exerciseItem}>
      <Row xAlign="space-around" margin={{mb: 8}}>
        <Icon name="cog" size={18} />
        <Text style={styles.exerciseName}>{name}</Text>
        <TextInput
          style={styles.repInput}
          onChange={(val: string) =>
            onUpdate('reps', 0, parseInt(val, 10))
          }
          maxLength={2}
          placeholder={'Reps'}
        />
        <TextInputWithLabel
          style={styles.weightInput}
          onChange={(val: string) =>
            onUpdate('weight', 0, parseInt(val, 10))
          }
          maxLength={2}
          placeholder={'0'}
          backgroundColor={colors.white}
          label="kg"
        />
        {data[0].completed === false ?
          <Icon name="close" style={styles.notDone} size={24}/>:
          <Icon name="check" style={styles.done} size={24} />
        }
      </Row>
      {data.slice(1).map((item, index) => (
        <SetRow
          key={index}
          index={index}
          repPlaceholder="0"
          weightPlaceholder="0"
          onUpdate={(type, index, newVal) =>
            onUpdate(type, index, newVal)
          }
          completed={item.completed}
        />
      ))}
      <Button
        color={colors.secondary}
        padding={{px: 8, py: 4}}
        bold={true}
        textAlign="center"
        borderRadius={6}
        onPress={addSet}>
        Add Set
      </Button>
    </View>
  );
};

export default ExerciseItem;
