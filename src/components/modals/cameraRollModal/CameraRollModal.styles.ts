import { StyleSheet } from "react-native";
import { colors } from "../../../util/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    bottom: 0,
    position: 'absolute',
  },
  closeContainer: {
    marginLeft: 'auto',
    paddingTop: 8,
    paddingBottom: 4,
    paddingRight: 12,
  },
  close: {},
  image: {
    marginBottom: 2,
  }
});

export default styles;