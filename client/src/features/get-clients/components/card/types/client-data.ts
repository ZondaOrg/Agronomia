import type { Client } from "@/features/get-clients/domain/client";
import type { NaturalPerson } from "@/features/get-clients/domain/natural-person";
import type { RazonSocial } from "@/features/get-clients/domain/razon-social";
import { UserIcon } from "@/shared/components/icon/components/icons/User";
import EmailIcon from "@/shared/components/icon/components/icons/EmailIcon";
import UbicationIcon from "@/shared/components/icon/components/icons/Ubication"
import { PhoneIcon } from "@/shared/components/icon/components/icons/Phone";

export const clientItems = (client: Client) =>
    client.type === "RAZON_SOCIAL"
        ? legalPersonItems(client)
        : naturalPersonItems(client);

function naturalPersonItems(client: NaturalPerson) {
    return [
        {
            icon: PhoneIcon,
            value: client.phone,
        },
        {
            icon: EmailIcon,
            value: client.email ?? "No indicado",
        },
        {
            icon: UbicationIcon,
            value:
                (client.ubication.address ?? "Dirección no indicada") +
                " - " +
                client.ubication.location,
        },
    ];
}
function legalPersonItems(client: RazonSocial) {
    return [
        {
            icon: UbicationIcon,
            value:
                (client.ubication.address ?? "Dirección no indicada") +
                " - " +
                client.ubication.location,
        },
        {
            icon: PhoneIcon,
            value: client.associatePhone,
        },
        {
            icon: UserIcon,
            value: client.name + " " + client.surname,
        },
        {
            icon: EmailIcon,
            value: client.email ?? "No indicado",
        },
    ];
}