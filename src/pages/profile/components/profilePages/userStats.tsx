import {
  Box,
  Button,
  Icon,
  Input,
  Menu,
  Pressable,
  Row,
  Text,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {HeightMetrics, WeightMetrics} from '../../../../constants/misc';
import Session from '../../../../contexts/session';
import {updateUserStats} from '../../../../services/api/user';
import {colors} from '../../../../util/styles';
import Ionic from 'react-native-vector-icons/Ionicons';

const UserStats = () => {
  const session = useContext(Session);
  const [bodyWeight, setBodyWeight] = useState<number>(
    session?.account.stats.weight?.value ?? 0,
  );
  const [height, setHeight] = useState<number>(
    session?.account.stats.height?.value ?? 0,
  );

  const [metrics, setMetrics] = useState<{
    weight: (typeof WeightMetrics)[number];
    height: (typeof HeightMetrics)[number];
  }>({
    weight: session?.account.stats.weight?.unit ?? 'kg',
    height: session?.account.stats.height?.unit ?? 'cm',
  });

  const onChangeMetric = (
    item: (typeof WeightMetrics)[number] | (typeof HeightMetrics)[number],
  ) => {
    if (WeightMetrics.includes(item as any)) {
      setMetrics(prev => ({...prev, weight: item as any}));
    } else {
      setMetrics(prev => ({...prev, height: item as any}));
    }
  };

  const onSave = () => {
    if (height && bodyWeight) {
      const data = {
        height: {
          unit: metrics.height,
          value: height,
        },
        weight: {
          unit: metrics.weight,
          value: bodyWeight,
        },
      };
      updateUserStats(session!, data).then(success => {
        if (success) {
          session?.update('stats', {
            height: {unit: metrics.height, value: height},
            weight: {unit: metrics.weight, value: bodyWeight},
          });
        }
      });
    }
  };

  const weightTrigger = (triggerProps: any) => (
    <Pressable {...triggerProps} ml={1.5} flexDir="row" alignItems="center">
      <Text>KG</Text>
      <Icon as={Ionic} name="caret-down" size={4} color="black" />
    </Pressable>
  );

  const heightTrigger = (triggerProps: any) => (
    <Pressable {...triggerProps} ml={1.5} flexDir="row" alignItems="center">
      <Text>CM</Text>
      <Icon as={Ionic} name="caret-down" size={4} color="black" />
    </Pressable>
  );

  return (
    <Box w="100%">
      <Row>
        <Box w="50%" pr={1}>
          <Text fontWeight={500} textAlign="center" mb={1} mt={2}>
            Height
          </Text>
          <Row>
            <Input
              backgroundColor={colors.white}
              borderBottomRightRadius={8}
              borderTopRightRadius={8}
              defaultValue={height.toString()}
              onChangeText={newVal => setHeight(parseInt(newVal, 10))}
              w="100%"
              textAlign={'center'}
              InputLeftElement={
                <Menu trigger={heightTrigger}>
                  {HeightMetrics.map(metric => (
                    <Menu.Item onPress={() => onChangeMetric(metric)}>
                      {metric}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              mr={'auto'}
              value={height.toString()}
            />
          </Row>
        </Box>
        <Box w="50%" pl={1}>
          <Text fontWeight={500} textAlign="center" mb={1} mt={2}>
            Weight
          </Text>
          <Row>
            <Input
              backgroundColor={colors.white}
              borderBottomRightRadius={8}
              borderTopRightRadius={8}
              defaultValue={bodyWeight.toString()}
              onChangeText={newVal => setBodyWeight(parseInt(newVal, 10))}
              textAlign="center"
              leftElement={
                <Menu trigger={weightTrigger}>
                  {WeightMetrics.map(metric => (
                    <Menu.Item onPress={() => onChangeMetric(metric)}>
                      {metric}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              w="100%"
              mr={'auto'}
              value={bodyWeight.toString()}
            />
          </Row>
        </Box>
      </Row>
      <Button mt={2.5} onPress={onSave}>
        Save
      </Button>
    </Box>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//   },
//   inputLabel: {
//     color: colors.white,
//     fontSize: 14,
//     fontWeight: '500',
//     textAlign: 'center',
//     marginBottom: 5,
//     marginTop: 8,
//   },
//   input: {
//     width: '70%',
//     marginRight: 'auto',
//   },
//   w50: {
//     width: '50%',
//   },
//   inputTextInput: {
//     padding: 6,
//     paddingHorizontal: 8,
//   },
//   metricsDropdown: {
//     width: 50,
//     backgroundColor: colors.white,
//     height: 33,
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//     paddingLeft: 8,
//   },
//   metricsDropdownContainer: {
//     width: 100,
//     left: 50,
//     borderRadius: 8,
//   },
// });

export default UserStats;
