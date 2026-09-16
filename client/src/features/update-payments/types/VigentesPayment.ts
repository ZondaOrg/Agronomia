export type VigentesPayment = {
    id: number;
    nameList: string;
    payments: Payments[];
};

export type Payments = {
    id: number;
    application: string;
    description: string;
    percentage: number;
    bonusPercentage: number;
};
