import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Session from '../../../../contexts/session';
import {updateUserSettings} from '../../../../services/api/user';
import {colors} from '../../../../util/styles';

const metricSettings = ['KG', 'LB'].map(e => ({value: e}));

const UserSettings = () => {
  const session = useContext(Session);

  const onUpdateKgDropdown = (item: (typeof metricSettings)[number]) => {
    const {value} = item;
    updateUserSettings(session!, {useKilos: value === 'KG'}).then(result => {
      console.log('Result:', result);
    });
    session?.update('settings', {useKilos: value === 'KG'});
  };

  return (
    <>
      <Text style={styles.kgDropdownLabel}>Weight Measurement</Text>
      <Dropdown
        data={metricSettings}
        labelField={'value'}
        valueField={'value'}
        value={metricSettings[0]}
        style={styles.kgDropdown}
        itemTextStyle={styles.kgDropdownItemText}
        selectedTextStyle={styles.kgDropdownItemText}
        placeholderStyle={styles.kgDropdownItemText}
        containerStyle={styles.kgDropdownContainer}
        itemContainerStyle={styles.kgDropdownItemContainer}
        onChange={onUpdateKgDropdown}
      />
    </>
  );
};

const styles = StyleSheet.create({
  kgDropdownLabel: {
    color: colors.white,
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  kgDropdown: {
    width: '100%',
    backgroundColor: colors.grey100,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  kgDropdownItemText: {
    color: colors.black,
    fontWeight: '500',
    marginVertical: -10,
  },
  kgDropdownItemContainer: {},
  kgDropdownContainer: {
    borderRadius: 8,
  },
});

export default UserSettings;
