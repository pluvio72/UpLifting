import React, {useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../ExerciseItem.styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ExerciseSet} from '../../../types/workouts';
import {Button, HStack, Icon, Input, Menu, Text} from 'native-base';

interface SetRowProps {
  completed: boolean;
  index: number;
  pastSets: ExerciseSet['pastSets'];
  repValue?: number;
  weightValue?: number;
  onRemove: (setIndex: number) => void;
  onUpdate: (type: 'reps' | 'weight', index: number, value?: number) => void;
  toggleComplete: (setIndex: number) => void;
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
  repValue,
  weightValue,
  pastSets,
  onRemove,
  onUpdate,
  toggleComplete,
}) => {
  const updateRef = useRef<Swipeable>(null);

  const SwipeItems = (progress: any, dragX: Animated.Value) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-100, 65],
    });

    return (
      <Animated.View
        style={[
          styles.swipeDeleteContainer,
          {
            transform: [{translateX: trans}],
          },
        ]}>
        <TouchableOpacity onPress={() => onRemove(index)}>
          <Icon as={Ionicons} name="trash" size={6} color="dark.100" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const pastSetsButton = (triggerProps: any) => (
    <Button
      alignSelf="center"
      bg="transparent"
      rightIcon={
        <Icon as={FontAwesome} color="dark.500" name="angle-down" size={18} />
      }
      _pressed={{
        bg: 'transparent',
      }}
      _text={{color: 'dark.500'}}
      w={'40%'}
      {...triggerProps}>
      10 x 19kg
    </Button>
  );

  return (
    <Swipeable
      ref={updateRef}
      renderLeftActions={SwipeItems}
      overshootLeft={false}>
      <HStack
        justifyContent="space-around"
        alignItems="center"
        display="flex"
        w={'100%'}
        bg={completed ? 'primary.200' : 'transparent'}>
        <Menu trigger={triggerProps => pastSetsButton(triggerProps)}>
          {/* {pastSets!.map(set => (
            <Select.Item label={set.value} value={''} />
          ))} */}
          <Menu.Item>20 x 10kg</Menu.Item>
          <Menu.Item>20 x 10kg</Menu.Item>
          <Menu.Item>20 x 10kg</Menu.Item>
        </Menu>
        <Input
          style={styles.repInput}
          onChangeText={(val: string) => {
            onUpdate('reps', index, val ? parseFloat(val) : undefined);
          }}
          maxLength={2}
          selectTextOnFocus
          placeholder={'Reps'}
          defaultValue={repValue?.toString()}
          borderRadius={8}
          w={'16%'}
          px={2}
          py={1}
          textAlign="center"
          backgroundColor={completed ? 'primary.200' : 'white'}
        />
        <Input
          bgColor="white"
          w={'17.5%'}
          textAlign="center"
          py={1}
          px={1}
          leftElement={<Text pl={2}>kg</Text>}
          onChangeText={(val: string) =>
            onUpdate('weight', index, val ? parseFloat(val) : undefined)
          }
          maxLength={3}
          selectTextOnFocus
          placeholder={'0'}
          defaultValue={weightValue?.toString()}
          backgroundColor={completed ? 'primary.200' : 'white'}
        />
        <Icon
          onPress={() => toggleComplete(index + 1)}
          as={Ionicons}
          name={
            completed ? 'md-checkmark-circle' : 'md-checkmark-circle-outline'
          }
          size={26}
          color="muted.400"
        />

        {/* <Pressable onPress={() => onRemove(index + 1)}>
              <Text>RM</Text>
            </Pressable> */}
      </HStack>
    </Swipeable>
  );
};

export default ExerciseItemSet;
