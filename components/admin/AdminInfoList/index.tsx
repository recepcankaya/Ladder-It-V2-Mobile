import { StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import Card from "./card";
import AdminHomeChart from "../AdminHomeChart";
import colors from "../../../ui/colors";
import { BrandBranch } from "../../../types/dbTables.types";

type InfoListProps = {
  data: { title: string; value: string }[];
  refreshing: boolean;
  onRefresh: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  weeklyTotalOrders: BrandBranch["weeklyTotalOrders"];
};

const AdminInfoList = ({
  data,
  refreshing,
  onRefresh,
  containerStyle,
  weeklyTotalOrders,
}: InfoListProps) => {
  console.log("weeklyTotalOrders-2", weeklyTotalOrders);
  return (
    <ScrollView
      style={[styles.container, containerStyle]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      {data.map((item, index) => {
        return <Card key={index} title={item.title} value={item.value} />;
      })}
      <AdminHomeChart weeklyTotalOrders={weeklyTotalOrders} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
});

export default AdminInfoList;
