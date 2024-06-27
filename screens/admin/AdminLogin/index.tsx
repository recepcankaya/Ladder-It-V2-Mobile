import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useBrandStore from "../../../store/brandStore";
import useBrandBranchStore from "../../../store/brandBranchStore";
import useBrandBranchesDetailsStore from "../../../store/brandBranchesDetailsStore";
import { getBrandBranchById, getBrandById, getBrandWithBranchesById, signInWithEmailAndPassword } from "../../../lib/supabaseServices";
import { calculateData, calculateTotals, calculateWeeklyTotalOrders } from "../../../lib/utils";
import styles from "./styles";
import { router } from "expo-router";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const brand = useBrandStore((state) => state.brand);
  const setBrand = useBrandStore((state) => state.setBrand);
  const brandBranch = useBrandBranchStore((state) => state.brandBranch);
  const setBrandBranch = useBrandBranchStore((state) => state.setBrandBranch);
  const setBrandBranchesDetails = useBrandBranchesDetailsStore(state => state.setBrandBranchesDetails);

  const submitForm = async () => {
    if (!email || !password) {
      Alert.alert("Giriş Hatası", "Mail ve şifre alanları boş bırakılamaz.");
      return;
    }

    const { data } = await signInWithEmailAndPassword(email, password);

    if (!data.user) {
      Alert.alert("Giriş Hatası", "Mail veya şifre hatalı.");
      return;
    }

    const { data: brandData, error } = await getBrandWithBranchesById(data.user.id);

    if (brandData) {
      setBrand({
        ...brand,
        id: brandData.id,
        brandName: brandData.brand_name,
        brandLogoUrl: brandData.brand_logo_url,
        requiredNumberForFreeRight: brandData.required_number_for_free_right,
      });

      const calculatedData = calculateTotals(calculateData(brandData.brand_branch));

      const weeklyTotalOrders = calculateWeeklyTotalOrders(brandData.brand_branch);

      setBrandBranchesDetails({
        dailyTotalOrders: calculatedData.daily_total_orders,
        dailyTotalUsedFreeRights: calculatedData.daily_total_used_free_rights,
        weeklyTotalOrders,
        monthlyTotalOrders: calculatedData.monthly_total_orders,
        totalOrders: calculatedData.total_orders,
        totalUsedFreeRights: calculatedData.total_used_free_rights,
        totalUnusedFreeRights: calculatedData.total_unused_free_rights
      });

      return router.push("/(admin)/adminHome/1");
    } else {
      // If the user is a branch
      const { data: brandBranchData } = await getBrandBranchById(data.user.id);
      console.log('brandBranchData', brandBranchData);
      if (!brandBranchData) {
        Alert.alert(
          "Bir sorun oluştur",
          "Markanıza ait bir şube bulunamadı. Lütfen tekrar giriş yapınız."
        );
        return;
      }

      setBrandBranch({
        ...brandBranch,
        id: brandBranchData.id,
        brandId: brandBranchData.brand_id,
        branchName: brandBranchData.branch_name,
        totalOrders: brandBranchData.total_orders,
        totalUsedFreeRights: brandBranchData.total_used_free_rights,
        weeklyTotalOrders: brandBranchData.weekly_total_orders,
        dailyTotalOrders: brandBranchData.daily_total_orders,
        dailyTotalUsedFreeRights: brandBranchData.daily_total_used_free_rights,
        monthlyTotalOrders: brandBranchData.monthly_total_orders,
      });
      const { data: brandData } = await getBrandById(brandBranchData.brand_id);
      if (!brandData) {
        Alert.alert(
          "Bir sorun oluştur",
          "Şubenize ait bir marka bulunamadı. Lütfen tekrar giriş yapınız."
        );
        return;
      }
      setBrand({
        ...brand,
        id: brandBranchData.brand_id,
        brandName: brandData.brand_name,
        brandLogoUrl: brandData.brand_logo_url,
        requiredNumberForFreeRight: brandData.required_number_for_free_right,
      });
    }

    setEmail("");
    setPassword("");

    return router.replace("/(admin)/branchHome/1");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Giriş Yap</Text>
        <View style={styles.inputContainer}>
          <TextInput
            inputMode="email"
            placeholder="Mailiniz"
            style={styles.input}
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Şifreniz"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={submitForm}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default AdminLogin;
