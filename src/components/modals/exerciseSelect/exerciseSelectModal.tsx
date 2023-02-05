import {
  Box,
  Button,
  Icon,
  Input,
  Menu,
  Pressable,
  Row,
  Text,
  Modal,
  FlatList,
} from 'native-base';
import React, {useContext, useState} from 'react';
import FA from 'react-native-vector-icons/FontAwesome';

import {ExerciseCategories} from '../../../constants/exercises';
import ExerciseContext from '../../../contexts/exercises';
import Session from '../../../contexts/session';
import useStartup from '../../../hooks/useStartup';
import {getExercises} from '../../../services/api/workout';
import {Exercise} from '../../../types/workouts';
import {ModalProps} from '../modalProps';

interface ExerciseSelectModalProps extends ModalProps {
  onSelect: (selectedItem: Exercise) => void;
}

const ExerciseSelectModal: React.FC<ExerciseSelectModalProps> = ({
  onHide,
  onSelect,
  show,
}) => {
  const {exercises, onUpdate} = useContext(ExerciseContext);
  const session = useContext(Session);

  console.log('Exercises:', exercises);
  useStartup(() => {
    if (exercises.length === 0) {
      getExercises(session!).then(res => onUpdate(res.exercises));
    }
  });

  const categories = Object.keys(ExerciseCategories);

  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<ExerciseCategories>();

  const hide = () => {
    onHide();
  };

  const select = (item: Exercise) => {
    hide();
    onSelect(item);
  };

  const selectCategory = (_category: ExerciseCategories) => {
    if (_category === selectedCategory) setSelectedCategory(undefined);
    else setSelectedCategory(_category);
  };

  const dropdownButton = (triggerProps: any) => (
    <Pressable px={2} py={1.5} {...triggerProps} bg="gray.300" borderRadius={8}>
      <Row w="100%" justifyContent="space-between">
        <Text fontWeight={600} ml={1} fontSize={15} textAlign={'center'}>
          {(selectedCategory as unknown as string) ?? 'Select Category'}
        </Text>
        <Icon as={FA} size={6} name="caret-down" />
      </Row>
    </Pressable>
  );

  return (
    <Modal isOpen={show} size="xl" animationPreset="slide">
      <Modal.Content p={2} h="100%">
        <Input
          InputLeftElement={
            <Icon
              as={FA}
              name="search"
              color="gray.100"
              w="20px"
              ml={2}
              size={4}
            />
          }
          my={1}
          fontWeight={600}
          py={1.5}
          onChangeText={setFilter}
          bgColor={'black'}
          color={'white'}
          borderRadius={8}
          maxLength={20}
        />
        <Box>
          <Menu trigger={dropdownButton} bg="gray.400" borderRadius={8}>
            {categories.map(category => (
              <Menu.Item
                onPress={() => selectCategory(category as ExerciseCategories)}>
                {category}
              </Menu.Item>
            ))}
          </Menu>
        </Box>
        <FlatList
          mt={2.5}
          data={
            selectedCategory
              ? exercises.filter(e =>
                  e.category.includes(selectedCategory as any),
                )
              : exercises.filter(e => e.name.includes(filter))
          }
          renderItem={item => (
            <Pressable
              onPress={() => select(item.item.name)}
              borderTopColor="gray.400"
              borderTopWidth={1}
              px={1.5}
              py={3}>
              <>
                <Text fontWeight={600} mb={1}>
                  {item.item.name}
                </Text>
                <Text>{item.item.category[0]}</Text>
              </>
            </Pressable>
          )}
        />
        <Button
          mt={2}
          w="100%"
          fontWeight={600}
          textAlign="center"
          colorScheme={'danger'}
          onPress={hide}>
          Close
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default ExerciseSelectModal;
