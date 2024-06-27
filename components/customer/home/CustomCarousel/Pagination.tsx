import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dot from './Dot';
import colors from '../../../../ui/colors';

type Props = {
    paginationIndex: number;
    data: { image: string }[];
};
const Pagination = ({ paginationIndex, data }: Props) => {
    return (
        <View style={styles.container}>
            {data.map((_, index) => {
                return (
                    <Dot index={index} key={index} paginationIndex={paginationIndex} />
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
});