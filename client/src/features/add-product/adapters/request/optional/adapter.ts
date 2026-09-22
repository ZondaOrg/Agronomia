import type { OptionalSchema } from "@/features/add-product/types/optional/schema";
import type { OptionalRequest } from "./optional";

function optionalsRequestAdapter(optionalsSchema: OptionalSchema[]): OptionalRequest[] {
    return optionalsSchema.map(optional => optionalRequestAdapter(optional))
}

function optionalRequestAdapter(optionalSchema: OptionalSchema): OptionalRequest {
    const { price, ...request} = optionalSchema;
    return {
        ...request,
        price: Number(price)
    }
}

export default optionalsRequestAdapter;
