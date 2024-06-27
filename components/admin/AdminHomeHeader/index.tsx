import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../../ui/colors";
import { responsiveFontSize } from "../../../ui/responsiveFontSize";
const { width } = Dimensions.get("window");

type HomeHeaderProps = {
  brandName: SupabaseBrand["brand_name"];
  brandLogo: SupabaseBrand["brand_logo_url"];
};

const AdminHomeHeader = ({ brandName, brandLogo }: HomeHeaderProps) => {

  const statusBarHeight = useSafeAreaInsets().top;
  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Icon name="package" style={styles.icon} size={25} />
          <Text style={styles.title}>{brandName}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: brandLogo,
            }}
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: colors.yellow,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: responsiveFontSize(20),
  },
  icon: {},
  qrCodeContainer: {
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  qrCodeText: {
    color: colors.grey,
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
  },
});

export default AdminHomeHeader;
