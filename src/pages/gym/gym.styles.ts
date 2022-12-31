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
    marginLeft: 12,
  },
  latestPR: {
    backgroundColor: colors.grey200,
    paddingVertical: 8,
  },
  prText: {
    width: '33%',
    textAlign: 'center',
  },
  chartWrapper: {
    margin: 12,
  },
  headerInfo: {
    marginRight: 12,
    textDecorationLine: 'underline',
  },
  largeText: {
    fontSize: 60,
    fontWeight: '800',
    width: '50%',
    textAlign: 'center',
  },
  horizontalAlign: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  bottomText: {
    width: '50%',
    textAlign: 'center',
  },
});
