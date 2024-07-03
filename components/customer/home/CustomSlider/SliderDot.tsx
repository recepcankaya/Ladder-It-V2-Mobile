import { View,StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../../ui/colors';

type Props = {
    activeIndex: number;
    data: { image: string }[];
}

const SliderDot = ({activeIndex, data}: Props) => {
    return (
        <View style={styles.dotsContainer}>
            {data.map((_, index) => (
                <View
                    style={[
                        styles.dot,
                        { backgroundColor: index === activeIndex ? colors.grey : colors.white },
                    ]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.black,
        justifyContent: "center",
        marginTop: 20
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
})

export default SliderDot