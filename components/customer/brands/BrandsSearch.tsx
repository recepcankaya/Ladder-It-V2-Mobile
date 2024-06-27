import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { heightConstant, widthConstant } from "../../../ui/responsiveScreen";
import colors from "../../../ui/colors";

type BrandsSearchProps = {
  searchedAdmin: string;
  setSearchedAdmin: (value: string) => void;
};

export default function BrandsSearch({
  searchedAdmin,
  setSearchedAdmin,
}: BrandsSearchProps) {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search"
        color="#808080"
        size={20 * heightConstant}
        style={styles.searchIcon}
      />
      <TextInput
        value={searchedAdmin}
        onChangeText={setSearchedAdmin}
        style={[
          styles.searchBar,
          { fontStyle: `${searchedAdmin.length > 0 ? "normal" : "italic"}` },
        ]}
        placeholder="Kafe ara..."
        placeholderTextColor="#808080"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: 350 * widthConstant,
    height: 50 * heightConstant,
    marginBottom: 50 * heightConstant,
    justifyContent: "center",
  },
  searchBar: {
    width: "100%",
    height: "100%",
    color: colors.grey,
    fontSize: 18 * heightConstant,
    borderColor: colors.pink,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 40 * widthConstant,
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -10 }],
    marginLeft: 10 * widthConstant,
  },
});
