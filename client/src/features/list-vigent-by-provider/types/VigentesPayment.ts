export type ApplicationType = "Recargo" | "Descuento" | "No Aplica";

export type Payment = {
    id: number;
    application: ApplicationType;
    description: string;
    percentage: number;
    bonusPercentage: number;
};

export type VigentesPayment = {
    id: number;
    nameList: string;
    payments: Payment[];
    updateAt: string;
};
