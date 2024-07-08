import {
  Text,
  Pressable,
  View,
  Button,
} from "react-native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';

import { SafeAreaView } from "react-native-safe-area-context";
import useBrandStore from "../../../store/brandStore";
import { MonthlyOrdersWithYear } from "../../../lib/types";
import {
  addUserOrder,
  getBrandBranchInfoByBrandId,
  getBrandIdByBranchId,
  getCurrentUser,
  getRequiredNumberForFreeRight,
  getUserOrderInfoByBranchId,
  getUserTotalFreeRights,
  getUsernameById,
  updateBrandBranch,
  updateUserOrders,
} from "../../../lib/supabaseServices";
import AdminCameraAlert from "../../../components/admin/AdminCameraAlert";
import styles from "./styles";
import { router } from "expo-router";

const NewAdminCamera = () => {
  const brandId = useBrandStore((state) => state.brand.id);

  let qrCodeValue = "";

  const resetQrCodeValue = () => qrCodeValue = "";

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const months = [
    "ocak",
    "şubat",
    "mart",
    "nisan",
    "mayıs",
    "haziran",
    "temmuz",
    "ağustos",
    "eylül",
    "ekim",
    "kasım",
    "aralık",
  ];
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const onBarcodeScanned = async (result: BarcodeScanningResult) => {
    let userID = "";
    let brandBranchID = "";
    let forNFT = null;
    if (qrCodeValue.length > 0) return;
    qrCodeValue = result.data;

    if (typeof result.data === "string") {
      const parsedValue: {
        userID: string;
        brandBranchID: string;
        forNFT: boolean;
      } = JSON.parse(result.data);
      ({ userID, brandBranchID, forNFT } = parsedValue);
    }

    try {
      const days = ["pzr", "pzt", "salı", "çrş", "prş", "cuma", "cmt"];
      const currentDay = days[new Date().getDay()];

      const {
        data: { user: currentUser },
      } = await getCurrentUser();

      if (!currentUser) return;

      const { data: trueBrandId } = await getBrandIdByBranchId(brandBranchID);

      if (trueBrandId !== brandId)
        return AdminCameraAlert({
          title: "Hata",
          message: "Geçersiz QR kodu",
          onPress: () => (resetQrCodeValue),
        });

      const { data: username } = await getUsernameById(userID);

      const { data: userOrderInfo } = await getUserOrderInfoByBranchId(
        userID,
        brandBranchID
      );

      const { data: brandBranchInfo } = await getBrandBranchInfoByBrandId(
        brandBranchID,
        brandId
      );

      if (!brandBranchInfo)
        return AdminCameraAlert({
          title: "Hata",
          message: "Şube bilgisi bulunamadı.",
          onPress: () => resetQrCodeValue,
        });

      const { data: requiredNumberForFreeRights } = await getRequiredNumberForFreeRight(brandId)

      if (!requiredNumberForFreeRights)
        return AdminCameraAlert({
          title: "Hata",
          message: "İşletme bilgisi bulunamadı.",
          onPress: () => resetQrCodeValue,
        });

      const { data: userTotalFreeRights } = await getUserTotalFreeRights(
        userID,
        brandId
      );

      const totalUserFreeRights = userTotalFreeRights && userTotalFreeRights.reduce((total, item) => total + item.user_total_free_rights, 0);
      if (userOrderInfo) {
        if (forNFT) {
          if (totalUserFreeRights === 0)
            return AdminCameraAlert({
              title: "Hata",
              message: "Müşterinizin ödül hakkı kalmamıştır.",
              onPress: () => resetQrCodeValue,
            });
          try {
            await updateUserOrders(
              {
                user_total_free_rights: Number(totalUserFreeRights && totalUserFreeRights - 1),
                user_total_used_free_rights: Number(userOrderInfo && userOrderInfo.user_total_used_free_rights + 1),
                total_user_orders: Number(userOrderInfo && userOrderInfo.total_user_orders + 1),
              },
              (userOrderInfo && userOrderInfo.id) || ""
            );

            await updateBrandBranch(
              {
                monthly_total_orders_with_years: {
                  ...(brandBranchInfo[0].monthly_total_orders_with_years as MonthlyOrdersWithYear),
                  [currentYear]: {
                    ...((brandBranchInfo[0]?.monthly_total_orders_with_years as {
                      [key: string]: { [key: string]: number };
                    })[currentYear] || {}),
                    [currentMonth]: Number(
                      (
                        brandBranchInfo[0]?.monthly_total_orders_with_years as {
                          [key: string]: { [key: string]: number };
                        }
                      )[currentYear]?.[currentMonth] + 1
                    ),
                  },
                },
                total_unused_free_rights: Number(brandBranchInfo[0].total_unused_free_rights - 1),
                total_orders: Number(brandBranchInfo[0].total_orders + 1),
                daily_total_orders: Number(brandBranchInfo[0].daily_total_orders + 1),
                total_used_free_rights: Number(brandBranchInfo[0].total_used_free_rights + 1),
                daily_total_used_free_rights: Number(brandBranchInfo[0].daily_total_used_free_rights + 1),
                weekly_total_orders: {
                  [currentDay]: Number((brandBranchInfo[0].weekly_total_orders as {
                    [key: string]: number;
                  })[currentDay] + 1
                  ),
                },
                monthly_total_orders: Number(brandBranchInfo[0].monthly_total_orders + 1),
              },
              brandBranchID
            );

            return AdminCameraAlert({
              title: `${username} adlı müşteriniz ödülünüzü kullandı.`,
              message: `Bugüne kadar verilen sipariş sayısı: ${userOrderInfo.total_user_orders + 1
                } \n Kalan ödül hakkı: ${totalUserFreeRights ? totalUserFreeRights - 1 : 1
                } \n Bugüne kadar kullanılan ödül sayısı: ${userOrderInfo.user_total_used_free_rights + 1}`,
              onPress: () => resetQrCodeValue,
            });
          } catch (error) {
            return AdminCameraAlert({
              title: "Hata",
              message: "Sipariş verme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
              onPress: () => resetQrCodeValue,
            });
          }
        }
        //forNFT false yani ödül olmayan sipariş ve ilk sipariş veya başka bir markanın qr ı değil normal arttırma işlemi
        else {
          //ödüle götürecek olan sipariş değilse
          if (Number(requiredNumberForFreeRights) - 1 > userOrderInfo.total_ticket_orders) {
            try {
              await updateUserOrders(
                {
                  total_ticket_orders: Number(userOrderInfo.total_ticket_orders + 1),
                  total_user_orders: Number(userOrderInfo.total_user_orders + 1),
                },
                userOrderInfo.id
              );

              await updateBrandBranch(
                {
                  monthly_total_orders_with_years: {
                    ...(brandBranchInfo[0]
                      .monthly_total_orders_with_years as MonthlyOrdersWithYear),
                    [currentYear]: {
                      ...((brandBranchInfo[0]
                        ?.monthly_total_orders_with_years as {
                          [key: string]: { [key: string]: number };
                        })[currentYear] || {}),
                      [currentMonth]: Number(
                        (
                          brandBranchInfo[0]
                            ?.monthly_total_orders_with_years as {
                              [key: string]: { [key: string]: number };
                            }
                        )[currentYear]?.[currentMonth] + 1
                      ),
                    },
                  },
                  total_orders: Number(brandBranchInfo[0].total_orders + 1),
                  daily_total_orders: Number(
                    brandBranchInfo[0].daily_total_orders + 1
                  ),
                  weekly_total_orders: {
                    [currentDay]: Number(
                      (brandBranchInfo[0].weekly_total_orders as {
                        [key: string]: number;
                      })[currentDay] + 1
                    ),
                  },
                  monthly_total_orders: Number(
                    brandBranchInfo[0].monthly_total_orders + 1
                  ),
                },
                brandBranchID
              );

              return AdminCameraAlert({
                title: `${username} adlı müşterinin işlemi başarıyla gerçekleştirildi.`,
                message: `Bugüne kadar verilen sipariş sayısı: ${userOrderInfo.total_user_orders + 1
                  } \n Müşterinin ödül hakkı : ${totalUserFreeRights
                  } \n Bugüne kadar kullanılan ödül sayısı: ${userOrderInfo.user_total_used_free_rights}`,
                onPress: () => resetQrCodeValue,
              });
            } catch (error) {
              return AdminCameraAlert({
                title: "Hata",
                message: "Sipariş verme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
                onPress: () => resetQrCodeValue,
              });
            }
          } else if (userOrderInfo.total_ticket_orders === Number(requiredNumberForFreeRights) - 1) {
            try {
              await updateUserOrders(
                {
                  total_ticket_orders: 0,
                  total_user_orders: Number(
                    userOrderInfo.total_user_orders + 1
                  ),
                  user_total_free_rights: Number(
                    totalUserFreeRights ? totalUserFreeRights + 1 : 1
                  ),
                },
                userOrderInfo.id
              );

              await updateBrandBranch(
                {
                  monthly_total_orders_with_years: {
                    ...(brandBranchInfo[0].monthly_total_orders_with_years as MonthlyOrdersWithYear),
                    [currentYear]: {
                      ...((brandBranchInfo[0]?.monthly_total_orders_with_years as {
                        [key: string]: { [key: string]: number };
                      })[currentYear] || {}),
                      [currentMonth]: Number(
                        (
                          brandBranchInfo[0]?.monthly_total_orders_with_years as {
                            [key: string]: { [key: string]: number };
                          }
                        )[currentYear]?.[currentMonth] + 1
                      ),
                    },
                  },
                  total_unused_free_rights: Number(brandBranchInfo[0].total_unused_free_rights + 1),
                  total_orders: Number(brandBranchInfo[0].total_orders + 1),
                  daily_total_orders: Number(brandBranchInfo[0].daily_total_orders + 1),
                  weekly_total_orders: {
                    [currentDay]: Number((brandBranchInfo[0].weekly_total_orders as {
                      [key: string]: number;
                    })[currentDay] + 1
                    ),
                  },
                  monthly_total_orders: Number(brandBranchInfo[0].monthly_total_orders + 1),
                },
                brandBranchID
              );

              return AdminCameraAlert({
                title: `${username} adlı müşteri ödülünüzü kazandı.`,
                message: `Bugüne kadar verilen sipariş sayısı: ${userOrderInfo.total_user_orders + 1
                  } \n Müşterinin ödül hakkı : ${totalUserFreeRights ? totalUserFreeRights + 1 : 1
                  } \n Bugüne kadar kullanılan ödül sayısı: ${userOrderInfo.user_total_used_free_rights}`,
                onPress: () => resetQrCodeValue,
              });
            } catch (error) {
              return AdminCameraAlert({
                title: "Hata",
                message: "Sipariş verme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
                onPress: () => resetQrCodeValue,
              });
            }
          }
        }
      } else {
        //burada ilk sipariş
        try {
          await addUserOrder({
            id: "",
            user_id: String(userID),
            branch_id: String(brandBranchID),
            brand_id: String(brandId),
            total_user_orders: 1,
            total_ticket_orders: 1,
            created_at: "",
            last_order_date: "",
            user_total_free_rights: 0,
            user_total_used_free_rights: 0,
          });

          await updateBrandBranch(
            {
              monthly_total_orders_with_years: {
                ...(brandBranchInfo[0]
                  .monthly_total_orders_with_years as MonthlyOrdersWithYear),
                [currentYear]: {
                  ...((brandBranchInfo[0]?.monthly_total_orders_with_years as {
                    [key: string]: { [key: string]: number };
                  })[currentYear] || {}),
                  [currentMonth]: Number(
                    (
                      brandBranchInfo[0]?.monthly_total_orders_with_years as {
                        [key: string]: { [key: string]: number };
                      }
                    )[currentYear]?.[currentMonth] + 1
                  ),
                },
              },
              total_orders: Number(brandBranchInfo[0].total_orders + 1),
              daily_total_orders: Number(
                brandBranchInfo[0].daily_total_orders + 1
              ),
              weekly_total_orders: {
                [currentDay]: Number(
                  (brandBranchInfo[0].weekly_total_orders as {
                    [key: string]: number;
                  })[currentDay] + 1
                ),
              },
              monthly_total_orders: Number(
                brandBranchInfo[0].monthly_total_orders + 1
              ),
            },
            brandBranchID
          );

          return AdminCameraAlert({
            title: `${username} adlı müşterinin işlemi başarıyla gerçekleşti.`,
            message: `İlk Sipariş !`,
            onPress: () => resetQrCodeValue,
          });
        } catch (error) {
          return AdminCameraAlert({
            title: "Hata",
            message: "Sipariş verme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
            onPress: () => resetQrCodeValue,
          });
        }
      }
    } catch (error) {
      return AdminCameraAlert({
        title: "Hata",
        message: "Bir şeyler yanlış gitti. Lütfen tekrar deneyiniz.",
        onPress: () => resetQrCodeValue,
      });
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </Pressable>
      <CameraView style={styles.camera} facing={'back'} barcodeScannerSettings={{ barcodeTypes: ["qr"] }} onBarcodeScanned={(result: BarcodeScanningResult) => onBarcodeScanned(result)} />
      <View style={styles.transparentView}>
        <View style={styles.border} />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 10,
            width: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewAdminCamera;
