import type { Client } from "../../domain/client";
import DataField from "@/shared/components/dataField/DataField";
import {
    card,
    cardBody,
    clientName,
    contactHeader,
    editIcon,
    editLink,
    inlineField,
    inlineLabel,
    inlineValue,
} from "./styles";
import { IconList } from "@/shared/components/icon/components/iconList/IconList";
import { InitialsName } from "@/shared/components/avatar/components/initialsName/InitialsName";
import { Link } from "react-router";
import { EditIcon } from "@/shared/components/icon/components/icons/EditIcon";
import { clientItems } from "./types/client-data";

interface ClientCardProps {
    client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
    return (
        <article className={card}>
            <header className={contactHeader}>
                <InitialsName
                    fullName={client.type === "RAZON_SOCIAL" ? client.razonSocial : client.name + " " + client.surname}
                    size="md"
                    nameClassName={clientName}
                />
                <DataField
                    label="CUIT/CUIL"
                    value={client.cuit}
                    className={inlineField}
                    labelClassName={inlineLabel}
                    valueClassName={inlineValue}
                />

                <button
                    type="button"
                    className={editLink}
                >
                    <Link to={`editar-cliente/${client.id}`}>Editar</Link>
                    <EditIcon className={editIcon} />
                </button>
            </header>

            <div className={cardBody}>
                <IconList
                    items={clientItems(client)}
                    title={""}
                />
            </div>
        </article>
    );
};

export default ClientCard;
