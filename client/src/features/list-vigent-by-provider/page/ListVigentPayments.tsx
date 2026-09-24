import { useState } from "react";
import { useParams } from "react-router";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import Spinner from "@/shared/components/spinner/Spinner";
import { PaymentCard } from "./components/card/PaymentCard";
import { paymentList } from "./styles";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { FilterIcon } from "@/shared/components/icon/components/icons/FilterIcon";
import { useGetVigentesPaymentsByProvider } from "../hooks/use-get-payment-by-provider-simple";
import { useSearchVigentPaymentsByProvider } from "../hooks/use-search-vigent-payments-by-provider";
import { FiltrerButton } from "@/shared/components/filter/FilterButton";
import { FilterPanel } from "@/shared/components/filter/FilterPanel";
import { Searcher } from "@/shared/components/searcher/Sercher";

export const ListVigentPayments = () => {
    const { providerId } = useParams<{ providerId: string }>();
    const { data, isLoading } =
        useGetVigentesPaymentsByProvider(Number(providerId));
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
                icon={<FilterIcon size={32} />}
                title="No hay un listado de formas de pago"
                description="Este proveedor todavía no tiene formas de pago configuradas."
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
            filters={
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
                <EmptyState
                    icon={<FilterIcon size={32} />}
                    title="No hay formas de pago cargadas"
                    description="Todavía no se agregaron formas de pago para este listado."
                />
            )}
        </SectionPanel>
    );
};
