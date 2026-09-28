package com.agro.feature.productType.services;

import com.agro.feature.productType.domain.ProductType;

import java.util.List;

public interface ProductTypeService {
    List<ProductType> getAll();

    ProductType add(ProductType productType);
}
