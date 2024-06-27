import { StyleSheet } from "react-native";
import colors from "../../../ui/colors";
import {
  heightConstant,
  radiusConstant,
  widthConstant,
} from "../../../ui/responsiveScreen";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0C0C",
    paddingTop: 70 * heightConstant,
  },
  header: {
    fontFamily: "Arial",
    fontSize: 28 * radiusConstant,
    fontWeight: "400",
    color: colors.grey,
    marginBottom: 60 * heightConstant,
    marginLeft: 30 * widthConstant,
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  waitingTabText: {
    fontFamily: "Rosarivo",
    fontSize: 28 * radiusConstant,
    fontWeight: "400",
    lineHeight: 30 * heightConstant,
    letterSpacing: 0.15,
    textAlign: "left",
    color: colors.white,
  },
  collectionTabText: {
    fontFamily: "Rosarivo",
    fontSize: 28 * radiusConstant,
    fontWeight: "400",
    lineHeight: 30 * heightConstant,
    letterSpacing: 0.15,
    textAlign: "left",
    width: 203 * widthConstant,
    height: 35 * heightConstant,
    color: colors.white,
  },
  iconContainer: {
    alignItems: "center",
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.white,
  },
});

export default styles;
