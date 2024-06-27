import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { heightConstant, widthConstant } from "../../../ui/responsiveScreen";
import colors from "../../../ui/colors";
import { BrandBranchDetails } from "../../../types/dbTables.types";

type BrandBranchesListProps = {
  item: BrandBranchDetails;
  index: number;
  selectBrandBranch: (item: BrandBranchDetails, index: number) => void;
};

export default function BrandBranchesListRenderItem({
  item,
  index,
  selectBrandBranch,
}: BrandBranchesListProps) {
  return (
    <TouchableOpacity
      style={styles.brand}
      onPress={() => selectBrandBranch(item, index)}>
      <Image
        source={{
          uri: item.brandLogoUrl
        }}
        style={styles.brandImage}
      />
      <Text style={styles.brandName}>{item.brandName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  brand: {
    width: 130 * widthConstant,
    height: 130 * widthConstant,
    alignItems: "center",
    justifyContent: "center",
    margin: 30 * widthConstant,
    marginBottom: 40 * heightConstant,
  },
  brandImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.pink,
    aspectRatio: 1,
  },
  brandName: {
    color: colors.grey,
    marginTop: 10,
    fontSize: 16 * widthConstant,
  },
});
