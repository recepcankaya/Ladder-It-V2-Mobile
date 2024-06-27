import { StyleSheet } from "react-native";
import colors from "../../../ui/colors";
import { heightConstant } from "../../../ui/responsiveScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  qrCode: {
    padding: 30,
    borderColor: colors.purple,
    borderWidth: 5,
    borderRadius: 20,
  },
});

export default styles;
