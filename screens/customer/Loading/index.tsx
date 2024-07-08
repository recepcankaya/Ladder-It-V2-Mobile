import { useEffect, useState } from "react";
import supabase from "../../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import useUserStore from "../../../store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppState, ActivityIndicator, Alert } from "react-native";
import colors from "../../../ui/colors";
import useBrandStore from "../../../store/brandStore";
import useBrandBranchStore from "../../../store/brandBranchStore";
import useBrandBranchesDetailsStore from "../../../store/brandBranchesDetailsStore";
import { getBrandBranchById, getBrandById, getBrandWithBranchesById, getUserById } from "../../../lib/supabaseServices";
import { calculateData, calculateTotals, calculateWeeklyTotalOrders } from "../../../lib/utils";
import styles from "./styles";
import { router } from "expo-router";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Loading = () => {
  console.log('Loading-Start');
  const userUpdate = useUserStore((state) => state.setUser);

  const brand = useBrandStore(state => state.brand);
  const setBrand = useBrandStore(state => state.setBrand);

  const brandBranch = useBrandBranchStore(state => state.brandBranch);
  const setBrandBranch = useBrandBranchStore(state => state.setBrandBranch);

  const setBrandBranchesDetails = useBrandBranchesDetailsStore(state => state.setBrandBranchesDetails);

  const [session, setSession] = useState<Session | null>(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkLogin(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


  const checkLogin = async (session: Session | null) => {
    if (session && session.user) {
      const { data: user } = await getUserById(session.user.id);
      if (user) {
        userUpdate({
          id: user.id.toString(),
          username: user.username,
          lastLogin: user.last_login,
        });
        console.log('heree-1')
        return router.replace("/(tabs)/brands");
      } else {
        const { data: brandData } = await getBrandWithBranchesById(session.user.id);
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
          console.log('heree-2')
          return router.replace("/(admin)/adminHome");
        } else {
          const { data: brandBranchData } = await getBrandBranchById(session.user.id);

          if (!brandBranchData) {
            return Alert.alert(
              "Bir sorun oluştu",
              "Markanıza ait bir şube bulunamadı. Lütfen tekrar giriş yapınız.",
              [
                {
                  text: "Tamam",
                  onPress: () => {
                    return router.replace("/(auth)/login");
                  },
                },
              ]
            );
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
            return Alert.alert(
              "Bir sorun oluştu",
              "Şubenize ait bir marka bulunamadı. Lütfen tekrar giriş yapınız.",
              [
                {
                  text: "Tamam",
                  onPress: () => {
                    return router.replace("/(auth)/login");
                  },
                },
              ]
            );
          }

          setBrand({
            ...brand,
            id: brandBranchData.brand_id,
            brandName: brandData.brand_name,
            brandLogoUrl: brandData.brand_logo_url,
            requiredNumberForFreeRight: brandData.required_number_for_free_right,
          });
          console.log('heree-3')
          return router.replace("/(admin)/branchHome");
        }
      }
    }
    console.log('heree-4')

    return router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color={colors.purple} size={"large"} />
    </SafeAreaView>
  );
};

export default Loading;
