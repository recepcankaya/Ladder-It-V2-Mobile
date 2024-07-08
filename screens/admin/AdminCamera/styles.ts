import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../ui/colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noCamera: {
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    bottom: 300,
  },
  camera: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    width: 40,
    height: 40,
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    zIndex: 2,
    backgroundColor: colors.pink,
  },
  backButtonText: {
    fontSize: 20,
    color: colors.grey,
  },
  transparentView: {
    position: "absolute",
    zIndex: 1,
    borderColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: height / 3,
    borderRightWidth: width / 7,
    borderLeftWidth: width / 7,
    height,
    width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  border: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.pink,
  },
});

export default styles;
