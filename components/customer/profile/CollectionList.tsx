import { Text, StyleSheet } from "react-native";
import { radiusConstant, heightConstant } from "../../../ui/responsiveScreen";
import colors from "../../../ui/colors";

type CollectionListProps = {
    title: string
}

const CollectionList = ({ title } : CollectionListProps) => {
    return (
        <Text style={styles.infoText}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    infoText: {
        fontSize: 22 * radiusConstant,
        color: colors.grey,
        marginTop: 60 * heightConstant,
    }
});

export default CollectionList;