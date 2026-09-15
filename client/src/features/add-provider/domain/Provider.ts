import type { ProviderRequest } from "../adapter/ProviderRequest";

export type Traveler = {
    id: number;
    fullName: string;
    phoneNumber: string;
};

export type Provider = 
    Exclude<ProviderRequest, "travelerName" | "travelerPhoneNumber"> & 
    {
        id: number;
        cuit: string;
        traveler: Traveler;
        companyId: number;
        payments: string[];
        listPrices: number[];
    };