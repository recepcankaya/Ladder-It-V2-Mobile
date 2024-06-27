import { StyleSheet } from "react-native";
import colors from "../../../ui/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    height: 600,
    alignItems: "stretch",
    justifyContent: "center",
  },
  header: {
    color: colors.grey,
    fontSize: 24,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    gap: 40,
    marginBottom: 100,
  },
  input: {
    backgroundColor: colors.pink,
    width: "100%",
    height: 60,
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: 18,
  },
  continueButton: {
    borderWidth: 2,
    borderColor: colors.pink,
    width: "80%",
    height: 70,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 24,
    color: colors.grey,
  },
});

export default styles;
