import { SuccessIcon } from "@/shared/components/icon/components/icons/Success";
import Spinner from "@/shared/components/spinner/Spinner";
import type { DolarStatus as DolarStatusType } from "../../../domain/dolar-status";
import { styles } from "./styles";

interface DolarStatusProps {
    status: DolarStatusType;
}

export const DolarStatus = ({ status }: DolarStatusProps) => {
    const { wrapper, icon, obtained } = styles();

    if (status === "MANUAL") return null;

    return (
        <div className={wrapper}>
            {status === "LOADING" ? (
                <Spinner size="sm" />
            ) : (
                <>
                    <SuccessIcon className={icon} />
                    <span className={obtained}>Valor obtenido</span>
                </>
            )}
        </div>
    );
};
