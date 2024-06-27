import { StyleSheet } from "react-native";
import colors from "../../../ui/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    height: 600,
    width: "80%",
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "stretch",
  },
  inputContainer: {
    width: "100%",
    alignSelf: "center",
  },
  labels: {
    color: colors.grey,
    fontSize: 24,
    marginBottom: 30,
  },
  input: {
    borderColor: colors.pink,
    borderStyle: "solid",
    borderWidth: 2,
    width: "100%",
    height: 60,
    borderRadius: 30,
    paddingLeft: 20,
    color: colors.grey,
    fontSize: 18,
  },
  button: {
    backgroundColor: colors.pink,
    width: "100%",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.black,
    fontSize: 20,
  },
});

export default styles;
