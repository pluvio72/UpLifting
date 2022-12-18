import {StyleSheet} from 'react-native';
import {colors} from '../../../util/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    padding: 12,
  },
  exerciseContainer: {
    backgroundColor: colors.grey200,
    padding: 16,
    width: '100%',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 8,
  },
  set: {
    width: '20%',
    paddingBottom: 8,
  },
  setText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
