import type { Provider } from "../../types/Provider";
import * as styles from "./styles";

import contactsSections from "./types/contact";
import { IconList } from "@/shared/components/icon/components/iconList/IconList";
import { InitialsName } from "@/shared/components/avatar/components/initialsName/InitialsName";
import DataField from "@/shared/components/dataField/DataField";
import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { ROLE } from "@/shared/domain/user/role";
import { EditIcon } from "@/shared/components/icon/components/icons/EditIcon";
import { PricesButton } from "./PriceButton";
import { PaymentsMethods } from "./PaymentsMethods";
import { Link } from "react-router";
import { ADMIN_ROUTES } from "@/core/routes/admin/paths";

export const ProviderCard = ({ provider }: { provider: Provider }) => {
    const hasPrices = (provider.listPrices?.length ?? 0) > 0;

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <InitialsName
                    fullName={provider.tradeName}
                    size="md"
                    nameClassName={styles.providerName}
                />
            </header>
            <div className={styles.companyData}>
                <DataField
                    label="Razón social"
                    value={provider.legalName}
                    labelClassName={styles.label}
                />
                <DataField
                    label="CUIT"
                    value={provider.cuit}
                    labelClassName={styles.label}
                />
            </div>

            <RoleGuard allowedRoles={[ROLE.OWNER]}>
                <button
                    type="button"
                    className={styles.editLink}
                >
                    <Link to={ADMIN_ROUTES.PROVIDERS.EDIT_PATH(provider.id)}>
                        Editar
                    </Link>
                    <EditIcon className={styles.editIcon} />
                </button>
            </RoleGuard>

            <hr className={styles.divider} />
            <section className={styles.cardBody}>
                {contactsSections(provider).map((section) => (
                    <IconList
                        key={section.title}
                        {...section}
                    />
                ))}
                <PaymentsMethods provider={provider} />
                <PricesButton hasPrices={hasPrices} idProvider = {provider.id} nameProvider = {provider.legalName} />
            </section>
        </article>
    );
};
