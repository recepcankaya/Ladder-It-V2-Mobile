import { FlatList } from "react-native";
import BrandBranchesListRenderItem from "./BrandBranchesListRenderItem";
import { BrandBranchDetails } from "../../../types/dbTables.types";

type BrandBranchesListProps = {
    data: BrandBranchDetails[];
    selectBrandBranch: (item: BrandBranchDetails, index: number) => void;
}

const BrandBranchesList = ({ data, selectBrandBranch }: BrandBranchesListProps) => {
    return (
        <FlatList
            data={data}
            extraData={data}
            renderItem={({
                item,
                index,
            }: {
                item: BrandBranchDetails;
                index: number;
            }) => (
                <BrandBranchesListRenderItem
                    item={item}
                    index={index}
                    selectBrandBranch={selectBrandBranch}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
        />
    )
}

export default BrandBranchesList;