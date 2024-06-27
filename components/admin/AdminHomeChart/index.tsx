import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../../../ui/colors";
import { BrandBranch } from "../../../types/dbTables.types";

type AdminHomeChartProps = {
  weeklyTotalOrders: BrandBranch["weeklyTotalOrders"];
};

const AdminHomeChart = ({ weeklyTotalOrders } : AdminHomeChartProps) => {
  const orderedDays = ["pzt", "salı", "çrş", "prş", "cuma", "cmt", "pzr"];
  const dayNumber = new Date().getDay();
  const orderedWeeklyTotalOrdersArray: Array<number> = orderedDays
    .map(
      (day) =>
        Number(weeklyTotalOrders?.[day as keyof typeof weeklyTotalOrders]) ?? 0
    )
    .slice(0, dayNumber === 0 ? 7 : dayNumber);

  const data = {
    labels: ["Pzt", "Salı", "Çrş", "Prş", "Cuma", "Cmt", "Pzr"],
    datasets: [
      {
        label: "Günlük Sipariş Sayısı",
        data: orderedWeeklyTotalOrdersArray,
        backgroundColor: "transparent",
        borderColor: "#7B5240",
        pointBorderColor: "#7B5240",
        pointBackgroundColor: "#7B5240",
        borderWidth: 2,
        tension: 0.7,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 16}
        height={220}
        chartConfig={{
          backgroundColor: colors.yellow,
          backgroundGradientFrom: colors.yellow,
          backgroundGradientTo: colors.yellow,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  chart: {},
});

export default AdminHomeChart;
