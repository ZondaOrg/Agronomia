import { useLocation, useNavigate } from "react-router";
import { SearchProvider } from "../components/search/SearchProvider";
import SuccessToast from "@/shared/components/toast/success/SuccessToast";
import { styles } from "./styles";
import { ProvidersGrid } from "../components/grid/ProvidersGrid";
import { AddProviderButton } from "../components/add-button/AddProviderButton";

export const ProvidersList = () => {
    const { optionsRow } = styles();
    const navigate = useNavigate();
    const location = useLocation();

    const providerUpdated = location.state?.providerUpdated === true;

    const closeSuccessToast = () => {
        navigate(location.pathname, { replace: true, state: null });
    };

    return (
        <>
            {providerUpdated && (
                <SuccessToast
                    message="El proveedor fue editado correctamente"
                    onClose={closeSuccessToast}
                />
            )}
            <div className={optionsRow}>
                <SearchProvider />
                <AddProviderButton />
            </div>
            <ProvidersGrid />
        </>
    );
};
