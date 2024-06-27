import { View, FlatList, TouchableOpacity, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { heightConstant, radiusConstant, widthConstant } from '../../../ui/responsiveScreen';
import colors from '../../../ui/colors';

interface FreeRightsListProps {
    numberOfFreeRights: number[];
    freeRightImageUrl: SupabaseBrand["free_right_image_url"];
    setQrCodeModalVisible: (visible: boolean) => void;
}

const FreeRightsList = ({ numberOfFreeRights, freeRightImageUrl, setQrCodeModalVisible }: FreeRightsListProps) => {
    return (
        numberOfFreeRights.length > 0 ? (
            <FlatList
                data={numberOfFreeRights}
                extraData={numberOfFreeRights}
                scrollEnabled={false}
                ListEmptyComponent={() => <ActivityIndicator color={colors.purple} size={"large"} />}
                renderItem={({ item, index }) => (
                    <View>
                        <TouchableOpacity
                            key={index.toString()}
                            onPress={() => setQrCodeModalVisible(true)}>
                            <Image
                                source={{
                                    uri: freeRightImageUrl
                                }}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
            />
        ) : (
            <Text style={styles.infoText}>
                Şu anda indirim/ücretsiz hakkınız bulunmamaktadır.
            </Text>
        )
    );
};

const styles = StyleSheet.create({
    infoText: {
        fontSize: 22 * radiusConstant,
        color: colors.grey,
        marginTop: 60 * heightConstant,
    },
    icon: {
        width: 375 * widthConstant,
        height: 375 * heightConstant,
        aspectRatio: 1,
    }
})

export default FreeRightsList;
