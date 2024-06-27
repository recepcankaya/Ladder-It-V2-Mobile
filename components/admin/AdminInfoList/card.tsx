import { View, StyleSheet, Text, Dimensions } from 'react-native';
import colors from '../../../ui/colors';
import { responsiveFontSize } from '../../../ui/responsiveFontSize';

const { width } = Dimensions.get('window');

type CardProps = {
    title: string;
    value: string;
}

const Card = ({ title, value }: CardProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.valueText}>{value}</Text>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        backgroundColor: colors.darkCoffee,
        marginTop: 25,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignSelf: 'center'
    },
    valueText: {
        fontSize: responsiveFontSize(18),
        fontWeight: 'bold',
        marginBottom: 5
    },
    titleText: {
        fontSize: responsiveFontSize(18)
    }
})

export default Card;