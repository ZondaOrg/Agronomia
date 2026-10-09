package com.agro.feature.product.services;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Product;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;

public interface ProductService {
    Product add(Product product, Long idType, Long idProvider);

    Page<Product> getPageOfProducts(Integer page, Integer size, String search, Long providerId);

    Page<Product> getPageOfProducts(Integer page, Integer size, Long idType, Collection<Long> providerIds);

    Product findByIdWithinOptionals(Long id);

    Product edit(
            Product product,
            Money money,
            Double listPrice,
            IVA iva,
            Integer bonification,
            Double freight,
            String description,
            List<com.agro.feature.product.domain.Optional> optionalsToAdd,
            List<Long> OptionalsToDelete);

}
