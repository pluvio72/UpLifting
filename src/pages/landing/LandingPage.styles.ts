import { StyleSheet } from "react-native";
import { colors } from "../../util/styles";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  historyWrapper: {
    borderRadius: 6,
    borderColor: colors.borderColor,
    borderWidth: 1.5,
    display: 'flex',
  }
});

export default styles;