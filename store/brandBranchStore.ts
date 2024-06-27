import { create } from "zustand";
import { type BrandBranch } from "../types/dbTables.types";

type State = {
  brandBranch: BrandBranch;
  brandBranches: BrandBranch[];
};

type Action = {
  setBrandBranch: (brandBranch: State["brandBranch"]) => void;
  setBrandBranches: (brandBranches: State["brandBranches"]) => void;
};

const useBrandBranchStore = create<State & Action>((set) => ({
  brandBranch: {} as BrandBranch,
  brandBranches: [] as BrandBranch[],
  setBrandBranch: (brandBranch) => set(() => ({ brandBranch })),
  setBrandBranches: (brandBranches) => set(() => ({ brandBranches })),
}));

export default useBrandBranchStore;
