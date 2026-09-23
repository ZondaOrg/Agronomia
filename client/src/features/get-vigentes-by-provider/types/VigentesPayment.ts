export type VigentesPayment = {
    id: number;
    nameList: string;
    payments: Payment[];
};

export type Payment = {
    id: number;
    application: string;
    description: string;
    percentage: number;
    bonusPercentage: number;
};
