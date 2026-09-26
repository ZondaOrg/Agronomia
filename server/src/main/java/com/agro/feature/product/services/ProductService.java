package com.agro.feature.product.services;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

public interface ProductService {
    Product add(Product product, String productType, Long idProvider);

    Page<Product> getPageOfProducts(Integer page, Integer size, String search, Long providerId);

    Product findById(Long id);

    Product edit(Long id, Money money, Double v, IVA iva, Integer bonification, Double freight, List<Long> idOfOptionalsToDelete);
}
