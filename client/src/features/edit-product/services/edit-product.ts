import type { EditProduct } from "../domain/edit-product";
import type { OptionalSchema } from "../types/optionals/schema";
import type { EditProductSchema } from "../types/product/schema";

export async function editProduct(
    product: EditProductSchema, 
    toAdd: OptionalSchema[], 
    toDelete: number[], 
    idProduct: string
): Promise<EditProduct> {

}