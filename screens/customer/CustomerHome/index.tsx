import { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Linking, TouchableOpacity, ScrollView } from "react-native";

import HomeHeader from "../../../components/customer/home/HomeHeader";
import RenderTicket from "../../../components/customer/home/RenderTicket";

import useUserStore from "../../../store/userStore";
import useBrandStore from "../../../store/brandStore";
import useBrandBranchStore from "../../../store/brandBranchStore";
import supabase from "../../../lib/supabase";
import { Video, ResizeMode } from 'expo-av';
import Slider from "../../../components/customer/home/CustomSlider/Slider";
import { getBrandBranchMenuUrl, getUserOrderByBrandIdAndBranchId } from "../../../lib/supabaseServices";
import { decodeTurkishCharacters } from "../../../lib/utils";
import styles from "./styles";

const CustomerHome = () => {
  const [totalTicketOrders, setTotalTicketOrders] = useState<number>(0);
  const userId = useUserStore((state) => state.user.id);
  const brand = useBrandStore((state) => state.brand);
  const brandId = useBrandStore((state) => state.brand.id);
  const brandBranch = useBrandBranchStore((state) => state.brandBranch);
  const brandBranchId = useBrandBranchStore((state) => state.brandBranch.id);
  const campaigns = useBrandBranchStore((state) => state.brandBranch.campaigns)?.map((campaign: any) => {
    return {
      image: campaign.campaign_image,
      favourite: campaign.favourite
    };
  })
  const brandBranchVideoUrl = useBrandBranchStore((state) => state.brandBranch.videoUrl);

  const convertedBrandName = decodeTurkishCharacters(decodeURI(brand.brandName));
  const convertedBrandBranchName = decodeTurkishCharacters(decodeURIComponent(brandBranch.branchName));

  const { data: brandBranchMenuUrl } = getBrandBranchMenuUrl(convertedBrandName, convertedBrandBranchName);

  const renderTickets = async () => {
    try {
      const { data } = await getUserOrderByBrandIdAndBranchId(userId, brandId, brandBranchId);
      if (data && data.length > 0) {
        setTotalTicketOrders(data[0].total_ticket_orders);
      } else {
        setTotalTicketOrders(0);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  // @todo - renderTickets() fonksiyonunu her brands'e girişte iki defa renderlıyor. Düzeltilmesi gerekiyor.
  useEffect(() => {
    renderTickets();
  }, [brand, totalTicketOrders]);

  useEffect(() => {
    const orders = supabase
      .channel("orders-change-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_orders",
          filter: `user_id=eq.${userId}`,
        },
        (payload: any) => {
          setTotalTicketOrders(payload.new.total_ticket_orders);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(orders);
    };
  }, [totalTicketOrders]);

  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <HomeHeader />
      <ScrollView>
        <RenderTicket totalTicketOrders={totalTicketOrders} ticketUrl={brand.ticketUrl} />
        <TouchableOpacity style={styles.menuButton} onPress={() => Linking.openURL(decodeTurkishCharacters(brandBranchMenuUrl))}>
          <Text style={styles.menuText}>
            Menü
          </Text>
        </TouchableOpacity>
        {campaigns &&
          <Slider data={campaigns}/>
        }
        {brandBranchVideoUrl &&
          <View style={styles.container}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: brandBranchVideoUrl,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
          </View>
        }
      </ScrollView>

    </SafeAreaView>
  );
};



export default CustomerHome;
