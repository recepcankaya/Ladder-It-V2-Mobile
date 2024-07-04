import {
  View,
  StatusBar,
  TouchableOpacity,
  Pressable,
  Text,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleAuthButton from "../../../components/common/GoogleAuthButton";
import ControlledInput from "../../../components/common/ControlledInput";
import { responsiveFontSize } from "../../../ui/responsiveFontSize";
import Svg, { Text as TextSVG, Defs, LinearGradient, Stop } from 'react-native-svg';
import { signInWithEmailAndPassword, signInWithGoogle } from "../../../lib/supabaseServices";
import styles from "./styles";
import supabase from "../../../lib/supabase";
import { useLoginForm } from "../../../lib/resolverSchema";
import { useRouter } from "expo-router";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'

const Login = () => {
  const router = useRouter();
  const { handleSubmit, control } = useLoginForm();

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: "781940586979-bsceunujhi8hbhl2t3m6ormfmvd62mse.apps.googleusercontent.com"
  })

  const onSubmit = async ({ email, password }: { email: string, password: string }) => {
    if (email && password) {
      console.log('email:', email, 'password:', password);
      try {
        const { data, error } = await signInWithEmailAndPassword(email, password);
        if (error) {
          console.log('Error details:', error);
          return Alert.alert("Hata", "Giriş başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
        }

        router.push('(tabs)/brands');

      } catch (error) {
        return Alert.alert("Hata", "Giriş başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
      }
    } else {
      return Alert.alert("Hata", "Email ve şifre girilmelidir.", [{ text: "Tamam" }]);
    }
  };


  const googleAuth = async () => {
    try {
      const { data, error } = await signInWithGoogle();
      console.log('googleAuthData', data);
      console.log('googleAuthError-v1', error);
      if (error) return Alert.alert("Hata", "Giriş başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
      return router.replace('/(tabs)/home');
    } catch (error) {
      console.log('googleAuthError-v2', error);
      return Alert.alert("Hata", "Giriş başarısız! Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={styles.form}>
        <Text style={styles.title}>Tekrar Hoşgeldin!</Text>
        <Text style={styles.subtitle}>Giriş yapmak için lütfen bilgilerinizi giriniz.</Text>
        {/* <GoogleAuthButton title="Google ile Giriş Yap" onPress={googleAuth} /> */}
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={async () => {
            try {
              await GoogleSignin.hasPlayServices()
              const userInfo = await GoogleSignin.signIn()
              if (userInfo.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                  provider: 'google',
                  token: userInfo.idToken,
                })
                console.log(error, data)
              } else {
                throw new Error('no ID token present!')
              }
            } catch (error: any) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
            }
          }}
        />
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
          <View style={styles.passwordContainer}>
            <Text style={styles.inputTitle}>Şifreniz</Text>
            <Pressable style={styles.forgotPassword}><Text style={styles.forgotPasswordText}>Şifreni mi unuttun?</Text></Pressable>
          </View>
          <ControlledInput control={control} name="password" placeholder="password" secureTextEntry style={styles.input} />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Hesabınız yok mu?</Text>
          <Pressable style={styles.register} onPress={() => router.push("register")}><Text style={styles.registerText}>Kayıt ol!</Text></Pressable>
        </View>
      </View>
      <Pressable
        onPress={() => router.replace("/(admin)/adminLogin")}
        style={styles.businessButton}>
        <Text style={styles.businessText}>
          Üye İş Yeriyseniz Giriş Yapmak için
        </Text>
        <Svg height={responsiveFontSize(35)} width={responsiveFontSize(80)} style={styles.svg}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#ff00ff" stopOpacity="1" />
              <Stop offset="50%" stopColor="#a52a2a" stopOpacity="1" />
              <Stop offset="100%" stopColor="#6b8e23" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <TextSVG
            fill="url(#grad)"
            fontSize={responsiveFontSize(20)}
            x="0"
            y={responsiveFontSize(25)}
            textAnchor="start">
            Tıklayınız
          </TextSVG>
        </Svg>
      </Pressable>

    </SafeAreaView>
  );
};

export default Login;