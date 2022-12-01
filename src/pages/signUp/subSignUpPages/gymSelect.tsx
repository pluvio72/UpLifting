import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../../../components/button';
import BackButton from '../../../components/button/backButton';
import RequestAddGym from '../../../components/modals/requestAddGym/RequestAddGym';
import Spacer from '../../../components/spacer';
import registrationContext from '../../../contexts/registration';
import {getGyms} from '../../../services/api/gym';
import {Gym} from '../../../types/gyms';
// import {ShuffleArray} from '../../../util/format';
import {colors} from '../../../util/styles';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const GymSelect = ({onBack, onNext}: Props) => {
  const [gyms, setGyms] = useState<Array<Gym>>([]);
  const GymBrands = Array.from(new Set(gyms?.map(e => e.brand)));

  const {onChange} = useContext(registrationContext);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const [showAddGymModal, setShowAddGymModal] = useState(false);
  const showGymModal = () => setShowAddGymModal(true);
  const hideGymModal = () => setShowAddGymModal(false);

  useEffect(() => {
    getGyms().then((_gyms: Array<Gym> | undefined) => {
      setGyms(_gyms!);
    });
  }, []);

  const onSelectBrand = (newVal: {name: string}) => {
    setSelectedBrand(newVal.name);
  };

  const submit = () => {
    if (selectedBrand && selectedName) {
      onChange({
        gym_details: gyms.find(
          e => e.name === selectedName && e.brand === selectedBrand,
        )!,
      });
      onNext();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RequestAddGym show={showAddGymModal} onHide={hideGymModal} />
      <BackButton style={{top: '5%'}} onPress={onBack} />
      <Text style={styles.header}>Select Gym</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownMenu}
        itemTextStyle={styles.dropdownMenuItem}
        selectedTextStyle={{fontWeight: '500'}}
        placeholderStyle={{fontWeight: '500'}}
        data={GymBrands?.map(e => ({name: e}))}
        onChange={onSelectBrand}
        valueField={'name'}
        labelField={'name'}
        value={selectedBrand}
        placeholder="Brand"
      />
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownMenu}
        itemTextStyle={styles.dropdownMenuItem}
        search
        searchPlaceholder="Enter Gym Name..."
        selectedTextStyle={{fontWeight: '500'}}
        placeholderStyle={{fontWeight: '500'}}
        data={gyms
          ?.filter(e => e.brand === selectedBrand)
          .map(e => ({name: e.name}))}
        onChange={val => setSelectedName(val.name)}
        valueField={'name'}
        labelField={'name'}
        value={selectedName}
        placeholder="Name"
      />
      <Button color={colors.accent} bold textAlign="center" onPress={submit}>
        Next
      </Button>
      <Spacer size={3} />
      <TouchableOpacity onPress={showGymModal}>
        <Text style={styles.addGym}>Can't find gym? Add new gym</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  header: {
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: colors.white,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  dropdownMenu: {
    borderRadius: 6,
    backgroundColor: colors.grey200,
  },
  dropdownMenuItem: {margin: -6, fontWeight: '500'},
  addGym: {
    color: colors.blue,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default GymSelect;
