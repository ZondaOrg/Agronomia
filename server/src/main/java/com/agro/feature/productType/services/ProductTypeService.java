package com.agro.feature.productType.services;

import com.agro.feature.productType.domain.ProductType;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductTypeService {
    List<ProductType> getAll();

    ProductType add(ProductType productType);

    void addAllInCompany(List<ProductType> defaultTypes, long idCompany);

    Page<ProductType> getAllPaginated(Long userId, int page, int size);

    ProductType addTypeInCompany(ProductType model, Long userId);

    ProductType getProductTypeById(Long id);
}
