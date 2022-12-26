import {StyleSheet} from 'react-native';
import {colors} from '../../../util/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    bottom: 0,
    position: 'absolute',
  },
  closeContainer: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  close: {
    marginLeft: 'auto',
    marginRight: 8,
  },
  image: {
    marginBottom: 2,
    borderWidth: 3,
  },
  selectText: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 'auto',
    marginLeft: 20,
  },
});

export default styles;
