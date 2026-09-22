package com.agro.feature.productType.services.impl;

import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.persistence.ProductTypeDAO;
import com.agro.feature.productType.services.ProductTypeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService {
    private ProductTypeDAO dao;

    public ProductTypeServiceImpl(ProductTypeDAO dao) {
        this.dao = dao;
    }

    @Override
    public Set<ProductType> getAll() {
        return Set.of();
    }
}
