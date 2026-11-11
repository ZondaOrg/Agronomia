import type { Iva } from "@/shared/domain/iva/iva";
import type { Money } from "@/shared/domain/money/money";
import type { QuoteProduct } from "../../domain/quote-product";

export type QuoteProductResponse = {
    id: number;
    name: string;
    money: keyof Money;
    listPrice: number;
    iva: Iva;
    freight: number;
    optionals: { id: number; name: string; price: number }[];
};

export function quoteProductAdapter(response: QuoteProductResponse): QuoteProduct {
    return {
        id: response.id,
        name: response.name,
        money: response.money,
        listPrice: response.listPrice,
        iva: response.iva,
        freight: response.freight,
        optionals: response.optionals.map(({ id, name, price }) => ({ id, name, price })),
    };
}
