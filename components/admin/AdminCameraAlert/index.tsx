import { Alert } from "react-native";

type AdminCameraAlertProps = {
    title: string;
    message: string;
    onPress: () => void;
}

const AdminCameraAlert = ({
    title,
    message,
    onPress,
}: AdminCameraAlertProps) => {
    return Alert.alert(
        title,
        message,
        [{ text: "Tamam", onPress }],
        { cancelable: false }
    );
};

export default AdminCameraAlert;
