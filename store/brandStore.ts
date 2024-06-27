import { create } from "zustand";
import { type Brand } from "../types/dbTables.types";

type State = {
  brand: Brand;
  brands: Brand[];
};

type Action = {
  setBrand: (brand: State["brand"]) => void;
  setBrands: (brands: State["brands"]) => void;
};

const useBrandStore = create<State & Action>((set) => ({
  brand: {} as Brand,
  brands: [] as Brand[],
  setBrand: (brand) => set(() => ({ brand })),
  setBrands: (brands) => set(() => ({ brands })),
}));

export default useBrandStore;
