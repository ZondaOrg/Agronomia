export interface PaymentSummary {
    providerName?: string;
    productName?: string;
    includesFreight: boolean;
    optionals: string[];
    total?: number;
    currency?: string;
}