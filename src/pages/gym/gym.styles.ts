import {StyleSheet} from 'react-native';
import { colors } from '../../util/styles';

export const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  gymBrand: {
    fontWeight: '800',
    fontSize: 26,
  },
  gymName: {
    fontWeight: '400',
    fontSize: 26,
  },
  bold: {
    fontWeight: '600',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    marginLeft: 12,
  },
  latestPR: {
    backgroundColor: colors.grey200,
    paddingVertical: 8,
    // justifyContent: 'space-evenly',
  },
  prText: {
    width: '33%',
    textAlign: 'center',
  },
});
