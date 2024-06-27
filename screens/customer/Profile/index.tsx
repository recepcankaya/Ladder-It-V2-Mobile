import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "../../../store/userStore";
import QrCodeModal from "../../../ui/qrCodeModal";
import colors from "../../../ui/colors";
import useBrandStore from "../../../store/brandStore";
import useBrandBranchStore from "../../../store/brandBranchStore";
import { getUserOrdersByBrandId } from "../../../lib/supabaseServices";
import supabase from "../../../lib/supabase";
import FreeRightsList from "../../../components/customer/profile/FreeRightsList";
import CollectionList from "../../../components/customer/profile/CollectionList";
import styles from "./styles";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("Waiting");
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState<boolean>(false);
  const [numberOfFreeRights, setNumberOfFreeRights] = useState<number[]>([]);
  const username = useUserStore((state) => state.user.username);
  const userID = useUserStore((state) => state.user.id);
  const brandId = useBrandStore((state) => state.brand.id);
  const branchId = useBrandBranchStore((state) => state.brandBranch.id);
  const freeRightImageUrl = useBrandStore(state => state.brand.freeRightImageUrl)

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderImages = async () => {
    setIsLoading(true);
    const { data, error } = await getUserOrdersByBrandId(userID, brandId);
    if (data) {
      setNumberOfFreeRights(new Array(data[0].user_total_free_rights).fill(0));
    } else {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    renderImages();
  }, []);

  useEffect(() => {
    const numberOfFreeRights = supabase
      .channel("orders-change-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_orders",
          filter: `user_id=eq.${userID}`,
        },
        (payload: any) => {
          setNumberOfFreeRights(
            new Array(payload.new.user_total_free_rights).fill(0)
          );
        }
      )
      .subscribe();
    if (qrCodeModalVisible) setQrCodeModalVisible(false);
    return () => {
      console.log("numberOfFreeRights", numberOfFreeRights);
      supabase.removeChannel(numberOfFreeRights);
    };
  }, [numberOfFreeRights]);

  // Touchable opacity compunun yüksekliği NFT' den büyük. Şu anda bi sıkıntı yok ama sonrasında yüksekliği her nft içn ayarlayalım
  // Tmm knk olr
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>{username}</Text>
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setSelectedTab("Waiting")}>
            <Text
              style={[
                styles.waitingTabText,
                selectedTab === "Waiting" && styles.selectedTab,
              ]}>
              Bekleyenler
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("Your Collection")}>
            <Text
              style={[
                styles.collectionTabText,
                selectedTab === "Your Collection" && styles.selectedTab,
              ]}>
              Koleksiyonunuz
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          {!isLoading ?
            (selectedTab === "Waiting" &&
              <FreeRightsList numberOfFreeRights={numberOfFreeRights} freeRightImageUrl={freeRightImageUrl} setQrCodeModalVisible={setQrCodeModalVisible} />) : (
              <ActivityIndicator color={colors.purple} size={"large"} />
            )}
          {selectedTab === "Your Collection" &&
            <CollectionList title="Yakında." />
          }
        </View>
        <QrCodeModal
          isVisible={qrCodeModalVisible}
          value={JSON.stringify({ forNFT: true, userID, brandBranchID: branchId })}
          onClose={() => setQrCodeModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


