import SearchEngineClient from "@/features/list-client/components/SearchEngineClient";
import { useNavigate } from "react-router";
import { token } from "@styled-system/tokens";
import Button from "@/shared/components/forms/components/button/Button";
import { styles } from "./styles";
import ClientsGrid from "@/features/get-clients/ClientsGrid";
import { CLIENTS } from "@/core/routes/urls/clients";

const ClientPanel = () => {

    const { optionsRow } = styles();
    const navigate = useNavigate();

    return (
        <>
            <div className={optionsRow}>
                <SearchEngineClient />
                <Button
                    color="white"
                    hoverColor={token("colors.primaryColorHover") + "20"}
                    borderColor={token("colors.primaryColor")}
                    textColor={token("colors.primaryColor")}
                    onClick={() => navigate(CLIENTS.ADD)}
                >
                    + Añadir cliente
                </Button>
            </div>
            <ClientsGrid />
        </>
    )
}

export default ClientPanel;