import type { ProductType } from "@/features/add-product/domain/product-type";

function adapterProductRequest(productTypes: ProductType[]) {
    return productTypes;
}

export default adapterProductRequest;