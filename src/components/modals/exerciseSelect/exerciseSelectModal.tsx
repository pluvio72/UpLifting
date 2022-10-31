import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import allExercises, {
  Exercise,
  ExerciseCategories,
  ExerciseData,
  exercises,
} from '../../../data/exercises';
import {colors} from '../../../util/styles';
import Button from '../../button';
import {TextInput} from '../../inputs/TextInput';
import styles from './exerciseSelectModal.styles';

interface ExerciseSelectModalProps {
  show: boolean;
  onHide: () => void;
  onSelect: (selectedItem: Exercise) => void;
}

const ExerciseSelectModal: React.FC<ExerciseSelectModalProps> = ({
  onHide,
  onSelect,
  show,
}) => {
  const categories = new Array({name: 'All'}).concat(
    Object.keys(ExerciseCategories).map(e => ({name: e})),
  );

  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    typeof categories[number]
  >(categories[0]);

  const hide = () => {
    onHide();
  };

  const select = (item: Exercise) => {
    hide();
    onSelect(item);
  };

  return (
    <Modal visible={show} animationType="slide">
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.filterWrapper}
          onChange={setFilter}
          backgroundColor={colors.black}
          textColor={colors.white}
        />
        <View>
          <Dropdown
            style={styles.dropdownWrapper}
            data={categories}
            labelField={'name'}
            valueField={'name'}
            onChange={e => {
              setSelectedCategory(e);
            }}
            value={selectedCategory}
          />
        </View>
        <FlatList
          style={styles.listWrapper}
          data={
            selectedCategory.name !== 'All'
              ? exercises.filter(
                  e =>
                    e.category ===
                    (selectedCategory.name as unknown as ExerciseCategories),
                )
              : allExercises.filter(e => e.name.includes(filter))
          }
          renderItem={item => (
            <TouchableHighlight
              underlayColor={colors.grey}
              onPress={() => select(item.item.name)}>
              <Text style={styles.item}>{item.item.name}</Text>
            </TouchableHighlight>
          )}
        />
        <Button color={colors.accent} onPress={hide}>
          Close
        </Button>
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseSelectModal;
