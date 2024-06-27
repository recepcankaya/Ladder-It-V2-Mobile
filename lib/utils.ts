export const calculateData = (brandBranches: any[]) => {
  return brandBranches.map((item) => ({
    total_orders: item.total_orders,
    total_used_free_rights: item.total_used_free_rights,
    total_unused_free_rights: item.total_unused_free_rights,
    daily_total_orders: item.daily_total_orders,
    daily_total_used_free_rights: item.daily_total_used_free_rights,
    monthly_total_orders: item.monthly_total_orders,
  }));
};

export const calculateTotals = (calculateData: any[]) => {
  return calculateData.reduce(
    (acc, item) => {
      acc.total_orders += item.total_orders;
      acc.total_used_free_rights += item.total_used_free_rights;
      acc.total_unused_free_rights += item.total_unused_free_rights;
      acc.daily_total_orders += item.daily_total_orders;
      acc.daily_total_used_free_rights += item.daily_total_used_free_rights;
      acc.monthly_total_orders += item.monthly_total_orders;

      return acc;
    },
    {
      total_orders: 0,
      total_used_free_rights: 0,
      total_unused_free_rights: 0,
      daily_total_orders: 0,
      daily_total_used_free_rights: 0,
      monthly_total_orders: 0,
    }
  );
};

export const calculateWeeklyTotalOrders = (brandBranches: any[]) => {
  return brandBranches.reduce<{
    [key: string]: number;
  }>((acc, item: any) => {
    if (
      item.weekly_total_orders &&
      typeof item.weekly_total_orders === "object" &&
      !Array.isArray(item.weekly_total_orders)
    ) {
      Object.keys(item.weekly_total_orders).forEach((day) => {
        const value = (item.weekly_total_orders as { [key: string]: number })[
          day
        ];
        if (typeof value === "number") {
          if (!acc[day]) {
            acc[day] = 0;
          }
          acc[day] += value;
        }
      });
    }
    return acc;
  }, {});
};

export const decodeTurkishCharacters = (text: string) => {
  return text
    .replace(/Ğ/gim, "g")
    .replace(/Ü/gim, "u")
    .replace(/Ş/gim, "s")
    .replace(/I/gim, "i")
    .replace(/İ/gim, "i")
    .replace(/Ö/gim, "o")
    .replace(/Ç/gim, "c")
    .replace(/ğ/gim, "g")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "i")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c")
    .replace(" ", "-");
}
