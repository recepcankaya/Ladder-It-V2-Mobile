import { View, FlatList, StyleSheet, Image, Modal, Pressable, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import colors from '../../../../ui/colors'
import SliderDot from './SliderDot'

type CustomSliderProps = {
    data: SupabaseCampaigns[],
}

const { width } = Dimensions.get("window")

const Slider = ({ data }: CustomSliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const flatListRef = useRef(null);

    const onViewRef = useRef((viewableItems) => {
        if (viewableItems.viewableItems.length > 0) {
            setActiveIndex(viewableItems.viewableItems[0].index);
        }
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const openImage = (imageUri: string) => {
        setSelectedImage(imageUri)
    };

    const closeImage = () => {
        setSelectedImage(null)
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={flatListRef}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                data={data}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => openImage(item.image)}>
                            <View>
                                <Image style={styles.image} source={{ uri: item.image }} />
                            </View>
                        </Pressable>
                    )
                }} />
            <SliderDot data={data} activeIndex={activeIndex} />
            <Modal
                visible={!!selectedImage}
                transparent={true}
            >
                <View style={styles.modal}>
                    <Pressable onPress={closeImage}>
                        <Image style={styles.modalImage} source={{ uri: selectedImage ? selectedImage : '' }} />
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        marginTop: 50
    },
    list: {
        backgroundColor: colors.black
    },
    image: {
        width: width,
        height: 180,
        resizeMode: "contain"
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: width,
        height: 360,
        resizeMode: 'contain',
    },
})

export default Slider