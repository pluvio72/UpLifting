import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ExerciseSet, Set} from '../../types/workouts';
import {colors, Styles} from '../../util/styles';
import Button from '../button';
import {TextInput} from '../inputs/TextInput';
import TextInputWithLabel from '../inputs/TextInputWithLabel';
import {Row} from '../Reusable/reusable';
import Spacer from '../spacer';
import styles from './ExerciseItem.styles';

type onUpdate = (
  type: keyof ExerciseSet['sets'][number] | 'metric' | 'note',
  setIndex?: number,
  newValue?: string | number | ExerciseSet['metric'],
) => void;

interface SetRowProps {
  completed: boolean;
  index: number;
  onRemove: (setIndex: number) => void;
  onUpdate: onUpdate;
  repValue: number | string;
  toggleComplete: (setIndex: number) => void;
  weightValue: number | string;
}

interface ExerciseItemProps {
  addSet: () => void;
  data: Set[];
  name: string;
  onRemove: (setIndex: number) => void;
  onUpdate: onUpdate;
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

const SettingsItems = [
  {
    name: 'Add Notes',
  },
  {
    name: 'Remove Notes',
  },
];

const MetricsItems = [
  {name: 'Reps', value: '0 Reps'},
  {name: 'Volume', value: '0kg'},
  {name: 'Volume Increase', value: '+0%'},
  {name: 'Max Weight', value: '0kg'},
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
  const [note, setNote] = useState('');

  const updateMetricsValues = () => {
    MetricsItems[0].value =
      data
        .reduce((total, curVal) => {
          return total + (curVal.reps as number);
        }, 0)
        .toString() + ' Reps';

    MetricsItems[1].value =
      data
        .reduce((total, curVal) => {
          return total + (curVal.reps as number) * (curVal.weight as number);
        }, 0)
        .toString() + 'kg';

    // TODO:
    // last exercise vol
    MetricsItems[2].value = '+NA';

    MetricsItems[3].value = data
      .reduce((total, curVal) => {
        return total > curVal.weight ? total : (curVal.weight as number);
      }, 0)
      .toString();
  };

  const onPressSettingsItem = (item: string) => {
    if (item === 'Add Notes') {
      setShowNotes(true);
    } else if (item === 'Remove Notes') {
      setShowNotes(false);
    }
  };

  const onUpdateMetric = (newVal: ExerciseSet['metric']) => {
    onUpdate('metric', undefined, {
      name: newVal.name,
      value: newVal.value,
    });
  };

  const onUpdateNote = (newVal: string) => {
    setNote(newVal);
    onUpdate('note', undefined, newVal);
  };

  const onUpdateData = (
    type: keyof ExerciseSet['sets'][number] | 'metric' | 'note',
    setIndex?: number,
    newValue?: number | string | ExerciseSet['metric'],
  ) => {
    onUpdate(type, setIndex, newValue);
    updateMetricsValues();
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
          itemContainerStyle={{
            borderTopColor: 'rgb(180,180,180)',
            borderTopWidth: 1,
          }}
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
          placeholder="Metric"
        />
        <Text style={[styles.exerciseName, Styles.textCenter]}>{name}</Text>
      </Row>
      {showNotes && (
        <TextInput
          textArea
          autoFocus
          maxLength={150}
          onChange={newVal => onUpdateNote(newVal)}
          backgroundColor={colors.grey}
          style={styles.note}
          placeholder="Add notes..."
        />
      )}
      <Spacer />
      {data.map((item, index) => (
        <SetRow
          key={index}
          index={index}
          repValue={data[index].reps}
          weightValue={data[index].weight}
          onUpdate={(type, index2, newVal) => onUpdateData(type, index, newVal)}
          completed={item.completed}
          toggleComplete={() => toggleCompleted(index)}
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
