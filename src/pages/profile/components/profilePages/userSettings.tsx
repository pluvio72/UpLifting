import {Icon, Menu, Pressable, Text} from 'native-base';
import React, {useCallback, useContext, useState} from 'react';
import Session from '../../../../contexts/session';
import {updateUserSettings} from '../../../../services/api/user';
import {UserAccountMetricsSettings} from '../../../../types/user';
import FA from 'react-native-vector-icons/FontAwesome';

const UserSettings = () => {
  const session = useContext(Session);
  const [chosenMetric, setChosenMetric] = useState<
    (typeof UserAccountMetricsSettings)[number]
  >(UserAccountMetricsSettings[0]);

  const onUpdateKgDropdown = (
    value: (typeof UserAccountMetricsSettings)[number],
  ) => {
    setChosenMetric(value);
    updateUserSettings(session!, {useKilos: value === 'KG'}).then(result => {
      console.log('Result:', result);
    });
    session?.update('settings', {useKilos: value === 'KG'});
  };

  const MetricsButton = useCallback(
    (triggerProps: any) => (
      <Pressable
        {...triggerProps}
        flexDir="row"
        justifyContent={'space-between'}
        bg="gray.200"
        px={2}
        py={1}
        borderRadius={8}>
        <Text ml={1} fontWeight={500}>
          {chosenMetric}
        </Text>
        <Icon as={FA} name="caret-down" size={6} color="black" />
      </Pressable>
    ),
    [chosenMetric],
  );

  return (
    <>
      <Text textAlign="center" w="100%" fontWeight={600} mb={1.5}>
        Weight Measurement
      </Text>
      <Menu trigger={MetricsButton} w={500}>
        {UserAccountMetricsSettings.map(metric => (
          <Menu.Item onPress={() => onUpdateKgDropdown(metric)}>
            {metric}
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

// const styles = StyleSheet.create({
//   kgDropdownLabel: {
//     color: colors.white,
//     textAlign: 'center',
//     width: '100%',
//     fontWeight: '600',
//     fontSize: 14,
//     marginBottom: 6,
//   },
//   kgDropdown: {
//     width: '100%',
//     backgroundColor: colors.grey100,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//   },
//   kgDropdownItemText: {
//     color: colors.black,
//     fontWeight: '500',
//     marginVertical: -10,
//   },
//   kgDropdownItemContainer: {},
//   kgDropdownContainer: {
//     borderRadius: 8,
//   },
// });

export default UserSettings;
