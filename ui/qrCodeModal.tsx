import { Pressable, StyleSheet, View } from 'react-native';
import QRCode, { QRCodeProps } from 'react-qr-code';

type QrCodeModalProps = {
    onClose: () => void;
    isVisible: boolean;
}

const QrCodeModal = ({ isVisible, onClose, value }: QrCodeModalProps & QRCodeProps) => {
    if (!isVisible) return null;
    return (
        <View style={styles.container}>
            <Pressable style={styles.container} onPress={onClose} />
            <View style={styles.qrCodeContainer}>
                <QRCode
                    size={280}
                    value={value}
                    viewBox={`0 0 280 280`}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        alignSelf: 'center',
    },
    qrCodeContainer: {
        width: 340,
        height: 340,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default QrCodeModal;