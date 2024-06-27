import { Text } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../ui/colors';
import { responsiveFontSize } from '../../ui/responsiveFontSize';

type GoogleAuthButtonProps = {
    title: string,
    onPress: () => void,
}

const GoogleAuthButton = ({ title, onPress }: GoogleAuthButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name='logo-google' size={responsiveFontSize(20)} color={colors.black} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey,
    },
    text: {
        color: colors.black,
        fontSize: responsiveFontSize(13),
        fontWeight: 'bold',
        marginLeft: 10
    },
})

export default GoogleAuthButton;