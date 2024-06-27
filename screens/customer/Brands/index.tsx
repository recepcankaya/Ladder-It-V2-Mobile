import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";

import BrandsSearch from "../../../components/customer/brands/BrandsSearch";

import { haversine } from "../../../lib/haversine";
import { errorToast } from "../../../ui/toast";
import colors from "../../../ui/colors";
import useBrandBranchDetailsStore from "../../../store/brandBranchDetailsStore";
import useBrandStore from "../../../store/brandStore";
import useBrandBranchStore from "../../../store/brandBranchStore";
import { BrandBranchDetails } from "../../../types/dbTables.types";
import { getAllBrandBranchWithBrand } from "../../../lib/supabaseServices";
import BrandBranchesList from "../../../components/customer/brands/BrandBranchesList";
import styles from "./styles";
import { router } from "expo-router";

const Brands = () => {
  const brand = useBrandStore((state) => state.brand);
  const setBrand = useBrandStore((state) => state.setBrand);
  const brandBranch = useBrandBranchStore((state) => state.brandBranch);
  const setBrandBranch = useBrandBranchStore((state) => state.setBrandBranch);

  const [brandBrachDetails, setBrandBranchDetails] = useState<
    BrandBranchDetails[]
  >([] as BrandBranchDetails[]);
  const [sortedBrandBranchesDetails, setSortedBrandBranchesDetails] = useState<
    BrandBranchDetails[]
  >([] as BrandBranchDetails[]);
  const [searchedBrandBranchDetails, setSearchedBrandBranchDetails] =
    useState<string>("");
  const [customerLocation, setCustomerLocation] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const updateBrandBranchDetails = useBrandBranchDetailsStore(
    (state) => state.setBrandBranchDetails
  );

  const fetchBrandBranchesDetails = async () => {
    try {
      const { data } = await getAllBrandBranchWithBrand()

      if (!data) {
        errorToast(
          "İşletmeleri gösterirken bir sorun oluştu.",
          "Lütfen tekrar dener misiniz 👉👈."
        );
        return;
      }

      const brandBranchesDetails: BrandBranchDetails[] = data.map((item) => {
        if (item.brand === null) {
          throw new Error("Brand is null");
        }

        if (item.coords === null) {
          throw new Error("Coords is null");
        }

        return {
          id: item.id,
          branchName: item.branch_name,
          coords: {
            lat: (item.coords as any).lat,
            long: (item.coords as any).long,
          },
          campaigns: item.campaigns,
          videoUrl: item.video_url,
          brandId: item.brand.id,
          brandName: item.brand.brand_name,
          brandLogoUrl: item.brand.brand_logo_url,
          ticketUrl: item.brand.ticket_url,
          requiredNumberForFreeRight: item.brand.required_number_for_free_right,
          freeRightImageUrl: item.brand.free_right_image_url,
        };
      });

      if (searchedBrandBranchDetails.length > 0) {
        const filteredBrandBranches = brandBranchesDetails.filter(
          searchBrandBranchesDetails
        );
        setBrandBranchDetails(filteredBrandBranches);
      } else {
        setBrandBranchDetails(brandBranchesDetails);
      }
    } catch (error) {
      errorToast(
        "Bunu biz de beklemiyorduk 🤔",
        "Lütfen tekrar dener misiniz 👉👈"
      );
    }
  };
  /**
   * Searches for a brandBranchDetails based on the brand name.
   * @param brandBranchDetails - The brandBranchDetails object to search.
   * @returns True if the brandBranchDetials's brand name includes the searched brandBranchDetails, false otherwise.
   */
  const searchBrandBranchesDetails = (
    brandBranchDetails: BrandBranchDetails
  ) => {
    return brandBranchDetails.brandName
      .toLowerCase()
      .includes(searchedBrandBranchDetails.toLowerCase());
  };

  /**
   * Selects a brandBranchDetails and updates the brandBranchDetails state.
   * @param item - The selected brandBranchDetails item.
   * @param index - The index of the selected brandBranchDetails item.
   */

  const selectBrandBranchDetails = async (
    item: BrandBranchDetails,
    index: number
  ) => {
    updateBrandBranchDetails(item);
    setBrand({
      ...brand,
      id: item.brandId,
      brandName: item.brandName,
      brandLogoUrl: item.brandLogoUrl,
      ticketUrl: item.ticketUrl,
      requiredNumberForFreeRight: item.requiredNumberForFreeRight,
      freeRightImageUrl: item.freeRightImageUrl,
    });
    setBrandBranch({
      ...brandBranch,
      id: item.id,
      branchName: item.branchName,
      coords: item.coords,
      campaigns: item.campaigns,
      videoUrl: item.videoUrl,
    });
    router.push("/home/1");
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((info: GeolocationResponse) => {
      setCustomerLocation({
        lat: info.coords.latitude,
        long: info.coords.longitude,
      });
    });
    fetchBrandBranchesDetails();
  }, [searchedBrandBranchDetails]);

  /**
   * Sorts the array of admins based on their distance from the customer's location.
   * @param admins - The array of admins to be sorted.
   * @param customerLocation - The coordinates of the customer's location.
   * @returns The sorted array of admins.
   */
  //buradaki useEffect i yok edelim
  useEffect(() => {
    if (!customerLocation) return;
    const sorted: BrandBranchDetails[] = [...brandBrachDetails].sort(
      (a, b): any => {
        const distanceA = haversine(
          { lat: customerLocation.lat, lng: customerLocation.long },
          {
            lat: a.coords ? Number(a.coords.lat) : null,
            lng: a.coords ? Number(a.coords.long) : null,
          }
        );
        const distanceB = haversine(
          { lat: customerLocation.lat, lng: customerLocation.long },
          {
            lat: b.coords ? Number(b.coords.lat) : null,
            lng: b.coords ? Number(b.coords.long) : null,
          }
        );
        return distanceA - distanceB;
      }
    );
    setSortedBrandBranchesDetails(sorted);
  }, [customerLocation, brandBrachDetails]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.black} />
      <BrandsSearch
        searchedAdmin={searchedBrandBranchDetails}
        setSearchedAdmin={setSearchedBrandBranchDetails}
      />
      <BrandBranchesList
        data={customerLocation ? sortedBrandBranchesDetails : brandBrachDetails}
        selectBrandBranch={selectBrandBranchDetails}
      />
    </SafeAreaView>
  );
};

export default Brands;
