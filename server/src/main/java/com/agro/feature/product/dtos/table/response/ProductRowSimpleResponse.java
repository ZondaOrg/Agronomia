package com.agro.feature.product.dtos.table.response;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.domain.ProductWithProvider;

public record ProductRowSimpleResponse(
        Long idProduct,
        String name,
        String nameProvider
) {
    public static ProductRowSimpleResponse getProductRow(ProductWithProvider product) {
        return new ProductRowSimpleResponse(
                product.idProduct(),
                product.name(),
                product.nameProvider()
        );
    }
}
