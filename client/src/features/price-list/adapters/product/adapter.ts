import { ivaKeys, type Iva } from "@/shared/domain/iva/iva";
import type { Product } from "../../domain/product";
import type { ProductResponse } from "./response";

function adapterProduct(product: ProductResponse): Product {
    const {iva, ...rest} = product;
    return {
        ...rest,
        iva: adapterIva(iva)
    }
}

function adapterIva(iva: Iva) {
    if(iva === "REDUCIDA") return ivaKeys["10,5%"]
    else                   return ivaKeys["21%"]
}

export default adapterProduct;