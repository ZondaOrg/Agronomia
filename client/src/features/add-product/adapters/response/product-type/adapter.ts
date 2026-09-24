import type { ProductType } from "@/features/add-product/domain/product-type";

function adapterProductRequest(productTypes: ProductType[]) {
    return productTypes.map(productType => productType.name);
}

export default adapterProductRequest;