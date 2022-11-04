import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Set} from '../../data/exercises';
import {colors, Styles} from '../../util/styles';
import Button from '../button';
import {TextInput} from '../inputs/TextInput';
import TextInputWithLabel from '../inputs/TextInputWithLabel';
import {Row} from '../Reusable/reusable';
import Spacer from '../spacer';
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
      <View style={{height: 10, width: '50%'}} />
      <TextInput
        style={styles.repInput}
        onChange={(val: string) => {
          onUpdate('reps', index, val ? parseInt(val, 10) : '');
        }}
        maxLength={2}
        placeholder={'Reps'}
        defaultValue={repValue.toString()}
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

const SettingsItems = [
  {
    name: 'Add Notes',
  },
  {
    name: 'Remove Notes',
  }
];

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

  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const onPressSettingsItem = (item: typeof SettingsItems[number]) => {
    if(item.name === 'Add Notes') setShowNotes(true);
    else if(item.name === 'Remove Notes') setShowNotes(false);
  }

  return (
    <View style={styles.exerciseItem}>
      <Row xAlign="center" yAlign="center" padding={{pb: 10}}>
        <Dropdown
          style={styles.settingsDropdown}
          placeholderStyle={styles.settingsDropdownText}
          containerStyle={styles.settingsDropdownMenu}
          itemTextStyle={styles.settingsDropdownMenuItem}
          selectedTextStyle={styles.settingsDropdownText}
          renderRightIcon={() => (
            <Icon
              name="cog"
              size={16}
              color={colors.white}
              style={{marginRight: 8}}
            />
          )}
          data={SettingsItems}
          labelField={'name'}
          valueField={'name'}
          placeholder="Settings"
          onChange={onPressSettingsItem}
        />
        <Text style={[styles.exerciseName, Styles.textCenter]}>{name}</Text>
        <Button
          color={colors.primary}
          bold
          padding={{px: 8, py: 4}}
          margin={{ml: 'auto'}}
          textAlign="center"
          borderRadius={6}>
          Metrics
        </Button>
      </Row>
      {showNotes && 
        <TextInput
          textArea
          maxLength={150}
          onChange={setNotes}
          backgroundColor={colors.grey}
          placeholder="Add notes..."
        />
      }
      <Spacer />
      <Row xAlign="space-around" margin={{mb: 8}}>
        <Text style={styles.prevBest}>50KG x 10</Text>
        <TextInput
          style={styles.repInput}
          onChange={(val: string) =>
            onUpdate('reps', 0, val ? parseInt(val, 10) : '')
          }
          maxLength={2}
          placeholder={'Reps'}
          defaultValue={data[0].reps.toString()}
        />
        <TextInputWithLabel
          style={styles.weightInput}
          onChange={(val: string) =>
            onUpdate('weight', 0, val ? parseInt(val, 10) : '')
          }
          maxLength={2}
          placeholder={'0'}
          backgroundColor={colors.white}
          label="kg"
          defaultValue={data[0].weight.toString()}
        />
        {data[0].completed === false ? (
          <Icon
            name="circle"
            style={styles.notDone}
            size={20}
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
        {/* <Pressable onPress={() => onRemove(0)}>
          <Text>RM</Text>
        </Pressable> */}
      </Row>
      {data.slice(1).map((item, index) => (
        <SetRow
          key={index}
          index={index}
          repValue={data[index + 1]['reps']}
          weightValue={data[index + 1]['weight']}
          onUpdate={(type, index, newVal) => onUpdate(type, index + 1, newVal)}
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
