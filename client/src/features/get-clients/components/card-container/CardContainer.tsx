import type { Page } from "@/shared/types/page/Page";
import type { Client } from "../../domain/client";
import { css } from "@styled-system/css";
import ClientCard from "../card/ClientCard";
import { NotResults } from "@/shared/components/empty-state/search/NotResults";
import EmptyClient from "../empty-clients/EmptyClients";

interface CardContainerProps {
    page: Page<Client>
    search: string
}

const styles = css({
    display: "grid",
    gridTemplateColumns: {
        base: "1fr",
        sm: "repeat(2, 1fr)",
    },
    gap: "4",
})

const CardContainer = ({page, search}: CardContainerProps) => {

    if(page.content.length === 0 && search !== "") return (
        <NotResults
            search={search}
            entity="cliente"
            description="Cambiá tu búsqueda o añade un cliente"
        />
    );
    else if(page.content.length === 0) return <EmptyClient />
    return (
        <div className={styles}>
            {page.content.map((client) => (
                <ClientCard
                    key={client.id}
                    client={client}
                />
            ))}
        </div>
    )
}

export default CardContainer;
