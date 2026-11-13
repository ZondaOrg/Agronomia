import type { Iva } from "@/shared/domain/iva/iva";
import type { Money } from "@/shared/domain/money/money";

export interface QuoteOptional {
    id: number;
    name: string;
    price: number;
}

export interface QuoteProduct {
    id: number;
    name: string;
    money: keyof Money;
    listPrice: number;
    iva: Iva;
    freight: number;
    optionals: QuoteOptional[];
}
