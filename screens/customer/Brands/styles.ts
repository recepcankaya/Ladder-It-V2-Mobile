import { StyleSheet } from "react-native";
import colors from "../../../ui/colors";
import { heightConstant } from "../../../ui/responsiveScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50 * heightConstant,
  },
});

export default styles;
