import { create } from "zustand";
import { BrandBranchesDetails } from "../types/dbTables.types";

type State = {
  brandBranchesDetails: BrandBranchesDetails;
};

type Action = {
  setBrandBranchesDetails: (brandBranchesDetails: BrandBranchesDetails) => void;
};

const useBrandBranchesDetailsStore = create<State & Action>((set) => ({
  brandBranchesDetails: {} as BrandBranchesDetails,
  setBrandBranchesDetails: (brandBranchesDetails) =>
    set(() => ({ brandBranchesDetails })),
}));

export default useBrandBranchesDetailsStore;
