import type { PaymentPreview, StepPreview } from "../types/step-preview";

export interface StepPreviewResponseDTO {
    nameProvider: string;
    nameProduct: string;
    nameOptionals: string[];
    vigentePayment: PaymentResponseDTO[];
}

export interface PaymentResponseDTO {
    id: number;
    description: string;
    application: string;
    percentage: number;
    bonusPercentage: number;
}

export function stepPreviewResponseAdapter(
    response: StepPreviewResponseDTO,
): StepPreview {
    return {
        nameProvider: response.nameProvider,
        nameProduct: response.nameProduct,
        nameOptionals: response.nameOptionals,
        vigentePayment: response.vigentePayment.map(paymentAdapter),
    };
}

function paymentAdapter(payment: PaymentResponseDTO): PaymentPreview {
    return {
        id: payment.id,
        description: payment.description,
        application: payment.application,
        percentage: payment.percentage,
        bonusPercentage: payment.bonusPercentage,
    };
}
