import {StyleSheet} from 'react-native';
import {colors} from '../../util/styles';

const styles = StyleSheet.create({
  item: {
    paddingVertical: 14,
    paddingHorizontal: 2,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey600,
    flexDirection: 'column',
  },
  category: {
    color: colors.grey700,
    fontWeight: '200',
  },
});

export default styles;
