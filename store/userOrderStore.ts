import { create } from "zustand";
import { type UserOrder } from "../types/dbTables.types";

type State = {
  userOrder: UserOrder;
  userOrders: UserOrder[];
};

type Action = {
  setUserOrder: (brand: State["userOrder"]) => void;
  setUserOrders: (brands: State["userOrders"]) => void;
};

const useUserOrderStore = create<State & Action>((set) => ({
  userOrder: {} as UserOrder,
  userOrders: [] as UserOrder[],
  setUserOrder: (userOrder) => set(() => ({ userOrder })),
  setUserOrders: (userOrders) => set(() => ({ userOrders })),
}));

export default useUserOrderStore;
