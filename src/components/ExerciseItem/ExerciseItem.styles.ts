import {StyleSheet} from 'react-native';
import {colors} from '../../util/styles';

const styles = StyleSheet.create({
  exerciseItem: {
    backgroundColor: colors.grey,
    marginBottom: 8,
  },
  repInput: {
    borderWidth: 0,
    paddingHorizontal: 6,
    paddingVertical: 4,
    width: 45,
    textAlign: 'center',
  },
  weightInput: {
    borderWidth: 0,
    width: 60,
  },
  weightInputTextInput: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  exerciseName: {
    fontWeight: '600',
    paddingHorizontal: 8,
    fontSize: 16,
    flexGrow: 2,
    width: '50%',
  },
  prevBest: {
    width: '30%',
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
  note: {
    marginTop: 6,
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
    marginLeft: 8,
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
    marginVertical: -6,
  },
  settingsDropdown: {
    backgroundColor: colors.primary,
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
    color: colors.grey600,
  },
  swipeDeleteContainer: {
    backgroundColor: colors.accent,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginBottom: 0,
  },
  metricsDropdownItemContainer: {
    borderTopColor: 'rgb(240,240,240)',
    borderTopWidth: 1,
  },
  metricsDropdownIcon: {
    marginRight: 8,
  },
  settingsDropdownIcon: {
    marginRight: 4,
  },
});

export default styles;
