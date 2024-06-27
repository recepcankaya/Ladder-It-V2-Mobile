import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useUserStore from "../../../store/userStore";
import { getCurrentUser, updateUserById } from "../../../lib/supabaseServices";
import styles from "./styles";
import { router } from "expo-router";

const UserInfo = () => {
  const [username, setUsername] = useState("");
  const updateUser = useUserStore((state) => state.setUser);

  const submitForm = async () => {
    try {
      if (username.length < 3) {
        Alert.alert(
          "Kullanıcı Adı Hatası",
          "Kullanıcı adınız en az 3 karakter olmalıdır."
        );
        return;
      }

      const { data: { user } } = await getCurrentUser();

      if (!user) {
        return router.push("/(auth)/login/1");
      }

      const { error } = await updateUserById({
        username: username,
        last_login: String(new Date().toISOString()),
      }, user.id);

      if (error) {
        Alert.alert(
          "Bunu biz de beklemiyorduk 🤔",
          "Lütfen tekrar dener misiniz 👉👈"
        );
      } else {
        updateUser({
          id: user.id,
          username: username,
          lastLogin: new Date().toString(),
        });
        router.push("/(tabs)/home/1");
        Alert.alert("Uygulamamıza hoşgeldin 🤗🥳", "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Kullanıcı adınız:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default UserInfo;
