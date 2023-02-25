import React, {useCallback} from 'react';
import {Box, Icon, Input, Modal} from 'native-base';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DateInputProps {
  value: Date;
  onChangeValue: (newValue: Date) => void;
}

const DateInput = ({value, onChangeValue}: DateInputProps) => {
  const [dateVal, setDateVal] = useState(value);
  const [showPicker, setShowPicker] = useState(false);

  const ShowPicker = useCallback(() => setShowPicker(true), []);

  const _onChangeValue = (newValue: Date) => {
    setDateVal(newValue);
    onChangeValue(newValue);
  };

  return (
    <>
      <Box>
        <Input
          value={dateVal.toLocaleString()}
          onPressIn={ShowPicker}
          isReadOnly
          rightElement={
            <Icon
              as={Ionicons}
              size={5}
              mr={3}
              color="black"
              name="calendar-outline"
            />
          }
        />
      </Box>
      <Modal
        size={'full'}
        animationPreset="slide"
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}>
        <Modal.Content marginTop="auto" marginBottom={0} width="100%">
          <Box mx="auto">
            <DatePicker
              mode="datetime"
              date={dateVal}
              onDateChange={_onChangeValue}
            />
          </Box>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default DateInput;
