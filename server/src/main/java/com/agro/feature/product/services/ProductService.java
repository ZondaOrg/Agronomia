package com.agro.feature.product.services;

import com.agro.feature.product.domain.Product;

public interface ProductService {
    Product add(Product product, String productType, Long idProvider);
}
