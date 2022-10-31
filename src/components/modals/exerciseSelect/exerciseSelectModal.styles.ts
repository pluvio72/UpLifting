import { StyleSheet } from "react-native";
import { colors } from "../../../util/styles";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: '100%'
  },
  listWrapper: {
    marginTop: 10,
  },
  filterWrapper: {
    marginBottom: 8,
    fontWeight: '600'
  },
  item: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  dropdownWrapper: {
    borderColor: colors.borderColor,
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 8,
  }
});

export default styles;