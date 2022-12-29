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
import Icon from 'react-native-vector-icons/FontAwesome';

import allExercises, {ExerciseCategories} from '../../../constants/exercises';
import {Exercise} from '../../../types/workouts';
import {colors, Styles} from '../../../util/styles';
import Button from '../../button';
import TextInputWithLabel from '../../inputs/TextInputWithLabel';
import {ModalProps} from '../modalProps';
import styles from './exerciseSelectModal.styles';

interface ExerciseSelectModalProps extends ModalProps {
  onSelect: (selectedItem: Exercise) => void;
}

const ExerciseSelectModal: React.FC<ExerciseSelectModalProps> = ({
  onHide,
  onSelect,
  show,
}) => {
  const keys = Object.keys(ExerciseCategories);

  const categories = keys.map(e => ({name: e}));

  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<{
    name: typeof ExerciseCategories;
  }>();

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
        <TextInputWithLabel
          label={
            <Icon
              name="search"
              color={colors.grey100}
              style={{paddingHorizontal: 12}}
            />
          }
          style={styles.filterWrapper}
          onChange={setFilter}
          backgroundColor={colors.black}
          textColor={colors.white}
          borderRadius={8}
        />
        <View>
          <Dropdown
            style={styles.dropdownWrapper}
            activeColor={colors.grey400}
            data={categories}
            labelField={'name'}
            valueField={'name'}
            onChange={e => {
              if (selectedCategory?.name === e.name) {
                setSelectedCategory(undefined);
              } else {
                setSelectedCategory(e);
              }
            }}
            value={selectedCategory}
          />
        </View>
        <FlatList
          style={styles.listWrapper}
          data={
            selectedCategory?.name
              ? allExercises.filter(e =>
                  e.category.includes(selectedCategory.name as never),
                )
              : allExercises.filter(e => e.name.includes(filter))
          }
          renderItem={item => (
            <TouchableHighlight
              underlayColor={colors.grey}
              onPress={() => select(item.item.name)}
              style={styles.itemWrapper}>
              <>
                <Text style={[Styles.textBold, {marginBottom: 4}]}>
                  {item.item.name}
                </Text>
                <Text>{item.item.category[0]}</Text>
              </>
            </TouchableHighlight>
          )}
        />
        <Button
          margin={{mx: 20}}
          bold
          textAlign="center"
          color={colors.accent}
          onPress={hide}>
          Close
        </Button>
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseSelectModal;
