import { StyleSheet } from "react-native";
import { colors } from "../../util/styles";

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
    paddingVertical: 2
  },
  exerciseName: {
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  prevBest: {
    color: colors.secondary,
    fontWeight: '500',
    width: '50%',
    textAlign: 'center',
  },
  settingsDropdown: {
    width: '30%',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  settingsDropdownText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
    paddingLeft: 8,
  },
  settingsDropdownMenu: {
    borderRadius: 8,
    width: '40%'
  },
  settingsDropdownMenuItem: {
    fontSize: 12,
    fontWeight: '600',
  },
  done: {
    color: colors.green,
  },
  notDone: {
    color: colors.red
  }
});

export default styles;
