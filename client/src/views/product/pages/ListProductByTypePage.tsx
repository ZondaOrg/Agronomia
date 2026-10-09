import ListProductByType from "@/features/list-products-with-provider-by-type/page/ListProductByType";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import { useParams } from "react-router";

export const ListProductByTypePage = () => {
    const { typeName } = useParams();

    return (
        <SectionPanel
            title={typeName ?? "Productos"}
            titleSize="xxxl"
            maxWidth="full"
        >
            <ListProductByType />
        </SectionPanel>
    );
};
