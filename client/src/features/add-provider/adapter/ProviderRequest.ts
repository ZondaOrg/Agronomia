import type { ADD_PROVIDER } from "./api-contract";

export type ProviderRequest = {
    [ADD_PROVIDER.legalName]: string;
    [ADD_PROVIDER.cuit]: string;
    [ADD_PROVIDER.tradeName]: string;
    [ADD_PROVIDER.phoneNumber]: string;
    [ADD_PROVIDER.travelerName]?: string;
    [ADD_PROVIDER.travelerPhoneNumber]?: string;
};
