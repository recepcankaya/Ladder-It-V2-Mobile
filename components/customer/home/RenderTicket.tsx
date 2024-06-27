import { FlatList, ImageBackground, StyleSheet } from "react-native";

import TicketRenderItem from "./TicketRenderItem";

import useBrandStore from "../../../store/brandStore";
import { heightConstant } from "../../../ui/responsiveScreen";

type RenderTicketProps = {
    totalTicketOrders: number;
    ticketUrl: string;
};

export default function RenderTicket({ totalTicketOrders, ticketUrl }: RenderTicketProps) {
    const brand = useBrandStore((state) => state.brand);
    const ticketCircles = new Array(brand.requiredNumberForFreeRight);
    return (
        <ImageBackground source={{
            uri: ticketUrl,
        }} style={styles.ticket} resizeMode="contain" >
            <FlatList
                key={brand.requiredNumberForFreeRight <= 4 ? 2 : (brand.requiredNumberForFreeRight === 5 || brand.requiredNumberForFreeRight === 6 ? 3 : 4)}
                data={ticketCircles}
                extraData={ticketCircles}
                renderItem={({ item, index }) => (
                    <TicketRenderItem index={index} totalUserOrders={totalTicketOrders} />
                )}
                numColumns={brand.requiredNumberForFreeRight <= 4 ? 2 : (brand.requiredNumberForFreeRight === 5 || brand.requiredNumberForFreeRight === 6 ? 3 : 4)}
                columnWrapperStyle={{ justifyContent: "space-between", height: 95 * heightConstant, alignItems: 'center' }}
                contentContainerStyle={[totalTicketOrders > 4 && { justifyContent: 'center' }, styles.circles]}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    ticket: {
        width: "100%",
        height: 190 * heightConstant,
        alignSelf: 'center',
    },
    circles: {
        flex: 1,
        alignItems: "flex-end",
        marginRight: 10,
    },
});
