import { StyleSheet } from "react-native";
import colors from "../../../ui/colors";
import { heightConstant } from "../../../ui/responsiveScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: 20 * heightConstant,
  },
  menuButton: {
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    alignSelf: 'center',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    color: colors.grey,
    fontSize: 20
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
