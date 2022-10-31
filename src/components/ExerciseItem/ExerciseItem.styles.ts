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
    width: '45%'
  },
  done: {
    color: colors.green,
  },
  notDone: {
    color: colors.red
  }
});

export default styles;
