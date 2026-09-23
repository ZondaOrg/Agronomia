package com.agro.feature.product.services;

import com.agro.feature.product.domain.Product;
import org.springframework.data.domain.Page;

public interface ProductService {
    Product add(Product product, String productType, Long idProvider);

    Page<Product> getPageOfProducts(Integer page, Integer size, String search, Long providerId);
}
