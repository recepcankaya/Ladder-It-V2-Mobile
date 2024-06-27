import { Image, StyleSheet, View } from "react-native";

import { heightConstant, widthConstant } from "../../../ui/responsiveScreen";
import colors from "../../../ui/colors";
import useBrandStore from "../../../store/brandStore";
const logo = require("../../../assets/LadderLogo.png");

export default function HomeHeader() {
  const brandLogoUrl = useBrandStore((state) => state.brand.brandLogoUrl);

  return (
    <View style={styles.header}>
      <Image
        resizeMode="contain"
        style={styles.headerImage}
        source={{
          uri: brandLogoUrl,
        }}
      />
      <Image resizeMode="stretch" style={styles.headerImage} source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100 * heightConstant,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 100 * widthConstant,
    padding: 5,
  },
  headerImage: {
    height: 60 * widthConstant,
    width: 60 * heightConstant,
    borderWidth: 1,
    borderColor: colors.pink,
    borderRadius: 10,
  },
});
