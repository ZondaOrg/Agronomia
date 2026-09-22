package com.agro.feature.productType.services.impl;

import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.persistence.ProductTypeDAO;
import com.agro.feature.productType.services.ProductTypeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService {
    private ProductTypeDAO dao;

    public ProductTypeServiceImpl(ProductTypeDAO dao) {
        this.dao = dao;
    }

    @Override
    public List<ProductType> getAll() {
        return dao.findAll();
    }

    @Override
    public ProductType add(ProductType productType) {
        return dao.save(productType);
    }
}
