import { create } from "zustand";
import { type BrandBranchDetails } from "../types/dbTables.types";

type State = {
  brandBranchDetails: BrandBranchDetails;
  brandBranchesDetails: BrandBranchDetails[];
};

type Action = {
  setBrandBranchDetails: (brandBranch: State["brandBranchDetails"]) => void;
  setBrandBranchesDetails: (
    brandBranches: State["brandBranchesDetails"]
  ) => void;
};

const useBrandBranchDetailsStore = create<State & Action>((set) => ({
  brandBranchDetails: {} as BrandBranchDetails,
  brandBranchesDetails: [] as BrandBranchDetails[],
  setBrandBranchDetails: (brandBranchDetails) =>
    set(() => ({ brandBranchDetails })),
  setBrandBranchesDetails: (brandBranchesDetails) =>
    set(() => ({ brandBranchesDetails })),
}));

export default useBrandBranchDetailsStore;
