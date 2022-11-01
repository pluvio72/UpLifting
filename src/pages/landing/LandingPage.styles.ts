import { StyleSheet } from "react-native";
import { colors } from "../../util/styles";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  historyWrapper: {
    borderRadius: 16,
    display: 'flex',
    padding: 10,
    backgroundColor: colors.secondary,
  },
  historySet: {
    backgroundColor: colors.grey,
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  }
});

export default styles;