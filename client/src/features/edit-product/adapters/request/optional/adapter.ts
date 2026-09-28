import type { OptionalSchema } from "@/features/edit-product/types/optionals/schema";

export function optionalsAdapter(optionals: OptionalSchema[]) {
    return optionals.map(optional => optionalAdapter(optional));
}

function optionalAdapter(optional: OptionalSchema) {
    const {price, ...rest} = optional;
    return { price: Number(price), ...rest}
}