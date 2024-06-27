import { useState, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from '@expo/vector-icons/Ionicons'
import CustomLoading from "../../../components/common/CustomLoading";
import useBrandStore from "../../../store/brandStore";
import useBrandBranchStore from "../../../store/brandBranchStore";
import AdminInfoList from "../../../components/admin/AdminInfoList";
import AdminHomeHeader from "../../../components/admin/AdminHomeHeader";
import { responsiveFontSize } from "../../../ui/responsiveFontSize";
import { getBrandBranchById } from "../../../lib/supabaseServices";
import styles from "./styles";
import { router } from "expo-router";

const BranchHome = () => {
  const [refreshing, setRefreshing] = useState(false);

  const setBrandBranch = useBrandBranchStore((state) => state.setBrandBranch);

  const brandName = useBrandStore((state) => state.brand.brandName);
  const brandLogo = useBrandStore((state) => state.brand.brandLogoUrl);
  const requiredNumberForFreeRight = useBrandStore(
    (state) => state.brand.requiredNumberForFreeRight
  );
  const brandBranch = useBrandBranchStore((state) => state.brandBranch);
  const brandBranchId = useBrandBranchStore((state) => state.brandBranch.id);
  const totalOrder = useBrandBranchStore(
    (state) => state.brandBranch.totalOrders
  );
  const totalUsedFreeRights = useBrandBranchStore(
    (state) => state.brandBranch.totalUsedFreeRights
  );
  const totalUnusedFreeRights = useBrandBranchStore(
    (state) => state.brandBranch.totalUnusedFreeRights
  );
  const monthlyTotalOrders = useBrandBranchStore(
    (state) => state.brandBranch.monthlyTotalOrders
  );
  const dailyTotalOrders = useBrandBranchStore(
    (state) => state.brandBranch.dailyTotalOrders
  );
  const dailyTotalUsedFreeRights = useBrandBranchStore(
    (state) => state.brandBranch.dailyTotalUsedFreeRights
  );
  const weeklyTotalOrders = useBrandBranchStore(
    (state) => state.brandBranch.weeklyTotalOrders
  );

  const fetchBrandDashboard = async () => {
    try {
      const { data: brandBranchData } = await getBrandBranchById(brandBranchId);
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
    } catch (error) {
      Alert.alert("Bir hata oluştu", "Lütfen tekrar deneyin.");
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBrandDashboard();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    console.log("weeklyTotalOrders", weeklyTotalOrders)
  }, [weeklyTotalOrders])

  const infoListData: { title: string; value: string }[] = [
    { title: "Toplam sipariş sayısı", value: totalOrder?.toString() },
    {
      title: "Bu ay verilen sipariş sayısı",
      value: monthlyTotalOrders?.toString(),
    },
    {
      title: "Bugün verilen sipariş sayısı",
      value: dailyTotalOrders?.toString(),
    },
    {
      title: "Bugün kullanılan ödül sayısı",
      value: dailyTotalUsedFreeRights?.toString(),
    },
    {
      title: "Bugüne kadar kullanılmış ödüller",
      value: totalUsedFreeRights?.toString(),
    },
    {
      title: "Bekleyen ödüllerin sayısı",
      value: totalUnusedFreeRights?.toString() || "0",
    },
    {
      title: "Ödül için sipariş sayısı",
      value: requiredNumberForFreeRight?.toString(),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <AdminHomeHeader brandName={brandName} brandLogo={brandLogo} />
      <AdminInfoList
        data={infoListData}
        onRefresh={onRefresh}
        refreshing={refreshing}
        weeklyTotalOrders={weeklyTotalOrders}
      />
      <Icon name="qr-code-outline" size={responsiveFontSize(40)} color="black" onPress={() => router.push("/(admin)/adminCamera")} />
      <CustomLoading visible={refreshing} />
    </SafeAreaView>
  );
};

export default BranchHome;