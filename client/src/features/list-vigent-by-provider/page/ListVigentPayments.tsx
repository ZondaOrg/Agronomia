import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import Spinner from "@/shared/components/spinner/Spinner";
import { PaymentCard } from "./components/card/PaymentCard";
import { paymentList } from "./styles";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { useGetVigentesPaymentsByProvider } from "../hooks/use-get-payment-by-provider-simple";
import { useSearchVigentPaymentsByProvider } from "../hooks/use-search-vigent-payments-by-provider";
import { FiltrerButton } from "@/shared/components/filter/FilterButton";
import { FilterPanel } from "@/shared/components/filter/FilterPanel";
import { Searcher } from "@/shared/components/searcher/Sercher";
import { NotResults } from "@/shared/components/empty-state/search/NotResults";
import { PaymentIcon } from "@/shared/components/icon/components/icons/PaymentIcon";
import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";
import { PAYMENT } from "@/core/routes/urls/payments";

export const ListVigentPayments = () => {
    const navigate = useNavigate();

    const { providerId } = useParams<{ providerId: string }>();
    const { data, isLoading } = useGetVigentesPaymentsByProvider(
        Number(providerId),
    );
    const {
        data: payments,
        isLoading: isLoadingPayments,
        search,
        onSearch,
    } = useSearchVigentPaymentsByProvider(Number(providerId));
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    if ((isLoading && !data) || (isLoadingPayments && !payments)) {
        return <Spinner />;
    }

    if (!data) {
        return (
            <EmptyState
                icon={<PaymentIcon />}
                title="Todavía no hay formas de pago vigentes"
                description="Este proveedor no tiene formas de pago configuradas."
                action={
                    <Button
                        color={token("colors.primaryColor")}
                        hoverColor={token("colors.primaryColorHover")}
                        textColor="white"
                        onClick={() => navigate(PAYMENT.UPDATE)}
                    >
                        + Agregar forma de pago
                    </Button>
                }
            />
        );
    }

    const hasPayments = (payments?.length ?? 0) > 0;

    return (
        <SectionPanel
            title={data.nameList}
            titleSize="xl"
            centered
            maxWidth="sm"
            maxHeight="md"
            actions={
                <FiltrerButton
                    isActive={isFilterVisible}
                    onToggle={() => setIsFilterVisible((prev) => !prev)}
                />
            }
            description={`última actualización ${data.updateAt}`}
            contentHeader={
                <FilterPanel isVisible={isFilterVisible}>
                    <Searcher
                        value={search}
                        title="Buscar"
                        placeholder="Buscar"
                        onChange={onSearch}
                    />
                </FilterPanel>
            }
        >
            {hasPayments ? (
                <ul className={paymentList}>
                    {payments?.map((payment) => (
                        <PaymentCard
                            key={payment.id}
                            payment={payment}
                        />
                    ))}
                </ul>
            ) : (
                <NotResults
                    search={search}
                    entity="método de pago"
                    description="Cambiá tu búsqueda o intentá nuevamente."
                />
            )}
        </SectionPanel>
    );
};
