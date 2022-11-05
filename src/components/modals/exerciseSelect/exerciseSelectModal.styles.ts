import { StyleSheet } from "react-native";
import { colors } from "../../../util/styles";

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  listWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  filterWrapper: {
    marginBottom: 8,
    fontWeight: '600',
    paddingVertical: 12,
  },
  item: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  dropdownWrapper: {
    backgroundColor: colors.grey400,
    borderColor: colors.grey400,
    borderWidth: 2,
    paddingHorizontal: 8,
  }
});

export default styles;