import { StyleSheet } from "react-native";
import colors from "../../../ui/colors";
import { responsiveFontSize } from "../../../ui/responsiveFontSize";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.yellow,
      justifyContent: "center",
      padding: 10
  },
  form: {
      width: "100%",
      alignSelf: "center",
      backgroundColor: colors.white,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
  },
  title: {
      fontSize: responsiveFontSize(26),
      fontWeight: 'bold',
      marginBottom: 8,
  },
  subtitle: {
      fontSize: responsiveFontSize(16),
      marginBottom: 16,
      color: '#888',
  },
  orView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10
  },
  orText: {
      color: colors.grey,
      padding: 5
  },
  orLine: {
      borderWidth: 0.5,
      flex: 1,
      borderColor: colors.grey,
      backgroundColor: colors.grey
  },
  inputContainer: {
      width: '100%',
  },
  inputTitle: {
  },
  input: {
      marginTop: 10,
      marginBottom: 20,
  },
  passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  registerButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.black,
      height: 40,
      borderRadius: 5,
      width: '100%',
  },
  registerButtonText: {
      color: colors.grey,
      fontWeight: 'bold',
  },
  useOfTermContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 20
  },
  useOfTerm: {
      fontSize: responsiveFontSize(12),
      color: colors.black,
  },
  useOfTermLink: {
      borderBottomWidth: 1,
      borderBottomColor: "#0000ff",
  },
  useOfTermText: {
      fontSize: responsiveFontSize(12),
      color: "#0000ff",
  },
});

export default styles;
