import {StyleSheet} from 'react-native';
import {colors} from '../../util/styles';

const styles = StyleSheet.create({
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },
  title: {
    marginBottom: 12,
  },
  detailsWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  alreadyHaveAccount: {
    fontWeight: '500',
    color: colors.blue,
  },
});

export default styles;
