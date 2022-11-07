import { StyleSheet } from "react-native";
import { colors } from "../../util/styles";

const styles = StyleSheet.create({
  chartDropdownInput: {
    color: colors.black,
    borderRadius: 8,
    backgroundColor: colors.grey400,
    borderColor: colors.grey400
  },
  chartDropdown: {
    backgroundColor: colors.secondary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 4,
  }
});

export default styles;