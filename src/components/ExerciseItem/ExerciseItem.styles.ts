import {StyleSheet} from 'react-native';
import {colors} from '../../util/styles';

const styles = StyleSheet.create({
  exerciseItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.grey,
    borderRadius: 6,
    marginBottom: 4,
  },
  repInput: {
    borderWidth: 0,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  weightInput: {
    borderWidth: 0,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  exerciseName: {
    fontWeight: '600',
    paddingHorizontal: 8,
    fontSize: 16,
    flexGrow: 2,
    width: '50%',
  },
  prevBest: {
    width: '50%',
  },
  prevBestText: {
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  prevBestDropdownText: {
    textAlign: 'center',
    margin: -10,
    fontWeight: '600',
    fontSize: 14,
  },
  prevBestDropdown: {
    backgroundColor: colors.grey200,
    borderRadius: 8,
  },
  prevBestDropdownItem: {},
  metricsDropdown: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    flexGrow: 3,
    marginLeft: 10,
  },
  metricsDropdownMenu: {
    borderRadius: 8,
    width: '50%',
  },
  metricsDropdownPlaceholder: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  metricsDropdownButtonText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '600',
    paddingLeft: 8,
  },
  metricsDropdownText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
    paddingLeft: 8,
  },
  settingsDropdown: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  settingsDropdownText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '600',
    paddingLeft: 8,
    display: 'none',
  },
  settingsDropdownMenu: {
    borderRadius: 8,
    width: '40%',
  },
  settingsDropdownMenuItem: {
    fontSize: 12,
    fontWeight: '600',
    marginVertical: -6,
  },
  done: {
    color: colors.green,
  },
  notDone: {
    color: colors.red,
  },
});

export default styles;
