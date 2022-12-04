import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ExerciseSet, Set} from '../../data/exercises';
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
    type: keyof ExerciseSet['data'][number] | 'metric',
    setIndex: number,
    newValue: number | string | ExerciseSet['metric'],
  ) => void;
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
    type: keyof ExerciseSet['data'][number] | 'metric',
    setIndex?: number,
    newValue?: number | string | ExerciseSet['metric'],
  ) => void;
}

const SettingsItems = [
  {
    name: 'Add Notes',
  },
  {
    name: 'Remove Notes',
  },
];

const MetricsItems = [
  {name: 'Reps', value: '120 Reps'},
  {name: 'Volume', value: '1503kg'},
  {name: 'Volume Increase', value: '+50%'},
  {name: 'Max Weight', value: '53kg'},
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
  const [metric, setMetric] = useState<typeof MetricsItems[number]>(
    MetricsItems[0],
  );

  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const onPressSettingsItem = (item: typeof SettingsItems[number]) => {
    if (item.name === 'Add Notes') {
      setShowNotes(true);
    } else if (item.name === 'Remove Notes') {
      setShowNotes(false);
    }
  };

  const onUpdateMetric = (newVal: ExerciseSet['metric']) => {
    onUpdate('metric', undefined, {
      name: newVal.name,
      value: newVal.value,
    });
  };

  return (
    <View style={styles.exerciseItem}>
      <Row yAlign="center" padding={{pb: 6}}>
        <Dropdown
          style={styles.settingsDropdown}
          placeholderStyle={styles.settingsDropdownText}
          containerStyle={styles.settingsDropdownMenu}
          itemTextStyle={styles.settingsDropdownMenuItem}
          selectedTextStyle={styles.settingsDropdownText}
          renderRightIcon={() => (
            <Row>
              <Icon
                name="cog"
                size={16}
                color={colors.black}
                style={{marginRight: 4}}
              />
              <Icon name="caret-down" size={16} color={colors.black} />
            </Row>
          )}
          data={SettingsItems}
          labelField={'name'}
          valueField={'name'}
          onChange={newVal => onPressSettingsItem(newVal.name)}
        />
        <Dropdown
          style={styles.metricsDropdown}
          placeholderStyle={styles.metricsDropdownPlaceholder}
          containerStyle={styles.metricsDropdownMenu}
          itemTextStyle={styles.metricsDropdownText}
          selectedTextStyle={styles.metricsDropdownButtonText}
          renderRightIcon={() => (
            <Icon
              name="caret-down"
              size={16}
              color={colors.black}
              style={{marginRight: 8}}
            />
          )}
          data={MetricsItems}
          labelField={'value'}
          valueField={'value'}
          onChange={newVal => onUpdateMetric(newVal)}
          value={metric}
        />
        <Text style={[styles.exerciseName, Styles.textCenter]}>{name}</Text>
      </Row>
      {showNotes && (
        <TextInput
          textArea
          maxLength={150}
          onChange={setNotes}
          backgroundColor={colors.grey}
          placeholder="Add notes..."
        />
      )}
      <Spacer />
      {/* <Row xAlign="space-around" margin={{mb: 12}}>
        <Text style={styles.prevBest}>50KG x 10</Text>
        <TextInput
          style={styles.repInput}
          onChange={(val: string) =>
            onUpdate('reps', 0, val ? parseInt(val, 10) : '')
          }
          maxLength={2}
          placeholder={'Reps'}
          defaultValue={data[0].reps.toString()}
          borderRadius={8}
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
      {/* </Row> */}
      {data.map((item, index) => (
        <SetRow
          key={index}
          index={index}
          repValue={data[index].reps}
          weightValue={data[index].weight}
          onUpdate={(type, index, newVal) => onUpdate(type, index, newVal)}
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
