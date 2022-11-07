import { StyleSheet } from "react-native";
import { colors } from "../../../util/styles";

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 20,
  },
  listWrapper: {
    marginTop: 10,
  },
  filterWrapper: {
    marginVertical: 4,
    fontWeight: '600',
  },
  itemWrapper: {
    borderTopColor: colors.grey400,
    borderTopWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  item: {
  },
  dropdownWrapper: {
    backgroundColor: colors.grey400,
    borderColor: colors.grey400,
    borderWidth: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  }
});

export default styles;