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
  forgotPassword: {
    borderBottomWidth: 1,
  },
  forgotPasswordText: {

  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    height: 40,
    borderRadius: 5,
    width: '100%',
  },
  loginButtonText: {
    color: colors.grey,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    margin: 20
  },
  register: {
    borderBottomWidth: 1,
    paddingLeft: 3,
    paddingRight: 3
  },
  registerText: {
    color: colors.black,
  },
  businessButton: {
    alignSelf: "center",
    marginTop: 20
  },
  businessText: {
    fontSize: responsiveFontSize(18),
    color: colors.black,
    alignSelf: 'center'
  },
  pressText: {
    fontSize: responsiveFontSize(18),
    color: colors.black,
  },
  svg: {
    alignSelf: 'center',
  }
});

export default styles;
