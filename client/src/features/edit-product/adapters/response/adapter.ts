import { ivaPorcents, type Iva } from "@/shared/domain/iva/iva";
import type { ProductResponse } from "./product";

export function responseAdapter(product: ProductResponse) {
    const {iva, ...rest} = product;
    return {
        iva: adapterIva(iva),
        ...rest
    }
}

function adapterIva(iva: Iva) {
    if(iva === "GENERAL") return ivaPorcents[0]
    else return ivaPorcents[1]
}
