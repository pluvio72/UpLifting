import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Set} from '../../data/exercises';
import {colors} from '../../util/styles';
import Button from '../button';
import {TextInput} from '../inputs/TextInput';
import TextInputWithLabel from '../inputs/TextInputWithLabel';
import {Row} from '../Reusable/reusable';
import styles from './ExerciseItem.styles';

interface SetRowProps {
  completed: boolean;
  index: number;
  onRemove: (setIndex: number) => void;
  onUpdate: (
    type: 'reps' | 'weight',
    setIndex: number,
    newValue: number | string,
  ) => void;
  repValue: number | string;
  toggleComplete: (setIndex: number) => void;
  weightValue: number | string;
}

const SetRow: React.FC<SetRowProps> = ({
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
      <View style={{height: 10, width: '55%'}} />
      <TextInput
        style={styles.repInput}
        onChange={(val: string) => {
          onUpdate('reps', index, val ? parseInt(val, 10) : '')
        }}
        maxLength={2}
        placeholder={"0"}
        defaultValue={repValue.toString()}
      />
      <TextInputWithLabel
        style={styles.weightInput}
        onChange={(val: string) => onUpdate('weight', index, val ? parseInt(val, 10) : '')}
        maxLength={2}
        placeholder={"0"}
        backgroundColor={colors.white}
        label="kg"
        defaultValue={weightValue.toString()}
      />
      {completed === false ? (
        <Icon
          onPress={() => toggleComplete(index+1)}
          name="close"
          style={styles.notDone}
          size={24}
        />
      ) : (
        <Icon
          onPress={() => toggleComplete(index+1)}
          name="check"
          style={styles.done}
          size={24}
        />
      )}
      <Pressable onPress={() => onRemove(index+1)}>
        <Text>RM</Text>
      </Pressable>
    </Row>
  );
};

interface ExerciseItemProps {
  addSet: () => void;
  data: Set[];
  name: string;
  onRemove: (setIndex: number) => void;
  onUpdate: (
    type: 'reps' | 'weight' | 'completed',
    setIndex: number,
    newValue?: number | string,
  ) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  addSet,
  data,
  name,
  onRemove,
  onUpdate,
}) => {
  const toggleCompleted = (setIndex: number) => {
    onUpdate('completed', setIndex);
  };

  return (
    <View style={styles.exerciseItem}>
      <Row xAlign="space-around" margin={{mb: 8}}>
        <Icon name="cog" size={18} />
        <Text style={styles.exerciseName}>{name}</Text>
        <TextInput
          style={styles.repInput}
          onChange={(val: string) => onUpdate('reps', 0, val ? parseInt(val, 10) : '')}
          maxLength={2}
          placeholder={'Reps'}
          defaultValue={data[0].reps.toString()}
        />
        <TextInputWithLabel
          style={styles.weightInput}
          onChange={(val: string) => onUpdate('weight', 0, val ? parseInt(val, 10) : '')}
          maxLength={2}
          placeholder={'0'}
          backgroundColor={colors.white}
          label="kg"
          defaultValue={data[0].weight.toString()}
        />
        {data[0].completed === false ? (
          <Icon
            name="close"
            style={styles.notDone}
            size={24}
            onPress={() => toggleCompleted(0)}
          />
        ) : (
          <Icon
            name="check"
            style={styles.done}
            size={24}
            onPress={() => toggleCompleted(0)}
          />
        )}
        <Pressable onPress={() => onRemove(0)}>
          <Text>RM</Text>
        </Pressable>
      </Row>
      {data.slice(1).map((item, index) => (
        <SetRow
          key={index}
          index={index}
          repValue={data[index+1]['reps']}
          weightValue={data[index+1]['weight']}
          onUpdate={(type, index, newVal) => onUpdate(type, index+1, newVal)}
          completed={item.completed}
          toggleComplete={toggleCompleted}
          onRemove={onRemove}
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
