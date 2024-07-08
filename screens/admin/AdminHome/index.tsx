import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomLoading from "../../../components/common/CustomLoading";
import useBrandStore from "../../../store/brandStore";
import AdminInfoList from "../../../components/admin/AdminInfoList";
import AdminHomeHeader from "../../../components/admin/AdminHomeHeader";
import useBrandBranchesDetailsStore from "../../../store/brandBranchesDetailsStore";
import Icon from '@expo/vector-icons/Ionicons'
import { responsiveFontSize } from "../../../ui/responsiveFontSize";
import { getBrandWithBranchesById } from "../../../lib/supabaseServices";
import { calculateData, calculateTotals, calculateWeeklyTotalOrders } from "../../../lib/utils";
import styles from "./styles";
import { router } from "expo-router";

const AdminHome = () => {
  const [refreshing, setRefreshing] = useState(false);

  const brandId = useBrandStore((state) => state.brand.id);
  const brandName = useBrandStore((state) => state.brand.brandName);
  const brandLogo = useBrandStore((state) => state.brand.brandLogoUrl);
  const requiredNumberForFreeRight = useBrandStore(
    (state) => state.brand.requiredNumberForFreeRight
  );
  const brandBranchesDetails = useBrandBranchesDetailsStore((state) => state.brandBranchesDetails);
  const setBrandBranchesDetails = useBrandBranchesDetailsStore((state) => state.setBrandBranchesDetails);

  const fetchBrandDashboard = async () => {
    try {
      const { data: brandData } = await getBrandWithBranchesById(brandId);
      if (!brandData) {
        return Alert.alert("Bir sorun oluştu", "Şubeler yüklenirken bir hata oluştu. Lütfen tekrar deneyiniz.");
      }

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

    } catch (error) {
      Alert.alert("Bir hata oluştu", "Lütfen tekrar deneyin.");
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBrandDashboard();
    setRefreshing(false);
  }, []);

  const infoListData: { title: string; value: string }[] = [
    { title: "Toplam sipariş sayısı", value: brandBranchesDetails.totalOrders?.toString() },
    {
      title: "Bu ay verilen sipariş sayısı",
      value: brandBranchesDetails.monthlyTotalOrders?.toString(),
    },
    {
      title: "Bugün verilen sipariş sayısı",
      value: brandBranchesDetails.dailyTotalOrders?.toString(),
    },
    {
      title: "Bugün kullanılan ödül sayısı",
      value: brandBranchesDetails.dailyTotalUsedFreeRights?.toString(),
    },
    {
      title: "Bugüne kadar kullanılmış ödüller",
      value: brandBranchesDetails.totalUsedFreeRights?.toString(),
    },
    {
      title: "Bekleyen ödüllerin sayısı",
      value: brandBranchesDetails.totalUnusedFreeRights?.toString() || "0",
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
        weeklyTotalOrders={brandBranchesDetails.weeklyTotalOrders}
      />
      <Icon name="qr-code-outline" size={responsiveFontSize(40)} color="black" onPress={() => router.push("/adminCamera")} />
      <CustomLoading visible={refreshing} />
    </SafeAreaView>
  );
};



export default AdminHome;
