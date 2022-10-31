import { StyleSheet } from "react-native";
import colors from "../../util/styles/colors";

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: colors.grey,
    padding: 15,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {},
  iconText: {
    fontSize: 10,
    marginTop: 2,
  }
});

export default styles;