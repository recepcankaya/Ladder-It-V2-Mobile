import { View, Text, TouchableOpacity, Linking, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleAuthButton from '../../../components/common/GoogleAuthButton';
import ControlledInput from '../../../components/common/ControlledInput';
import { signInWithGoogle, signUpWithEmailAndPassword } from '../../../lib/supabaseServices';
import styles from './styles';
import { useRegisterForm } from '../../../lib/resolverSchema';
import { router } from 'expo-router';

const Register = () => {
    const { control, handleSubmit } = useRegisterForm();
    const onSubmit = async ({ email, password }: { email: string, password: string }) => {
        if (email && password) {
            try {
                const { data, error } = await signUpWithEmailAndPassword(email, password);
                console.log('registerData', data);
                console.log('registerError-v1', error);
                if (error) return Alert.alert("Hata", "Kayıt başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
                router.replace('/(tabs)/home/1');
            } catch (error) {
                console.log('registerError-v2', error);
                return Alert.alert("Hata", "Kayıt başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
            }
        }
    }

    const googleAuth = async () => {
        try {
            const { data, error } = await signInWithGoogle();
            console.log('googleAuthData', data);
            console.log('googleAuthError-v1', error);
            if (error) return Alert.alert("Hata", "Giriş başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
            router.replace('/(tabs)/home/1');
        } catch (error) {
            console.log('googleAuthError-v2', error);
            return Alert.alert("Hata", "Giriş başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.form}>
                <Text style={styles.title}>Hoşgeldin!</Text>
                <Text style={styles.subtitle}>Kayıt olmak için lütfen gerekli bilgileri giriniz.</Text>
                <GoogleAuthButton title="Google ile Kayıt Ol" onPress={googleAuth} />
                <View style={styles.orView}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>VEYA</Text>
                    <View style={styles.orLine} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Mailiniz</Text>
                    <ControlledInput control={control} name="email" placeholder="m@example.com" style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Şifreniz</Text>
                    <ControlledInput control={control} name="password" placeholder="password" secureTextEntry style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Şifreniz</Text>
                    <ControlledInput control={control} name="confirmPassword" placeholder="password" secureTextEntry style={styles.input} />
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.registerButtonText}>Kayıt Ol</Text>
                </TouchableOpacity>
                <View style={styles.useOfTermContainer}>
                    <Text style={styles.useOfTerm}>Devam ederek </Text>
                    <TouchableOpacity
                        style={styles.useOfTermLink}
                        onPress={() => Linking.openURL("https://www.ladderit.app/terms-of-use")}>
                        <Text style={styles.useOfTermText}>
                            üyelik sözleşmesi ve kullanım koşullarını
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.useOfTerm}> kabul etmiş olursunuz.</Text>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Register;