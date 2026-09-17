import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { ROLE } from "@/shared/domain/user/role";
import { ExternalLinkIcon } from "@/shared/components/icon/components/icons/ExternalLink";
import SubSection from "@/shared/components/section/components/subSection/SubSection";
import { paymentRow, paymentText, pricesLink, pricesLinkIcon } from "./styles";
import { Link } from "react-router";
import { ADMIN_ROUTES } from "@/core/routes/admin/paths";
import type { Provider } from "../../types/Provider";

export const PaymentsMethods = ({ provider }: { provider: Provider }) => {
    return (
        <SubSection
            title="Formas de pago"
            items={[provider.payments.length]}
            renderItem={(count) => (
                <div className={paymentRow}>
                    <span className={paymentText}>
                        {count > 0
                            ? `${count} formas de pago`
                            : "Aún no existen formas de pago"}
                    </span>
                    {count > 0 ? (
                        <Link
                            to={ADMIN_ROUTES.PAYMENT.PANEL_PATH(
                                provider.id,
                                provider.tradeName,
                            )}
                            className={pricesLink}
                        >
                            Ver
                            <ExternalLinkIcon className={pricesLinkIcon} />
                        </Link>
                    ) : (
                        <RoleGuard allowedRoles={[ROLE.OWNER]}>
                            <button
                                type="button"
                                className={pricesLink}
                            >
                                Añadir
                                <ExternalLinkIcon className={pricesLinkIcon} />
                            </button>
                        </RoleGuard>
                    )}
                </div>
            )}
        />
    );
};
