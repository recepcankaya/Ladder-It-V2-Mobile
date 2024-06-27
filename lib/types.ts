export interface MonthlyOrdersJustMonth {
  [key: string]: number;
}

export interface MonthlyOrdersWithYear {
  [key: string]: MonthlyOrdersJustMonth;
}
