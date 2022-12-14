import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ExerciseSet, Set} from '../../types/workouts';
import {colors, Styles} from '../../util/styles';
import Button from '../button';
import {TextInput} from '../inputs/TextInput';
import {Row} from '../Reusable/reusable';
import Spacer from '../spacer';
import ExerciseItemSet from './components/ExerciseItemSet';
import styles from './ExerciseItem.styles';

export type onUpdate = (
  type: keyof ExerciseSet['sets'][number] | 'metric' | 'note',
  setIndex?: number,
  newValue?: string | number | ExerciseSet['metric'],
) => void;

interface ExerciseItemProps {
  addSet: () => void;
  data: Set[];
  name: string;
  onRemove: (setIndex: number) => void;
  onRemoveExercise: () => void;
  onUpdate: onUpdate;
}

const Settings = [
  'Add Photo/Video',
  'Add Notes',
  'Remove Notes',
  'Remove Exercise',
] as const;
const SettingsItems = Settings.map(e => ({name: e}));

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
  onRemoveExercise,
}) => {
  const toggleCompleted = (setIndex: number) => {
    onUpdate('completed', setIndex);
  };
  const [metric, setMetric] = useState<typeof MetricsItems[number]>(
    MetricsItems[0],
  );

  const [showNotes, setShowNotes] = useState(false);

  const updateMetricsValues = () => {
    MetricsItems[0].value =
      data
        .reduce((total, curVal) => total + (curVal.reps as number), 0)
        .toString() + ' Reps';

    MetricsItems[1].value =
      data
        .reduce(
          (total, curVal) =>
            total + (curVal.reps as number) * (curVal.weight as number),
          0,
        )
        .toString() + 'kg';

    // TODO:
    // last exercise vol
    MetricsItems[2].value = '+NA';

    MetricsItems[3].value =
      data
        .reduce(
          (total, curVal) =>
            total > curVal.weight ? total : (curVal.weight as number),
          0,
        )
        .toString() + 'kg';
  };

  const onPressSettingsItem = (item: typeof Settings[number]) => {
    switch (item) {
      case 'Add Notes':
        setShowNotes(true);
        break;
      case 'Remove Notes':
        setShowNotes(false);
        break;
      case 'Remove Exercise':
        onRemoveExercise();
        break;
    }
  };

  const onUpdateMetric = (newVal: ExerciseSet['metric']) => {
    onUpdate('metric', undefined, {
      name: newVal.name,
      value: newVal.value,
    });
  };

  const onUpdateNote = (newVal: string) => {
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

  // console.log('Metric:', metric);
  return (
    <View style={styles.exerciseItem}>
      <Row yAlign="center" padding={{pb: 6, px: 12, pt: 12}}>
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
        <ExerciseItemSet
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
        margin={{mx: 12, mb: 12, mt: 8}}
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
