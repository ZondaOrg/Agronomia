import type { ClientOption } from "@/shared/domain/client/client";

export type LegalEditRequest = {
    type: typeof ClientOption.LEGAL_NAME;
    associateName: string;
    associateSurname: string;
    associatePhone: string;
    email: string;
    address: string;
    locate: string;
    province: string;
};
